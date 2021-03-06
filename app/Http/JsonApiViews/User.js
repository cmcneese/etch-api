const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'username', 'name', 'profile_pic_url', 'location'];
  }

  memories() {
    return this.hasMany('App/Http/JsonApiViews/Memory', {
      included: false,
      excludeRelation: 'user',
    });
  }

}

module.exports = User;
