const fetch = require('node-fetch');

module.exports = class Spotify {
  static get inject() {
    return ['Redis'];
  }

  constructor(Redis) {
    this.Redis = Redis;
  }

  * findAll() {
    const allIds = JSON.parse(yield this.Redis.get('spotify:all')) || [];

    return yield this.findMany(allIds);
  }

  * findMany(ids) {
    return yield ids.map(id => this.find(id));
  }

  * find(id) {
    const spotifyValue = JSON.parse(yield this.Redis.get(`spotify:${id}`));

    if (spotifyValue) {
      return spotifyValue;
    }

    const info = yield fetch(`https://api.spotify.com/v1/tracks/${id}`)
      .then(r => r.json());

    yield this.Redis.set(`spotify:${id}`, JSON.stringify(info));
    const allIds = JSON.parse(yield this.Redis.get('spotify:all')) || [];
    yield this.Redis.set('spotify:all', JSON.stringify([...allIds, id]));

    return info;
  }
};
