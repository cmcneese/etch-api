'use strict';

const Schema = use('Schema');

class UsersTableSchema extends Schema {

  up() {
    this.table('users', (table) => {
      table.string('location');
    });
  }

  down() {
    this.table('users', (table) => {
      // opposite of up goes here
      table.dropcolumn('location');
    });
  }

}

module.exports = UsersTableSchema;
