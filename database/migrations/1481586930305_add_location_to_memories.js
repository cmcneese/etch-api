'use strict';

const Schema = use('Schema');

class MemoriesTableSchema extends Schema {

  up() {
    this.table('memories', (table) => {
      table.float('lat');
      table.float('lng');
    });
  }

  down() {
    this.table('memories', (table) => {
      table.dropColumn('lat');
      table.dropColumn('lng');
    });
  }

}

module.exports = MemoriesTableSchema;
