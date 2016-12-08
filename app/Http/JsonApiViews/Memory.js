const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Memory extends JsonApiView {
  get attributes() {
    return ['track_id', 'emoji', 'text', 'date'];
  }

  user() {
    return this.belongsTo('App/Http/JsonApiViews/User', {
      included: true,
      excludeRelation: 'memories'
    });
  }

}

module.exports = Memory;
