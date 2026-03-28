


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
    			bind:value={input}
    			onkeydown={handleKey}
    			spellcheck="false"
    		/>
	</div>
</div>


<script>
  let history = $state([])
  let input = $state("");

function handleKey(e)
  {
    if(e.key === "Enter")
    {
      history = runCommand(input);
      input = "";
    }
  }

function runCommand(input)
  {
    if(input === "clear") return [];
    return [...history, {type: "input", text: input}, {type: "output", text: `ran: ${input}`}]
  }
</script>
