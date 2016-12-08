'use strict'

const Lucid = use('Lucid')

class Memory extends Lucid {


  user() {
    return this.belongsTo('App/Model/User', 'id', 'user_id');
  }
}

module.exports = Memory
