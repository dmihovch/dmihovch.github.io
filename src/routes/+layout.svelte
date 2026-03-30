<script lang="ts">
	import { parseInput, type CmdHistory } from '$lib/shell';
	import { goto } from '$app/navigation';
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
	import '../app.css';

  let uname: string = "dan";
  let hostname: string = "portfolio";
  let dir_path:string = "~";
  let history: CmdHistory[]  = $state([]);
  let input = $state("");

	function handleKey(e: KeyboardEvent)
	{
	  if(e.key === 'Enter')
	  {
	    history.push(parseInput(input));
	    input = '';
	  }
	}


</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<div class="terminal">
      {#each history as line}
      <div class={line.type}>
        {#if line.type === "input"}
          <span class="prompt">{uname}@{hostname}:{dir_path}$</span> {line.text}
        {:else}
          {line.text}
        {/if}
      </div>
    {/each}
    <div class="input-line">
    		<span class="prompt">{uname}@{hostname}:{dir_path}$</span>
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

.terminal
{
	border: 2px solid yellow;
	color: lightgreen;
}

input:focus
{
	outline: none;
}

.term-input-box 
{
	background-color:black;
	color:lightgreen;
	border: 0;
}

.footer 
{
	color:lightgreen;
}

</style>
