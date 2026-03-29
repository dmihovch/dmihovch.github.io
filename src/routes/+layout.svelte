<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	let { children } = $props();
	import '../app.css';



import { goto } from '$app/navigation';

	  type TermHistoryLine = {
	    type: string;
	    text: string;
	  };  
	  let history: TermHistoryLine[]  = $state([])
	  let input = $state("");

	function handleKey(e: KeyboardEvent)
	{
	  if(e.key === "Enter")
	  {
	    history = runCommand(input);
	    input = "";
	  }
	}
//this is gonna be a full parser
	function runCommand(input:string)
	  {
	    if(input === "clear") return [];
	    if(input === "cd projects")
	    {
	      goto('projects');
	      return [...history, {type: 'input', text:input}, {type:'output',text:`ran: ${input}`}]
	    }
	    if(input === "cd home")
	    {
	    	goto('/')
	      return [...history, {type: 'input', text:input}, {type:'output',text:`ran: ${input}`}]
	    }
	    return [...history, {type: 'input', text: input}, {type: 'output', text: `ran: ${input}`}]
	  }

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<div class="terminal">
      {#each history as line}
      <div class={line.type}>
        {#if line.type === "input"}
          <span class="prompt">$</span> {line.text}
        {:else}
          {line.text}
        {/if}
      </div>
    {/each}
    <div class="input-line">
    		<span class="prompt">$</span>
				<input
					class="term-input-box"
	  			bind:value={input}
    			onkeydown={handleKey}
    			spellcheck="false"
    		/>
	</div>
</div>

{@render children()}


<footer class="footer">
	<p>Daniel John Mihovch, CS @ University of Delaware</p>
</footer>

<style>

	.terminal{
	border: 2px solid yellow;
		color: lightgreen;
	}

input:focus{
	outline: none;
}

.term-input-box {
	background-color:black;
	color:lightgreen;
	border: 0;
	
}

.footer {
	color:lightgreen;
}

</style>
