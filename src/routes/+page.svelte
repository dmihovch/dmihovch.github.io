
<div id="pageCont">
	<div id="links">
		<a href="https://github.com/dmihovch" target="_blank" rel="noopener noreferrer"><img class="icons" src="/icons8-github-50.png" alt="Github Logo"></a>
		<a href="https://www.linkedin.com/in/danielmihovch/" target="_blank" rel="noopener noreferrer"><img class="icons" src="/icons8-linkedin-50.png" alt="Linkedin Logo"></a>
	</div>
	
	<div id="header">
		<div id="myPicCont">
			<img id="myPic" src="/danM.jpeg" alt="me in a cool hat">
		</div>
		
		<h1>Dan Mihovch</h1>
		<h2>Computer Science @ University of Delaware</h2>
		<p> Hey, welcome! Glad you could make it. A little about myself: 
			I am an honors undergraduate computer science student at the University of Delaware. 
			My passions for coding and helping others led me to landing 
			a job as a Teaching Assistant for UD’s Intro to Computer Science courses. 
			When I’m not coding or teaching, you can probably find me in the boat getting 
			those meters in with my teammates from the University of Delaware Men’s Crew team. 
			While I have not yet declared a concentration for my degree, I am leaning towards 
			focusing on Systems and Networks. With that being said, I do very much enjoy exploring 
			all different domains of CS, from web development with frameworks like Svelte all the 
			way down to programming raspberry pi’s with Assembly. 
		</p>
		<div>
			<p>Let's Connect, I'd love to talk! You can <a href="mailto:dmihovch@gmail.com">email</a> 
				me, or connect on any of the socials I've provided! Look forward to hearing from you!
			</p>
		</div>
	</div>
	
	<div id="pages">
		<a href="/projects"><img class="icons" src="/icons8-tools-50.png" alt="tools"></a>
		<a href="/resume"><img class="icons" src="/icons8-resume-50.png" alt="resume"></a>
	</div>
</div>
<div id="credits">
	<p>Icons provided by <a href="https://icons8.com">icons8.com</a>, thanks!</p>
</div>

<style>
	#pageCont {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	#header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%,-50%);
		
	}
	#header > * {
		margin: 5px;
	}
	#myPicCont {
		position: relative;
		left: 50%;
		transform: translate(-50%);
		width: 200px;
		height: 200px;
		overflow: hidden;
	}
	#myPic {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border: 2px solid black;
		border-radius: 10px;
		box-sizing: border-box;
	}
	#links {
		display: flex;
		flex-direction: column;
		position:absolute;
		top:50%;
		left: 10%;
		gap: 50px;
	}
	#pages {
		display:flex;
		flex-direction: column;
		position: absolute;
		top:50%;
		left:85%;
		gap: 50px;
	}
	#credits {
		position: absolute;
		top:95%;
	}
	.icons {
		filter: invert(1) brightness(2);
		transition: transform 0.3s ease, filter 0.3s ease-in-out;
	}
	.icons:hover {
		transform: scale(1.1);
	}

</style>