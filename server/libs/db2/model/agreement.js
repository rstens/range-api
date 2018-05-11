//
// MyRA
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2018-05-04.
//

'use strict';

import AgreementExemptionStatus from './agreementexemptionstatus';
import AgreementType from './agreementtype';
import Client from './client';
import District from './district';
import LivestockIdentifier from './livestockidentifier';
import Model from './model';
import Plan from './plan';
import Usage from './usage';
import Zone from './zone';

export default class Agreement extends Model {
  constructor(data, db = undefined) {
    const obj = {};
    Object.keys(data).forEach((key) => {
      if (Agreement.fields.indexOf(`${Agreement.table}.${key}`) > -1) {
        obj[key] = data[key];
      }
    });

    super(obj, db);

    // // hide this property so it is not automatically returned by the
    // // API.
    // delete this.forestFileId;
    // Object.defineProperty(this, 'forestFileId', {
    //   value: obj.forestFileId,
    //   writable: false,
    //   enumerable: false,
    // });

    this.zone = new Zone(Zone.extract(data));
    this.zone.district = new District(District.extract(data));
    this.agreementType = new AgreementType(AgreementType.extract(data));
    // eslint-disable-next-line max-len
    this.agreementExemptionStatus = new AgreementExemptionStatus(AgreementExemptionStatus.extract(data));
  }

  // To matche previous Agreement (sequelize) schema.
  get id() {
    return this.forestFileId;
  }

  static get fields() {
    // primary key *must* be first!
    return ['forest_file_id', 'agreement_start_date', 'agreement_end_date'].map(f => `${Agreement.table}.${f}`);
  }

  static get table() {
    return 'agreement';
  }

  static async findWithAllRelations(db, where, page = undefined, limit = undefined) {
    let promises = [];
    const myAgreements = await Agreement.findWithTypeZoneDistrictExemption(db, where, page, limit);
    // fetch all data that is directly related to the agreement
    // `await` used here to allow the queries to start imediatly and
    // run in parallel. This greatly speeds up the fetch.
    promises = myAgreements.map(async agreement =>
      [await agreement.fetchClients(),
        await agreement.fetchUsage(),
        await agreement.fetchPlans(),
        await agreement.fetchLivestockIdentifiers(),
      ]);

    await Promise.all(promises.flatten());

    // fetch all data that is indirectly (nested) related to an agreement
    promises = [];
    myAgreements.forEach((agreement) => {
      promises = [...promises, ...agreement.plans.map(plan =>
        [plan.fetchGrazingSchedules(), plan.fetchPastures()])];
    });

    await Promise.all(promises);

    return myAgreements;
  }

  static async findWithTypeZoneDistrictExemption(db, where, page = undefined, limit = undefined) {
    const myFields = [
      ...Agreement.fields,
      ...Zone.fields.map(f => `${f} AS ${f.replace('.', '_')}`),
      ...District.fields.map(f => `${f} AS ${f.replace('.', '_')}`),
      ...AgreementType.fields.map(f => `${f} AS ${f.replace('.', '_')}`),
      ...AgreementExemptionStatus.fields.map(f => `${f} AS ${f.replace('.', '_')}`),
    ];

    try {
      let results = [];
      const q = db
        .select(myFields)
        .from(Agreement.table)
        .join('ref_zone', { 'agreement.zone_id': 'ref_zone.id' })
        .join('ref_district', { 'ref_zone.district_id': 'ref_district.id' })
        .join('ref_agreement_type', { 'agreement.agreement_type_id': 'ref_agreement_type.id' })
        .join('ref_agreement_exemption_status', { 'agreement.agreement_exemption_status_id': 'ref_agreement_exemption_status.id' })
        .where(where);

      if (page && limit) {
        const offset = limit * (page - 1);
        results = await q
          .offset(offset)
          .limit(limit);
      } else {
        results = await q;
      }

      return results.map(row => new Agreement(row, db));
    } catch (err) {
      throw err;
    }
  }

  static async agreementsForClientId(db, clientId) {
    if (!db || !clientId) {
      return [];
    }

    const results = await db
      .select('agreement_id')
      .from('client_agreement')
      .where({ client_id: clientId });

    return results.map(result => Object.values(result)).flatten();
  }

  static async agreementsForZoneId(db, zoneId) {
    if (!db || !zoneId) {
      return [];
    }

    const results = await db
      .select('forest_file_id')
      .from(Agreement.table)
      .where({ zone_id: zoneId });

    return results.map(result => Object.values(result)).flatten();
  }

  static async search(db, term) {
    if (!db || !term) {
      return [];
    }

    try {
      const results = await db
        .select(Agreement.primaryKey)
        .from(Agreement.table)
        .where({ 'agreement.forest_file_id': term })
        .orWhere('agreement.forest_file_id', 'ilike', `%${term}%`);

      // return an array of `forest_file_id`
      return results.map(result => Object.values(result)).flatten();
    } catch (err) {
      throw err;
    }
  }

  static async update(db, where, values) {
    const obj = { };
    Agreement.fields.forEach((field) => {
      const aKey = field.replace(Agreement.table, '').slice(1);
      obj[aKey] = values[Model.toCamelCase(aKey)];
    });

    try {
      const results = db
        .table(Agreement.table)
        .where(where)
        .update(obj)
        .returning(this.primaryKey);

      return results;
    } catch (err) {
      throw err;
    }
  }

  async fetchClients() {
    const clients = await Client.clientsForAgreement(this.db, this);
    this.clients = clients;
  }

  async fetchPlans() {
    const order = ['id', 'desc']; // was created_at desc but this should do
    const where = { agreement_id: this.forestFileId };
    const plans = await Plan.findWithStatusExtension(this.db, where, order);
    this.plans = plans;
  }

  async fetchUsage() {
    const order = ['year', 'desc'];
    const where = { agreement_id: this.forestFileId };
    const usage = await Usage.find(this.db, where, order);
    this.usage = usage;
  }

  async fetchLivestockIdentifiers() {
    const where = { agreement_id: this.forestFileId };
    const livestockIdentifiers = await LivestockIdentifier.findWithTypeLocation(this.db, where);
    this.livestockIdentifiers = livestockIdentifiers;
  }

  // Transform the client property to match the API v1 specification.
  transformToV1() {
    if (!this.clients && this.clients.length === 0) {
      return;
    }

    const clients = this.clients.map((client) => {
      const aClient = {
        id: client.clientNumber,
        locationCode: client.locationCode,
        name: client.name,
        clientTypeCode: client.clientType.code,
        startDate: client.licenseeStartDate,
        endDate: client.licenseeStartEnd,
      };

      return aClient;
    });

    this.clients = clients.sort((a, b) => a.clientTypeCode > b.clientTypeCode);
  }
}
