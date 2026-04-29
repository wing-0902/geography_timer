<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { getValueToName } from '$lib/utils/getValueToName';
</script>

{#if historyStore.lastAction}
  {#if historyStore.lastAction.action === 'finish'}
    <p>終了済み</p>
  {:else}
    <p>{getValueToName(historyStore.lastAction.action)}</p>
  {/if}
{:else}
  <p>授業未実施</p>
{/if}
