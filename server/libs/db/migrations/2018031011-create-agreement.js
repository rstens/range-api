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
// Created by Jason Leach on 2018-03-10.
//

/* eslint-env es6 */

'use strict';

/* eslint-disable no-unused-vars,arrow-body-style,no-global-assign */

const table = 'agreement';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(table, {
      forest_file_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(9),
      },
      agreement_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      agreement_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      agreement_exemption_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ref_agreement_exemption_status',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      agreement_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ref_agreement_type',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      primary_agreement_holder_id: {
        type: Sequelize.STRING(8),
        references: {
          model: 'ref_client',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      zoneId: {
        type: Sequelize.INTEGER,
        field: 'zone_id',
        allowNull: false,
        references: {
          model: 'ref_zone',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        allowNull: false,
      },
    });

    const query = `
    CREATE TRIGGER update_${table}_changetimestamp BEFORE UPDATE
    ON ${table} FOR EACH ROW EXECUTE PROCEDURE 
    update_changetimestamp_column();`;

    await queryInterface.sequelize.query(query);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(table);
  },
};
