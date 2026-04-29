<script lang="ts">
  import CurrentTime from '$lib/components/CurrentTime.svelte';
  import LastAction from '$lib/components/LastAction.svelte';
  import Start from '$lib/components/Start.svelte';

  import { historyStore } from '$lib/utils/syncLocal.svelte';
</script>

<CurrentTime />
<LastAction />
<Start />
