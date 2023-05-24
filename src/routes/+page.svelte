<script lang="ts">
  import { onMount } from 'svelte';
  import createMap from '$lib/map';
  import Octocat from './Octocat.svelte';

  let mapNode: HTMLElement;

  onMount(() => {
    createMap(mapNode);
  });
</script>

<Octocat />
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
