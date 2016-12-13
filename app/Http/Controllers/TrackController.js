const Spotify = make('App/Spotify');

module.exports = class TrackController {
  * index(request, response) {
    const tracks = yield Spotify.findAll();

    response.jsonApi('Track', tracks);
  }

  * show(request, response) {
    const track = yield Spotify.find(request.param('id'));

    response.jsonApi('Track', track);
  }
};
