'use strict';

const Memory = use('App/Model/Memory');
const attributes = ['track-id', 'emoji', 'text', 'date', 'lat', 'lng'];

class MemoryController {

  * index(request, response) {
    const memories = yield Memory.with('user').fetch();

    response.jsonApi('Memory', memories);
  }

  * store(request, response) {
    const input = request.jsonApi.getAttributesSnakeCase(attributes);
    const foreignKeys = {
      user_id: request.currentUser.id,
    };
    const memory = yield Memory.create(Object.assign({}, input, foreignKeys));

    response.jsonApi('Memory', memory);
  }

  * show(request, response) {
    const id = request.param('id');
    const memory = yield Memory.with('user').where({ id }).firstOrFail();

    response.jsonApi('Memory', memory);
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

    response.jsonApi('Memory', memory);
  }

  * destroy(request, response) {
    const id = request.param('id');

    const memory = yield Memory.query().where({ id }).firstOrFail();
    yield memory.delete();

    response.status(204).send();
  }

}

module.exports = MemoryController;
