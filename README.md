# GTA V Map

[![GitHub license](https://img.shields.io/github/license/dukeofsussex/gta-v-map)](https://github.com/dukeofsussex/gta-v-map/blob/master/LICENSE)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dukeofsussex/gta-v-map)

Basic leaflet map for GTA V with additional drawing tools.

> This repository only provides a minimum data set and will require additional configuration.

## Preview

Try it out [here](https://dukeofsussex.dev/projects/gta-v-map).

## Prerequisites

* [NodeJS](https://nodejs.org/en/)

## Installation

1. Fork and clone this repository
2. ```cd``` into the cloned repository's folder
3. Run ```npm install``` to retrieve/install all dependencies
4. Configure [map tiles](#map-tiles) by copying `map.config.example.js` to `map.config.js`
5. Run ```npm run dev``` to launch the development server
6. Navigate to ```http://localhost:8080``` in your preferred browser

## Map Tiles

This repository only provides a basic tile set of the [Atlas](https://www.bragitoff.com/2015/11/gta-v-maps-quad-ultra-high-definition-8k-quality/) map. To add additional zoom levels/layers:

1. Find a high resolution map image (8k+) and tile it, or download a tiled map
2. Add tiles to `/static/maps/<layer>`
3. Add config to `map.config.js`

All tiles on the [demo site](https://dukeofsussex.dev/projects/gta-v-map) have been generated using this Docker command:

```sh
docker run --rm -v ${pwd}:/data ghcr.io/osgeo/gdal:ubuntu-small-latest gdal2tiles.py -p raster -z <minZoom>-<maxZoom> --processes=<cpu-cores> --tiledriver=WEBP --xyz -w none /data/<path-to-image> /data/static/maps/<layer>
```

## Contributing

Any contributions made are welcome and greatly appreciated.

1. Fork the project
2. Create your feature branch (`git checkout -b feature`)
3. Code it
4. Commit your changes (`git commit -m 'Add something awesome'`)
5. Push to the branch (`git push origin feature`)
6. Open a Pull Request

## Credits

* [RiceaRaul](https://github.com/RiceaRaul/gta-v-map-leaflet) for example maps and source code
* [NelsonMinar](https://gist.github.com/NelsonMinar/6600524) for reference source code

## License

This project is licensed under the GNU GPL License. See the [LICENSE](LICENSE) file for details.
