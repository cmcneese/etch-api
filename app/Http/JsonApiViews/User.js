const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class User extends JsonApiView {
  get attributes() {
    return ['email', 'username', 'name', 'profile_pic_url'];
  }

}

module.exports = User;
