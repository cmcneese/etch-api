'use strict';

const Schema = use('Schema');

class MemorySchema extends Schema {

  up() {
    this.create('memories', (table) => {
      table.increments();
      table.integer('user_id').references('users.id');
      table.string('track_id');
      table.string('emoji');
      table.string('text');
      table.timestamp('date');
      table.timestamps();
    });
  }

  down() {
    this.drop('memories');
  }

}

module.exports = MemorySchema;
