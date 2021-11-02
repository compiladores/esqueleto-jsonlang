type Expression={
    print:Expression,
}|{
    assign:string,
    value:Expression
}|{
    read:any
}|string|number|{var:string}|Expression[]


export function evaluate(program:Expression,input:any[]):string{
    let output="";
    const variables={}

    function realEvaluate(expr:Expression):any{
        if(typeof expr ==='number'  || typeof expr === 'string'){
            return expr
        }
        if(expr instanceof Object){
            if("print" in expr){
                const ret=realEvaluate(expr.print);
                output+=ret.toString()
                return ret;
            }
            if("read" in expr){
                const ret=input[0]
                input = input.slice(1)
                return ret;
            }
            if("assign" in expr){
                const ret=realEvaluate(expr.value);
                variables[expr.assign]=ret
                return ret;
            }
            if("var" in expr){
                return variables[expr.var]
            }
        }
        if(expr instanceof Array){
            let lastRet=null;
            for(let elem of expr){
                lastRet=realEvaluate(elem);
            }
            return lastRet
        }
        return expr
    }
    realEvaluate(program)
    return output;
}