<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';
  import { getValueToName, type Action, getColor as getColorFr } from '$lib/utils/getValueToName';

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

  // 時間ベースでの集計
  const timeline = $derived.by(() => {
    const items = historyStore.allItems;
    if (items.length === 0) return [];

    const sections = items.map((item, i) => {
      const nextTime = items[i + 1]?.time ?? now;
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
    return getColorFr(action);
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
          data-tooltip="{seg.name}: {formatDuration(seg.duration)}"
        >
          {#if seg.width > 10}
            <span class="label">{seg.name}</span>
          {/if}
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
    background: white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .segment {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.3s ease;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;

    &:hover {
      filter: brightness(1.1);
      z-index: 2;

      &::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: normal;
        white-space: nowrap;
        z-index: 10;
        pointer-events: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: calc(100% + 2px);
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.8);
      }
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
