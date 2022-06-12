const traverse = (ast, methods) => {

    const traverseArr = (current, parent) => {
         for(let child in current){
              traverseNode(child, parent);
         }
    }

    const traverseNode = (node, parent) => {
          
    }

}

const transform = (ast) => {
    let oldAst = ast;
    let newAst = oldAst;

    
}

module.exports = transform;

//12/6/2022, 00:50, 7