<script lang="ts">
  import GraphRaw from '$lib/components/GraphRaw.svelte';
  import GraphFixed from '$lib/components/GraphFixed.svelte';
</script>

<div class='return'>
<a href='/'>＜戻る</a>
</div>

<GraphRaw />
<GraphFixed />

<style lang="scss">
    .return {
        text-align: left;
        padding: 0 15px;
    }
</style>