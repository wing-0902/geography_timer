<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { getValueToName, type Action, ACTIONS } from '$lib/utils/getValueToName';

  // 1秒ごとにグラフを更新するためのタイマー（最新の作業時間を反映させるため）
  let nowOnClock = $state(Date.now());
  $effect(() => {
    const interval = setInterval(() => (nowOnClock = Date.now()), 1000);
    return () => clearInterval(interval);
  });

  const now = $derived.by(() => {
    const last = historyStore.lastAction;
    if (last && last.action === 'finish') {
      return last.time;
    }
    return nowOnClock;
  });

  const stats = $derived.by(() => {
    const items = historyStore.allItems;
    if (items.length === 0) return [];

    // 1. 各アクションの合計ミリ秒を計算
    const totals: Partial<Record<Action, number>> = {};

    items.forEach((item, i) => {
      const nextTime = items[i + 1]?.time ?? now;
      const duration = Math.max(0, nextTime - item.time);

      totals[item.action] = (totals[item.action] || 0) + duration;
    });

    const overallTime = Object.values(totals).reduce((a, b) => a + b, 0);

    // 2. グラフ用のデータ配列に変換
    return Object.entries(totals)
      .map(([action, ms]) => ({
        action: action as Action,
        name: getValueToName(action as Action),
        ms,
        percentage: (ms / overallTime) * 100
      }))
      .sort((a, b) => b.ms - a.ms); // 時間が長い順に並べる
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

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}時間`);
    if (mins > 0 || hours > 0) parts.push(`${mins}分`);
    parts.push(`${secs}秒`);

    return parts.join('');
  };
</script>

<div class="analyzer">
  {#if stats.length > 0}
    <div class="bar-chart">
      {#each stats as stat}
        <div
          class="segment"
          style="width: {stat.percentage}%; background-color: {getColor(stat.action)}"
          title="{stat.name}: {formatTime(stat.ms)}"
        >
          {#if stat.percentage > 12}
            <span class="label">{stat.name}</span>
          {/if}
        </div>
      {/each}
    </div>

    <ul class="summary-list">
      {#each stats as stat}
        <li>
          <span class="dot" style="background-color: {getColor(stat.action)}"></span>
          <span class="name">{stat.name}</span>
          <span class="time">{formatTime(stat.ms)}</span>
          <span class="percent">({stat.percentage.toFixed(1)}%)</span>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty-msg">履歴データがありません</p>
  {/if}
</div>

<style lang="scss">
  .bar-chart {
    display: flex;
    height: 36px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    background-color: white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }

  .segment {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.5s ease;

    .label {
      color: white;
      font-size: 11px;
      font-weight: bold;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
  }

  .summary-list {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid white;
      font-size: 15px;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 3px;
      }
      .name {
        font-weight: bold;
        width: 60px;
      }
      .time {
        color: white;
        flex-grow: 1;
      }
      .percent {
        color: white;
        font-size: 13px;
      }
    }
  }

  .empty-msg {
    text-align: center;
    color: white;
    padding: 20px;
  }
</style>
