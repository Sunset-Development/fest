// The transformer is still very buggy but so ill fix it later
// It works for now

const transform = (ast) => {

    if(ast[2] == true){
        return ast;
    }
    
    let new_ast = {
        type: "program",
        body: []
    };
    let tokens = ast.body;
    let tok_index = 0;
    let cur_tok = tokens[tok_index];
    
    ///////////////////////////////////

    // Formatting CallExpressions
    let temp = [];

    const formatExpression = (ex) => {
        temp.push({
            type: "left paren",
            value: "("
        });

        for(let i in ex.params){
            if(ex.params[i].type != "CallExpression"){
                temp.push(ex.params[i]);
            }
            else{
                formatExpression(ex.params[i]);
            }
        }

        temp.push({
            type: "right paren",
            value: ")"
        });
    }
    
    for(let i in tokens)
    {
        if(tokens[i].type != "CallExpression"){
            temp.push(tokens[i]);
        }
        else{
            formatExpression(tokens[i]);
        }
    }

    tokens = temp;

    //console.log(tokens);

    ///////////////////////////////////

    const advance = () => {
        tok_index += 1;
        
        if(tok_index < tokens.length){
            cur_tok = tokens[tok_index];
        }

        return cur_tok;
    }

    ///////////////////////////////////

    const factor = () => {
        let token = cur_tok;

        if(["Add", "Sub"].includes(token.op_type)){
            advance();
            let f = factor();
            let node = [token, f];
            return node;
        }
        
        if(token.type == "LiteralNumber"){
            advance();
            return token;
        }

        if(token.type == "left paren"){
            advance();
            expr = expression();
            if(cur_tok.type == "right paren"){
                advance();
                expr.type = "ExpressionStatement";
                return expr;
            }
        }
    }

    ///////////////////////////////////

    const term = () => {
        return op(factor, ["Mul", "Div"]);
    }

    ///////////////////////////////////

    const expression = () => {
        return op(term, ["Add", "Sub"]);
    }
    
    ///////////////////////////////////

    const op = (func, ops) => {
        let node = func();
        let params = [node];

        if(node.type == "CallOperator"){
            return;
        }

        while(ops.includes(cur_tok.op_type)){
            let operator_tok = cur_tok;

            node = {
                type: "OperationStatement",
                operation: {
                    type: `${cur_tok.op_type}`,
                }
            };
            
            advance();
            params.push(func());

            node.operation.params = params;
            
        }
        
        return node;
        
    }

    ///////////////////////////////////

    new_ast.body.push(expression());

    ///////////////////////////////////

    return new_ast;
}

///////////////////////////////////

module.exports = transform;

//12/6/2022, 00:50, 7
//14/6/2022, 00:40, 8
//17/6/2022, 12:49, 9
//20/6/2022, 21:15, 10