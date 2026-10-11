<script lang="ts">
	import SectionPreview from '$lib/SectionPreview.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import { sections } from '$lib/sections';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>{profile.name}</title>
</svelte:head>

<h1>{profile.name}</h1>
<p class="tagline">
	Computer Science @ University of Delaware, Class of 2027<br />
	<Tooltip
		description="A research assistant who applies their deep subject knowledge to build sustainable, scalable, performant, and safe software to further academic research"
		href="https://en.wikipedia.org/wiki/Research_software_engineering"
		linkText="Wikipedia">uRSE</Tooltip
	> @ <Tooltip
		description="The First State AI Institute brings together UD's AI expertise and computing resources to advance research, prepare Delaware's AI workforce, and partner with state agencies, industry, and schools to put responsible AI to work for every Delawarean."
		href="https://first-state-ai.udel.edu/"
		linkText="Website">First State AI Institute</Tooltip
	><br />
	<Tooltip
		description="The Vertically-Integrated Projects (VIP) Program operates in a research and development context. Undergraduate students that join VIP teams earn academic credit for their participation in design/discovery efforts that assist faculty and graduate students with research and development issues in their areas of expertise."
		href="https://vip.udel.edu/"
		linkText="Website">VIP</Tooltip
	> Drone Swarming Team Lead @ <Tooltip
		description="Flying Labs employing Intelligent Engineering, the parent lab for our team"
		href="https://vip.udel.edu/project/drone/"
		linkText="Project page">FLIE Labs</Tooltip
	><br />
	uTA for <Tooltip
		description="Introduces students to UNIX systems, BASH scripting, and the C programming language"
		href="https://catalog.udel.edu/preview_course_nopop.php?catoid=94&coid=684467"
		linkText="Course catalog">CISC 210</Tooltip
	>: Introduction to <Tooltip
		description="The activity of writing software that provides services, platforms, and control mechanisms for other software and computer hardware, rather than directly for an end user"
		href="https://en.wikipedia.org/wiki/Systems_programming"
		linkText="Wikipedia">Systems Programming</Tooltip
	>
</p>

<ul class="meta">
	<li>
		<a class="btn" rel="external noopener noreferrer" target="_blank" href={profile.githubUrl}
			>GitHub</a
		>
	</li>
	<li>
		<a class="btn" rel="external noopener noreferrer" target="_blank" href={profile.linkedinUrl}
			>LinkedIn</a
		>
	</li>
	<li><a class="btn" rel="external" href={profile.resumePdfSrc}>Resume</a></li>
	<li><a class="btn" rel="external" href={profile.transcriptPdfSrc}>Transcript</a></li>
	<li>
		<a class="btn" rel="external noopener noreferrer" target="_blank" href={profile.youtubeUrl}
			>YouTube</a
		>
	</li>
</ul>

<div class="grid">
	{#each sections as section (section.slug)}
		<SectionPreview {section} />
	{/each}
</div>

<style>
	.tagline {
		margin-top: 0;
		color: var(--site-muted);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		padding: 0;
		margin: 1.25rem 0 0;
		list-style: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}
</style>
