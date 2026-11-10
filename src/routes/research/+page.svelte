<script lang="ts">
	import SectionPage from '$lib/SectionPage.svelte';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>Research, {profile.name}</title>
</svelte:head>

<SectionPage slug="research">
	<ul class="presentations">
		<li><a href="/research/long-slides.html">Long presentation</a></li>
		<li><a href="/research/short-slides.html">Short presentation</a></li>
	</ul>
</SectionPage>

<style>
	.presentations {
		margin-top: 1.5rem;
		padding-left: 1.25rem;
	}

	.presentations li + li {
		margin-top: 0.5rem;
	}
</style>
