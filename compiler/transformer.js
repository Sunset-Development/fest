const traverse = (ast, methods) => {

    const traverseArr = (current, parent) => {
         for(let child in current){
              traverseNode(child, parent);
         }
    }

    const traverseNode = (node, parent) => {

          let func = methods[node.type];
          if (func) {
              func(node, parent);
          }

        
          switch(node.type)   
          {
              case "program":
                  traverseArr(node.body, node);
                  break;
              case "CallExpression":
                  traverseArr(node.param, node);
                  break;
              case "LiteralNumber":
                  break;
              case "CallValue":
                  break;
              /*default:
                  throw Error(`${node.type}`);
                  break;*/
          } 
        
    }

    traverseNode(ast, null)
}

const transform = (ast) => {
    let oldAst = ast;
    let newAst = oldAst;

    ast.context = newAst.body;

    const CallValueTraverse = (node, parent) => {
        let node_name = "";
        
        switch(node.value){
            case "+":
                node_name = "add";
                break;
            case "-":
                node_name = "subtract";
                break;
            case "/":
                node_name = "divide";
                break;
            case "*":
                node_name = "multiply";
                break;

        }
        
        let expression = {
            type: "CallValue",
            callee: {
                type: "Identifier",
                name: node_name
            },
            arguments: []
        }

        node.context = expression.arguments;

        if (parent.type != "CallValue"){
            let ex = {
                type: "ValueStatement",
                expression: expression
            }
        }

        parent.context.push(expression);
        }

        const NumberLiteralTraverse = (node, parent) => {
              parent.context.push({
                   type: "NumberLiteral",
                   value: node.value
              });
        }

    let methods = [];
    methods["CallValue"] = CallValueTraverse;
    methods["LiteralNumber"] = NumberLiteralTraverse;

    traverse(ast, methods);

    return newAst;
}

module.exports = transform;

//12/6/2022, 00:50, 7
//14/6/2022, 00:40, 8