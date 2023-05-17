import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import {
  Control,
  CRS,
  Draw,
  extend,
  FeatureGroup,
  map,
  Projection,
  TileLayer,
  Transformation,
  tileLayer,
} from 'leaflet';
import 'leaflet-draw';
import ColourPicker from './Control.ColourPicker';
import type { Config, ConfigOptions } from '../types';

const MAP_HEIGHT = 12400; // N: 8000, S: -4400
const MAP_WIDTH = 8250; // W: -3750, E: 4500
const DRAWING_COLOUR = '#ff0000';
const TILE_SIZE = 256; // Default tile size
const CRS_GTA = extend({}, CRS.Simple, {
  projection: Projection.LonLat,
  transformation: new Transformation(TILE_SIZE / MAP_WIDTH, 0, -TILE_SIZE / MAP_HEIGHT, 0),
  infinite: true,
});

const { base, overlay }: Config = process.env.CONFIG as unknown as Config;

function layerConversion(l: Record<string, TileLayer>, layer: Omit<ConfigOptions, 'bgColour'>) {
  // eslint-disable-next-line no-param-reassign
  l[layer.id] = tileLayer(layer.urlTemplate, {
    ...layer,
    attribution: `&copy; <a href="https://www.rockstargames.com/gta-v" target="_blank">Rockstar Games</a> | ${layer.attribution}`,
    bounds: [
      [-MAP_HEIGHT, 0],
      [0, MAP_WIDTH],
    ],
  });

  return l;
}

const baseLayers = base.reduce(layerConversion, {});
const overlayLayers = overlay.reduce(layerConversion, {});

export default function createMap(node: HTMLElement) {
  // eslint-disable-next-line no-param-reassign
  node.style.backgroundColor = base[0].bgColour;

  const mapDisplay = map(node, {
    center: [-MAP_HEIGHT / 2, MAP_WIDTH / 2],
    crs: CRS_GTA,
    dragging: true,
    layers: [baseLayers[base[0].id]],
    preferCanvas: true,
    zoom: base[0].minZoom || 3,
    // maxBounds: [
    //   [-MAP_HEIGHT * 2, -MAP_WIDTH],
    //   [MAP_HEIGHT, MAP_WIDTH * 2],
    // ],
  });

  const drawingLayer = new FeatureGroup();
  mapDisplay.addLayer(drawingLayer);

  mapDisplay.addControl(new Control.Layers(baseLayers, { Drawing: drawingLayer, ...overlayLayers }))
    .addControl(new Control.Scale());

  const drawControls = new Control.Draw({
    draw: {
      circle: false,
      circlemarker: {
        color: DRAWING_COLOUR,
        fillOpacity: 0.25,
        weight: 5,
      },
      polygon: false,
      polyline: {
        shapeOptions: {
          color: DRAWING_COLOUR,
          fillOpacity: 0.75,
          weight: 5,
        },
      },
      rectangle: false,
    },
    edit: {
      featureGroup: drawingLayer,
    },
  });

  mapDisplay.addControl(drawControls);

  const colourPicker = new ColourPicker(DRAWING_COLOUR);
  colourPicker.onInput = ((colour: string) => {
    drawingLayer.setStyle({ color: colour });
    drawControls.setDrawingOptions({
      circlemarker: {
        color: colour,
      },
      polyline: {
        shapeOptions: {
          color: colour,
        },
      },
    });
  });

  mapDisplay.addControl(colourPicker);

  mapDisplay.on('baselayerchange', (evt) => {
    // eslint-disable-next-line no-param-reassign
    node.style.backgroundColor = (evt.layer.options as ConfigOptions).bgColour;
  });

  mapDisplay.on(Draw.Event.CREATED, (evt) => {
    drawingLayer.addLayer(evt.layer);
  });
}
