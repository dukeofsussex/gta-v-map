import type { TileLayerOptions } from 'leaflet';

interface Config {
  // Map layers
  base: ConfigOptions[];

  // Overlay layers
  overlay: Omit<ConfigOptions, 'bgColour'>[];
}

interface ConfigOptions extends TileLayerOptions {
  // CSS background colour
  bgColour: string;

  id: string;

  // Height of the full image
  imageHeight: number;

  // Width of the full image
  imageWidth: number;

  // Tile layer url template (relative to the /static directory)
  urlTemplate: string;
}
