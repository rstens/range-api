//
// SecureImage
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
// Created by Jason Leach on 2018-01-10.
//

/* eslint-env es6 */

'use strict';

// eslint-disable-next-line import/prefer-default-export
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const TEMPLATES = {
  RANGE_USE_PLAN: 'rup.html',
};

export const AGREEMENT_HOLDER_ROLE = {
  PRIMARY: 1,
  SECONDARY: 2,
};

export const REPORT_DEFAULTS = {
  DATE_FORMAT: 'MMMM Do, YYYY',
};

export const SSO_ROLE_MAP = {
  ADMINISTRATOR: 'myra_admin',
  RANGE_OFFICER: 'myra_range_officer',
  AGREEMENT_HOLDER: 'myra_client',
};

export const NOT_PROVIDED = 'Not provided';
