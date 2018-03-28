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
// Created by Jason Leach on 2018-03-08.
//

/* eslint-env es6 */

'use strict';

export default (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    id: {
      type: DataTypes.STRING(8),
      field: 'client_number',
      allowNull: false,
      primaryKey: true,
      validate: {
        is: /^[0-9]{8}$/,
        len: [8],
      },
    },
    locationCode: {
      field: 'location_code',
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    name: {
      type: DataTypes.STRING(64),
      validate: {
        // is: /^[a-z]+$/i,
        len: [0, 64],
      },
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: 'client_type_id',
      allowNull: false,
    },
    startDate: {
      field: 'licensee_start_date',
      type: DataTypes.DATE,
    },
    endDate: {
      field: 'licensee_end_date',
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    tableName: 'ref_client',
  });

  return Client;
};
