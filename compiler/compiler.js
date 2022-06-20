// The whole FEST V.1 compiler is in seperate file right now 
// But when im done with the whole compiler ill gather it together in a bootstrap file

const tokenize = require("./parser.js").tokenize;
const parse = require("./parser.js").parse;
const transform = require("./transformer");
const generatecode = require("./codegenerator.js");

///////////////////////////////////

const compile = (input_expression) = {

}

//console.log(transform(parse(tokenize("1 * 2 + (2 + 3)"))).body[0].operation);
//console.log(parse(tokenize("1 + 2 - (2 - 4)")))

//12/6/2022, 18:59, 6