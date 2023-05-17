<script lang="ts">
  import { onMount } from 'svelte';
  import createMap from '$lib/map';

  let mapNode: HTMLElement;

  onMount(() => {
    createMap(mapNode);
  });
</script>

<svelte:head>
  <title>GTA V Map</title>
</svelte:head>

<section id="map"
    bind:this={mapNode}/>

<style lang="scss">
  :global(body) {
    margin: 0;
  }

  :global(.leaflet-colour-picker) {
    height: inherit;
    width: inherit;
    border: 0;
    cursor: pointer;
  }

  #map {
    height: 100vh;
    width: 100vw;
  }
</style>
