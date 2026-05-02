<script lang="ts">
  import GraphRaw from '$lib/components/GraphRaw.svelte';
  import GraphFixed from '$lib/components/GraphFixed.svelte';
  import Export from '$lib/components/Export.svelte'; 
  
  import { historyStore } from '$lib/utils/syncLocal.svelte';
</script>

<div class="return">
  <a href="/">＜戻る</a>
</div>

<GraphRaw />
<GraphFixed />

{#if historyStore.lastActionStr === "finish"}
  <Export />
{:else}
  <p class='warn'>計測中のファイルの読み書きはできません．</p>
{/if}

<style lang="scss">
  .return {
    text-align: left;
    padding: 0 15px;
  }

  .warn {
    font-size: 20px;
  }
</style>
