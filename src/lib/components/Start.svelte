<script lang="ts">
  import { historyStore } from '$lib/utils/syncLocal.svelte';

  function reset() {
    const check = confirm('データを消去しますか？');

    if (check) {
      historyStore.clear();
    }
  }

  function fin() {
    const check = confirm('終了しますか？');

    if (check) {
      historyStore.add('finish');
    }
  }

  function start() {
    const check = confirm('開始しますか？');

    if (check) {
      historyStore.add('start');
    }
  }
</script>

<div class="root">
  {#if historyStore.lastAction}
    {#if historyStore.lastAction.action === 'finish'}
      <button onclick={reset}> リセット </button>
    {:else}
      <button onclick={fin}> 授業を終了 </button>
    {/if}
  {:else}
    <button onclick={start}> 授業をはじめる </button>
  {/if}
</div>

<style lang="scss">
  .root {
    button {
      width: 270px;
    }
  }
</style>
