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
// Created by Jason Leach on 2018-02-21.
//

/* eslint-env es6 */

'use strict';

/* eslint-disable no-param-reassign */

module.exports = {
  up: async (queryInterface) => {
    const ref = [
      {
        code: 'N',
        name: 'Not Exempt',
        active: true,
      },
      {
        code: 'P',
        name: 'Preparing and Obtaining Approval',
        active: true,
      },
      {
        code: 'O',
        name: 'Obtaining Approval',
        active: true,
      },
    ];

    let index = 1;
    ref.forEach((status) => {
      status.id = index;
      index += 1;
    });

    await queryInterface.bulkInsert('ref_agreement_exemption_status', ref, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE ref_agreement_exemption_status_id_seq RESTART WITH ${index};`);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ref_agreement_exemption_status', null, {});
    await queryInterface.sequelize.query('ALTER SEQUENCE ref_agreement_exemption_status_id_seq RESTART WITH 1;');
  },
};
