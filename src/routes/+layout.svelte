<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  import '$lib/global.scss';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <h1>地理<small>授業時間</small>探求<small>App</small></h1>
</header>

{@render children()}
