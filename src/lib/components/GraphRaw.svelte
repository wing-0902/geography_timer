<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { getValueToName, type Action } from '$lib/utils/getValueToName';

  // 1秒ごとにグラフを更新するためのタイマー（最新の作業時間を反映させるため）
  let now = $state(Date.now());
  $effect(() => {
    const interval = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(interval);
  });

  // 時間ベースでの集計
  const timeline = $derived.by(() => {
    const items = historyStore.allItems;
    if (items.length === 0) return [];

    // 各区間の「期間」を計算
    const sections = items.map((item, i) => {
      const nextTime = items[i + 1]?.time ?? now; // 次がなければ現在時刻
      const duration = Math.max(0, nextTime - item.time);
      return {
        ...item,
        duration,
        name: getValueToName(item.action)
      };
    });

    const totalDuration = sections.reduce((sum, s) => sum + s.duration, 0);

    return sections.map((s) => ({
      ...s,
      width: (s.duration / totalDuration) * 100
    }));
  });

  const getColor = (action: Action) => {
    const colors: Record<Action, string> = {
      start: '#4caf50',
      work: '#2196f3',
      study: '#9c27b0',
      talk: '#ffeb3b',
      chat: '#ffc107',
      finish: '#607d8b',
      late: '#f44336',
      test: '#ff5722',
      other: '#9e9e9e'
    };
    return colors[action] || '#ccc';
  };

  // ミリ秒を読みやすい形式に
  const formatDuration = (ms: number) => {
    const min = Math.floor(ms / 60000);
    return min > 0 ? `${min}分` : '1分未満';
  };
</script>

{#if historyStore.isLoaded && timeline.length > 0}
  <div class="container">
    <div class="time-bar">
      {#each timeline as seg}
        <div
          class="segment"
          style="width: {seg.width}%; background-color: {getColor(seg.action)};"
          title="{seg.name}: {formatDuration(seg.duration)}"
        >
          {#if seg.width > 10}
            <span class="label">{seg.name}</span>
          {/if}
        </div>
      {/each}
    </div>

    <div class="legend">
      {#each timeline as seg}
        <div class="legend-item">
          <span class="dot" style="background-color: {getColor(seg.action)}"></span>
          <span>{seg.name} ({formatDuration(seg.duration)})</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .container {
    width: 100%;
    margin: 20px 0;
  }

  .time-bar {
    display: flex;
    height: 40px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: #eee;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .segment {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.3s ease; // 伸びるアニメーション
    border-right: 1px solid rgba(255, 255, 255, 0.2);

    .label {
      color: white;
      font-size: 12px;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      white-space: nowrap;
    }
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    font-size: 12px;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
</style>
