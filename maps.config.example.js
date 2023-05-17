/** @type {import('./src/types').Config} */
export default {
  base: [
    {
      attribution: '<a href="https://www.bragitoff.com/2015/11/gta-v-maps-quad-ultra-high-definition-8k-quality/" target="_blank">GTA V UHD Map</a>',
      bgColour: '#12a9cf',
      id: 'Atlas',
      imageHeight: 8192,
      imageWidth: 8192,
      maxZoom: 2,
      minZoom: 1,
      noWrap: true,
      urlTemplate: 'maps/atlas/{z}/{x}/{y}.webp',
    },
  ],
  overlay: [],
};
