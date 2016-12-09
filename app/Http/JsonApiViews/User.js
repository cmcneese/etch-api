const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'username', 'name'];
  }

  memories() {
    return this.hasMany('App/Http/JsonApiViews/Memory', {
      included: true,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
