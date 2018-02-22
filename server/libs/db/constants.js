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

module.exports = {
  AGREEMENT_TYPE: {
    E01: 'E01',
    E02: 'E02',
    H01: 'H01',
    H02: 'H02',
  },
  EXEMPTION_STATUS: {
    NOT_EXEMPT: 'Not Exempt',
    PENDING_APPROVAL: 'Pending Approval',
  },
  RUP_STATUS: {
    DRAFT: 'Draft',
    FINAL: 'Final',
    RETIRED: 'Retired',
  },
  LIVESTOCK_ID_TYPE: {
    BRAND: 'Brand',
    TAG: 'Tag',
  },
  LIVESTOCK_ID_LOCATION: {
    LEFT_EAR: 'Left Ear',
    RIGHT_EAR: 'Right Ear',
    LEFT_SHOLDER: 'Left Sholder',
    RIGHT_SHOLDER: 'Right Sholder',
    LEFT_HIND: 'Left Hind',
    RIGHT_HIND: 'Right Hind',
    LEFT_FLANK: 'Left Flank',
    RIGHT_LFANG: 'Right Flank',
  },
  ASPECT: {
    N: 'North',
    E: 'East',
    S: 'South',
    W: 'West',
    NE: 'North East',
    NW: 'North West',
    SE: 'South East',
    SW: 'South West',
  },
  ELEVATION: {
    UNDER_500: '<500',
    OVER_1500: '>1500',
    BETWEEN_500_699: '500-699',
    BETWEEN_700_899: '700-899',
    BETWEEN_900_1099: '900-1099',
    BETWEEN_1100_1299: '1100-1299',
    BETWEEN_1299_1500: '1299-1500',
  },
  PC_ACTION_PURPOSE: {
    ESTABLISH: 'Establish',
    MAINTAIN: 'Maintain',
  },
  PC_ACTION_TYPE: {
    HERDING: 'Herding',
    TIMING: 'Timing',
    SALTING: 'Salting',
    SUPPLEMENTAL_FEEDING: 'Supplemental Feeding',
    LIVESTOCK_VARIABLES: 'Livestock Variables',
    OTHER: 'Other',
  },
  PC_RANGELAND_HEALTH: {
    HIGH: 'Highly at Risk',
    MODERATE: 'Moderatly at Risk',
    LOW: 'Low Risk',
    NON_FUNCTIONAL: 'Non Functional',
    FUNCTIONAL: 'Properly Funcitonal (PFC)',
  },
};
