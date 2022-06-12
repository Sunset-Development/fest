const tokenize = require("./parser.js").tokenize;
const parse = require("./parser.js").parse;
const transform = require("./transformer");
const generatecode = require("./codegenerator.js");


console.log(tokenize("1 + 2"))