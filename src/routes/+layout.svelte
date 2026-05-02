<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';

  let { children } = $props();

  import '$lib/global.scss';

  import { VERSION } from '@sveltejs/kit';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>地理授業時間探求</title>
</svelte:head>

<header>
  <h1>地理<small>授業時間</small>探求<small>App</small></h1>
</header>

{@render children()}

<footer class="footer">
  <p>
    Created by @wing.osaka
    <br />
    <a href="https://github.com/wing-0902/geography_timer" target='_blank'>Source Code on GitHub</a>
    <br />
    SvelteKit v{VERSION}
  </p>
</footer>

<style lang="scss">
  .footer {
    margin-top: 30px;
    p {
      font-size: 15px;
      line-height: 1.8;
    }
  }
</style>
