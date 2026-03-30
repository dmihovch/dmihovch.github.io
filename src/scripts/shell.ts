
export type CmdType = 'input' | 'output' | 'noop' ;

export type CmdHistory = {
  type: CmdType;
  text: string;
  return_code: number;
}

export function parseInput(raw_cmd:string): CmdHistory
{
    let tokens:string[] = tokenizeInput(raw_cmd);
    if(tokens.length === 0)
    {
      return {type: 'noop', text: '', return_code: 0};
    }

}

function tokenizeInput(raw_cmd: string): string[]
{
  return raw_cmd.split(' ');
}

function runCmd(tokens:string[]): number
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

function cmd_cd(args: string[]): number
{
  return 0;
}
function cmd_ls(args: string[]): number
{
  return 0;
}

