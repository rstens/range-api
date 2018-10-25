'use strict';

import Model from './model';

export default class IndicatorPlant extends Model {
  static get fields() {
    // primary key *must* be first!
    return [
      'id', 'plant_species_id', 'plant_community_id',
      'criteria', 'value',
    ].map(field => `${this.table}.${field}`);
  }

  static get table() {
    return 'indicator_plant';
  }
}
