import { goto } from "$app/navigation";

export type CmdType = 'input' | 'output' | 'noop' ;

export type CmdHistory = {
  type: CmdType;
  text: string;
  return_code: number;
}

export function parseInput(raw_cmd:string): CmdHistory
{
    let tokens:string[] = raw_cmd.split(' ');
    if(tokens.length === 0)
    {
      return {type: 'noop', text: '', return_code: 0};
    }
    let result: CmdHistory = runCmd(tokens);
    
}


function runCmd(tokens:string[]): CmdHistory
{
  if(tokens[0] === 'cd')
  {
    return cmd_cd(tokens);
  }
  if(tokens[0] === 'ls')
  {
    return cmd_ls(tokens);
  }
}

function cmd_cd(args: string[]): CmdHistory
{

  return 0;
}
function cmd_ls(args: string[]): CmdHistory
{
  return 0;
}

