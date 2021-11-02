type Expression = {
  print: Expression,
} | {
  assign: string,
  value: Expression
} | {
  read: any
} | string | number | { var: string } | Expression[]

interface EvaluateOutput {
  val: any,
  env: Record<string, any>,
  input: any[],
  output: string
}
interface EvaluateArgs {
  expr: Expression,
  env: Record<string, any>,
  input: any[],
  output: string
}
function realEvaluate(args: EvaluateArgs): EvaluateOutput {
  const { env, expr, input, output } = args;
  if (typeof expr === 'number' || typeof expr === 'string') {
    return { ...args, val: expr }
  }
  if (expr instanceof Object) {
    if ("print" in expr) {
      const ret = realEvaluate({ ...args, expr: expr.print });
      return {
        env,
        input,
        output: output + ret.val.toString(),
        val: ret
      }
    }
    if ("read" in expr) {
      return {
        env,
        input: input.slice(1),
        output,
        val: input[0]
      }
    }
    if ("assign" in expr) {
      const ret = realEvaluate({ ...args, expr: expr.value });
      return {
        env: {
          ...ret.env,
          [expr.assign]: ret.val
        },
        input:ret.input,
        output:ret.output,
        val: ret.val
      }
    }
    if ("var" in expr) {
      return {
        env,
        input,
        output,
        val: env[expr.var]
      }
    }
  }
  if (expr instanceof Array) {
    if (expr.length === 1) {
      return realEvaluate({ ...args, expr: expr[0] })
    } else {
      const [head, ...tail] = expr;
      const ret = realEvaluate({ ...args, expr: head });
      return realEvaluate({
        env: ret.env,
        input: ret.input,
        output: ret.output,
        expr: tail
      });
    }
  }
}


export function evaluate(program: Expression, input: any[]): string {
  return realEvaluate({ env: {}, expr: program, input, output: "" }).output
}