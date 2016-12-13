'use strict';

const Memory = use('App/Model/Memory');
const Spotify = make('App/Spotify');
const attributes = ['track-id', 'emoji', 'text', 'date'];

class MemoryController {

  * addTrackInfo(memory) {
    const track = yield Spotify.find(memory.track_id);

    return Object.assign({}, memory, { track });
  }

  * index(request, response) {
    let query = Memory.with('user');

    if (request.input('limit')) {
      query = query.limit(request.input('limit'));
    }

    const memories = yield query.fetch();

    response.jsonApi('Memory', yield memories.toJSON().map(this.addTrackInfo));
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const memory = yield Memory.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Memory', yield this.addTrackInfo(memory.toJSON()));
  }

  * show(request, response) {
    const id = request.param('id');
    const memory = yield Memory.with('user').where({ id }).firstOrFail();

    response.jsonApi('Memory', yield this.addTrackInfo(memory.toJSON()));
  }

  * update(request, response) {
    const id = request.param('id');
    request.jsonApi.assertId(id);

    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };

    const memory = yield Memory.with('user').where({ id }).firstOrFail();
    memory.fill(Object.assign({}, input, foreignKeys));
    yield memory.save();

    response.jsonApi('Memory', yield this.addTrackInfo(memory.toJSON()));
  }

  * destroy(request, response) {
    const id = request.param('id');

    const memory = yield Memory.query().where({ id }).firstOrFail();
    yield memory.delete();

    response.status(204).send();
  }

}

module.exports = MemoryController;
