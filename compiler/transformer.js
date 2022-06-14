const traverse = (ast, methods) => {

    const traverseArr = (current, parent) => {
         for(let child = 0; child<current.length; child++){
              traverseNode(current[child], parent);
         }
    }

    const traverseNode = (node, parent) => {

          let func = methods[node.type];
          if (func) {
              func(node, parent);
          }

        console.log(node);
        console.log(" ");
        console.log(" ");
        
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
              default:
                  throw Error(`${node.type}`);
                  break;
          } 
        
    }

    traverseNode(ast, null)
}

const transform = (ast) => {
    let oldAst = ast;
    let newAst = oldAst;

    ast.context = newAst.body;

    const CallValueTraverse = (node, parent) => {
        
    }

    const NumberLiteralTraverse = (node, parent) => {
            
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