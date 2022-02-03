// parser.js NEW
// the old parser have been scrapped because it lacks a lot of efficiency

// JUST A TEST, NOT OFFICIAL

const tokenize = (expression) => {
    let alphabet = "abcdfghijklmnopqrstuvwxyz".split("");
    let numbers = "0123456789".split("");
    let space = "\s";
    
    let currentIndex = 0;
    let tokens = [];
    
    while(expression.length > currentIndex)
    {
        let character = expression[currentIndex];
        
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
                value += chararcter;
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
                value += chararcter;
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
}

const parse = (tokens) => {
    
    let currentIndex = 0;
        
    const walk = (startpoint) => {
        let token = tokens[startpoint];
        
        if(token.type == "number")
        {
            startpoint++;
            return {
                type: "LiteralNumber",
                value: token.value
            }
        }
        
        if(token.type == "left parenthesis")
        {
            startpoint++;
            token = tokens[startpoint];
            let node = {
                type: "CallExpression",
                name: token.type,
                param: []
            }
            
            startpoint++;
            token = tokens[startpoint];
            while(token.type != "right parenthesis")
            {
                node.param.push(walk(startpoint));
                token = tokens[startpoint]
            }
            startpoint++;
            return node;
        }
        
        throw Error(`${token.type}`);
    }
    
    let ast = {
        type: "program",
        body: []
    }
    
    while(tokens.length > currentIndex)
    {
        ast.body.push(walk(currentIndex));
    }
}

//WORK IN PROGRESS
// 3/2/2022 16:36, 1
// 3/2/2022, 21:58, 2
// 4/2/2022, 4:44, 3
