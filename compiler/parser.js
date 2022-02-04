// parser.js NEW
// the old parser have been scrapped because it lacks a lot of efficiency
// parser.js have been tested snd it is working
// ill just comment out the test so i can test it again later

// JUST A TEST, NOT OFFICIAL

const tokenize = (expression) => {
    let alphabet = "abcdfghijklmnopqrstuvwxyz".split("");
    let numbers = "0123456789".split("");
    let space = " ";
    
    let currentIndex = 0;
    let tokens = [];
    
    //console.log(expression.length)
    
    while(currentIndex < expression.length)
    {
        let character = expression[currentIndex];
        
        //console.log(character)
        
        if(character == space)
        {
            currentIndex++;
            continue;
        }
        
        if(character == "(")
        {
            tokens.push({
                type: "left parenthesis",
                value: "("
            });
            
            currentIndex++;
            continue;
        }
        
        if(character == ")")
        {
            tokens.push({
                type: "right parenthesis",
                value: ")"
            });
            
            currentIndex++;
            continue;
        }
        
        if(numbers.includes(character))
        {
            let value = '';
            while(numbers.includes(character))
            {
                value += character;
                currentIndex++;
                character = expression[currentIndex];
            }
            tokens.push({
                type: "number",
                value: value
            });
            continue;
        }
        
        if(alphabet.includes(character))
        {
            let value = '';
            while(alphabet.includes(character))
            {
                value += character;
                currentIndex++;
                character = expression[currentIndex];
            }
            tokens.push({
                type: "text",
                value: value
            });
            continue;
        }
        
        throw Error(`whats this: ${character}`);
    }
    
    return tokens;
}

const parse = (tokens) => {
    
    let currentIndex = 0;
        
    const walk = () => {
        let token = tokens[currentIndex];
        
        if(token.type == "number")
        {
            currentIndex++;
            return {
                type: "LiteralNumber",
                value: token.value
            }
        }
        
        if(token.type == "left parenthesis")
        {
            currentIndex++;
            token = tokens[currentIndex];
            let node = {
                type: "CallExpression",
                name: token.type,
                param: []
            }
            
            //currentIndex++;
            token = tokens[currentIndex];
            while(token.type != "right parenthesis")
            {
                node.param.push(walk());
                token = tokens[currentIndex];
//console.log(currentIndex);
//console.log(node.param);
            }
            currentIndex++;
            return node;
        }
        
        throw Error(`${token.type}`);
    }
    
    let ast = {
        type: "program",
        body: []
    }
    console.log(tokens.length);
    while(currentIndex < tokens.length)
    {
        ast.body.push(walk());
        //console.log("in loop");
        //console.log(currentIndex);
    }
    
    return ast;
}

//console.log(parse(tokenize("1 2(1 3)")));
//console.log(tokenize("1 2(1 3)"));

//WORK IN PROGRESS
// 3/2/2022 16:36, 1
// 3/2/2022, 21:58, 2
// 4/2/2022, 4:44, 3
// 4/2/2022, 21:08, 4
