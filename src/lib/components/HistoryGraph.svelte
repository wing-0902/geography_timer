<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { getValueToName } from '$lib/utils/getValueToName';

  // 相対時間を計算するなどの補助関数
  const formatTime = (ts: number) => new Date(ts).toLocaleTimeString();
</script>

<h2>履歴一覧 ({historyStore.items.length}件)</h2>
<ul class="list">
  {#each historyStore.items as item}
    <li>
      <strong>{formatTime(item.time)}</strong>
      ：{getValueToName(item.action)}
    </li>
  {/each}
</ul>

<style lang="scss">
  .list {
    font-size: 20px;

    list-style-type: none;
    padding-left: 0;
  }
</style>
