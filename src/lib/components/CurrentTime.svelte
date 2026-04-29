<script lang="ts">
  let now = $state(new Date());

  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  // フォーマット済みの文字列（リアクティブに更新される）
  const timeString = $derived(now.toLocaleTimeString());
</script>

<p>{timeString}</p>
