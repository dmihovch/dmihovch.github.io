<script lang="ts">
	import SectionPage from '$lib/SectionPage.svelte';
	import UnderConstruction from '$lib/UnderConstruction.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SectionPage slug={data.section.slug}>
	<UnderConstruction />
</SectionPage>
