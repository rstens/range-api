// Copyright © 2019 Province of British Columbia
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
// Created by Jason Leach on 2019-03-01.
//

import { default as request } from 'supertest'; // eslint-disable-line
import createApp from '../../src';

describe('Test monitoring routes', () => {
  test('The readiness probe should respond with 200 ', async () => {
    const app = await createApp();
    await request(app)
      .get('/api/v1/ehlo')
      .expect(200);
  });
});
