const JsonApiView = require('adonis-jsonapi/src/JsonApiView');

class Track extends JsonApiView {
  get attributes() {
    return ['album', 'artists', 'external_urls', 'name', 'popularity'];
  }

}

module.exports = Track;
