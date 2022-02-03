// parser.js
// give the following code: var example = 42
// make an AST out of it

// Error codes
const ERR_NO_PARSE = "n0001";
const ERR_UNEXPECTED_TOKEN = "n0002";
const ERR_EXPECTED_NAME = "n0003";

const isFloat = (n) =>
{
    return Number(n) === n && n % 1 !== 0; 
}

const isNumeric = num => { return !isNaN(num) }

//for parsing
const getTokenType = (token) =>
{
    if(isNumeric(token))
    {
        let number = parseFloat(token);
        
        if(isFloat(number))
        {
            return 0;
        }
        
        return 1;
    }
    
    if(token == "true" || token == "false")
    {
        return 2;
    }
    
    switch(token)
    {
        case "var":
            return 3;
            break;
        case "=":
            return 4;
            break;
        case "con":
            return 5;
            break;
        case "func":
            return 6;
            break;
        default:
            return 7;
            break;
            
    }
}

// fix parsing problems and make parsing a little bit easier
const getParseable = (line) => {
    
}

const parse = (line, index) => {
    // there's a problem, if we have this: var e=0
    // it'll split the line into ["var", "e=0"]
    // so getParseable(line) will generate a new string or array and avoid this
    let args = line.split(" ");
    let token = [];
    let result = [];
    
    // throw an error if we can't read the tokensa
    if(args.length == 1)
    {
        console.log(`can not read line ${index}, parsing stopped\nexit code: ${ERR_NO_PARSE}`);
        return ERR_NO_PARSE;
    }
    
    // get the tokens
    for(let i in args)
    {
        token[i] = getTokenType(args[i]);
    }
    
    // error handling
    switch(token[0])
    {
        case 3:
            result[1] = token[0];
            break;
        case 7:
            if(token){}
            break;
    }
}

parse("var ", 4)

//WORK IN PROGRESS
// 3/2/2022 16:36, 1
