<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { ACTIONS, getValueToName } from '$lib/utils/getValueToName';
</script>

<div class="root">
  {#if historyStore.lastAction}
    {#if historyStore.lastAction.action !== 'finish'}
      <h2>状態を変更する</h2>
      {#each ACTIONS as action}
        {#if action !== 'start' && action !== 'finish'}
          <button onclick={() => historyStore.add(action)}>{getValueToName(action)}</button>
        {/if}
      {/each}
    {/if}
  {/if}
</div>

<style lang="scss">
  .root {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 270px;
    }
  }
</style>
