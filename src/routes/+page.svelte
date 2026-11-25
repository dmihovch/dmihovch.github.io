<script lang="ts">
	import SectionPreview from '$lib/SectionPreview.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import { sections } from '$lib/sections';
	import { profile } from '$lib/site';
</script>

<svelte:head>
	<title>{profile.name}</title>
	<meta
		name="description"
		content="Daniel Mihovch, computer science student at the University of Delaware. Research software engineering, drone swarming, systems programming, and teaching."
	/>
</svelte:head>

<section class="introduction" aria-labelledby="profile-heading">
	<div class="profile">
		<p class="eyebrow">Computer Science / Class of 2027</p>
		<h1 id="profile-heading">{profile.name}</h1>
		<p class="university">University of Delaware</p>
		<div class="profile-actions">
			<a class="btn btn-primary" rel="external" href={profile.resumePdfSrc}>Resume ↗</a>
			<a class="btn" rel="external" href={profile.transcriptPdfSrc}>Transcript ↗</a>
		</div>
		<ul class="profile-links" aria-label="Social profiles">
			<li><a rel="external" href={profile.githubUrl}>GitHub ↗</a></li>
			<li><a rel="external" href={profile.linkedinUrl}>LinkedIn ↗</a></li>
			<li><a rel="external" href={profile.youtubeUrl}>YouTube ↗</a></li>
		</ul>
	</div>

	<div class="roles panel">
		<div class="roles-heading">
			<span class="eyebrow">Current roles</span>
		</div>
		<dl>
			<div class="role">
				<dt>Research</dt>
				<dd>
					<Tooltip
						description="A research assistant who applies their deep subject knowledge to build sustainable, scalable, performant, and safe software to further academic research"
						href="https://en.wikipedia.org/wiki/Research_software_engineering"
						linkText="Wikipedia">uRSE</Tooltip
					>
					<span class="affiliation"
						>@ <Tooltip
							description="The First State AI Institute brings together UD's AI expertise and computing resources to advance research, prepare Delaware's AI workforce, and partner with state agencies, industry, and schools to put responsible AI to work for every Delawarean."
							href="https://first-state-ai.udel.edu/"
							linkText="Website">First State AI Institute</Tooltip
						></span
					>
				</dd>
			</div>
			<div class="role">
				<dt>Leadership</dt>
				<dd>
					<Tooltip
						description="The Vertically-Integrated Projects (VIP) Program operates in a research and development context. Undergraduate students that join VIP teams earn academic credit for their participation in design/discovery efforts that assist faculty and graduate students with research and development issues in their areas of expertise."
						href="https://vip.udel.edu/"
						linkText="Website">VIP</Tooltip
					> Drone Swarming Team Lead
					<span class="affiliation"
						>@ <Tooltip
							description="Flying Labs employing Intelligent Engineering, the parent lab for our team"
							href="https://vip.udel.edu/project/drone/"
							linkText="Project page">FLIE Labs</Tooltip
						></span
					>
				</dd>
			</div>
			<div class="role">
				<dt>Teaching</dt>
				<dd>
					uTA for <Tooltip
						description="Introduces students to UNIX systems, BASH scripting, and the C programming language"
						href="https://catalog.udel.edu/preview_course_nopop.php?catoid=94&coid=684467"
						linkText="Course catalog">CISC 210</Tooltip
					>
					<span class="affiliation"
						>Introduction to <Tooltip
							description="The activity of writing software that provides services, platforms, and control mechanisms for other software and computer hardware, rather than directly for an end user"
							href="https://en.wikipedia.org/wiki/Systems_programming"
							linkText="Wikipedia">Systems Programming</Tooltip
						></span
					>
				</dd>
			</div>
		</dl>
	</div>
</section>

<section class="explore" aria-labelledby="explore-heading">
	<div class="section-heading">
		<h2 id="explore-heading">Explore</h2>
		<span>Research, projects &amp; notes</span>
	</div>
	<div class="section-grid">
		{#each sections as section (section.slug)}
			<SectionPreview {section} />
		{/each}
	</div>
</section>

<style>
	.introduction {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(2rem, 5vw, 7rem);
		padding-block: 1rem 3rem;
	}
	.profile {
		min-width: 0;
	}
	.profile h1 {
		margin: 0.75rem 0 0.5rem;
		font-size: clamp(2.75rem, 4.5vw, 5rem);
		line-height: 1.1;
		letter-spacing: -0.035em;
	}
	.eyebrow {
		color: var(--site-muted);
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.university {
		color: var(--site-muted);
		font-size: 1.15rem;
	}
	.profile-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.5rem;
	}
	.profile-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		padding: 0;
		margin: 0.75rem 0 0;
		list-style: none;
		font-size: 0.85rem;
	}
	.profile-links a {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
	}
	.roles {
		min-width: 0;
	}
	.roles-heading {
		padding: 0.65rem 1.25rem;
		border-bottom: 1px solid var(--site-border);
	}
	dl {
		margin: 0;
		padding-inline: 1.25rem;
	}
	.role {
		display: grid;
		grid-template-columns: 6.5rem minmax(0, 1fr);
		gap: 1rem;
		padding-block: 0.9rem;
	}
	.role + .role {
		border-top: 1px solid var(--site-border);
	}
	dt {
		padding-top: 0.15rem;
		color: var(--site-muted);
		font-size: 0.8rem;
	}
	dd {
		margin: 0;
	}
	.affiliation {
		display: block;
		color: var(--site-muted);
		font-size: 0.9rem;
	}
	.section-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid var(--site-border);
	}
	.section-heading h2 {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 1rem;
	}
	.section-heading > span {
		color: var(--site-muted);
		font-size: 0.8rem;
	}
	.section-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}
	@media (max-width: 64rem) {
		.introduction {
			gap: 2rem;
		}
		.role {
			grid-template-columns: 1fr;
			gap: 0.2rem;
		}
		.section-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 48rem) {
		.introduction {
			grid-template-columns: 1fr;
			padding-block: 0.5rem 2.5rem;
		}
		.role {
			grid-template-columns: 6.5rem minmax(0, 1fr);
			gap: 0.75rem;
		}
	}
	@media (max-width: 36rem) {
		.profile-links {
			display: grid;
			grid-template-columns: repeat(2, max-content);
			column-gap: 1.5rem;
		}

		.profile h1 {
			font-size: clamp(2.5rem, 10vw, 3.5rem);
		}
		.section-grid {
			grid-template-columns: 1fr;
		}
		.section-heading > span {
			display: none;
		}
		.role {
			grid-template-columns: 1fr;
			gap: 0.2rem;
		}
	}
</style>
