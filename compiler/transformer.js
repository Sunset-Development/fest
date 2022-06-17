const transform = (ast) => {
    let new_ast = {
        type: "program",
        body: []
    };
    let tokens = ast.body;
    let tok_index = 0;
    let cur_tok = tokens[tok_index];
    
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
        
        if(token.type == "LiteralNumber"){
            advance();
            return token;
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