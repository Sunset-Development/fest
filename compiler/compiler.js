// The whole FEST V.1 compiler is in seperate file right now 
// But when im done with the whole compiler ill gather it together in a bootstrap file
// Currently it doesnt work yet

const { tokenize, parse } = require("./parser.js");
const transform = require("./transformer");
const generatecode = require("./codegenerator.js");

///////////////////////////////////

const compile = (input_expression) => {
    // The compiler will only generate an Abstract Syntax Tree for now

    return transform(parse(tokenize(input_expression)))
}

//console.log(transform(parse(tokenize("1 * 2 + (2 + 3)"))).body[0].operation);
//console.log(parse(tokenize("1 * 2 - (2 + 3)")))

module.exports = compile;

//12/6/2022, 18:59, 6