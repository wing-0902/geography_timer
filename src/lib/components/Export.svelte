<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';

  let fileName = $state('');
</script>

<div class="root">
  {#if historyStore.lastActionStr === null}
    <button onclick={() => historyStore.importFromJson()}>読み込み</button>
  {:else}
    <button onclick={() => historyStore.exportAll(fileName)}>書き出し</button>
    <input placeholder="file name here.." type="text" bind:value={fileName} />
  {/if}
</div>

<style lang="scss">
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      width: 270px;
    }

    input {
      border: 1px solid white;
      color: white;
      background-color: transparent;
      padding: 0 20px;
      height: 54px;
      border-radius: 27px;
      width: 228px;
    }
  }
</style>
