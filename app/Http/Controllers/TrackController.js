const Spotify = make('App/Spotify');
const Memory = use('App/Model/Memory');
const Database = use('Database');

module.exports = class TrackController {
  * index(request, response) {
    if (request.input('popular')) {
      const popularTracks = yield Memory.query()
        .select(Database.raw('COUNT(id) as recorded, track_id'))
        .whereNot('track_id', '=', '')
        .orderBy('recorded', 'desc')
        .groupBy('track_id')
        .limit(request.input('limit') || 10);

      const tracks = yield Spotify.findMany(popularTracks.map(t => t.track_id));

      return response.jsonApi('Track', tracks.map((track, index) => Object.assign({}, track, { popularity: popularTracks[index].recorded })));
    }
    const tracks = yield Spotify.findAll();

    response.jsonApi('Track', tracks);
  }

  * show(request, response) {
    const track = yield Spotify.find(request.param('id'));

    response.jsonApi('Track', track);
  }
};
