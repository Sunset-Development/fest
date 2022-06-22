// The whole FEST V.1 compiler is in seperate file right now 
// But when im done with the whole compiler ill gather it together in a bootstrap file
// Currently it doesnt work yet

const { tokenize, parse } = require("./parser.js");
const transform = require("./transformer");

///////////////////////////////////

const compile = (input_expression) => {
    // The compiler will only generate an Abstract Syntax Tree for now

    let tokens = tokenize(input_expression);
    let ast = parse(tokens);
    let newast = transform(ast);

    if(newast[2] == true){
        return newast[1];
    }

    return newast
}

console.log(compile("1 + "));
//console.log(parse(tokenize("1 * 2 - (2 + 3)")))

module.exports = compile;

//12/6/2022, 18:59, 6