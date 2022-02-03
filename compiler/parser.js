// parser.js NEW
// the old parser bave been scrapped because it lacks a lot of efficiency

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
        
        throw Error(`whats dis: ${character}`);
    }
}

const parse = (tokens) => {
    
}

//WORK IN PROGRESS
// 3/2/2022 16:36, 1
// 3/2/2022 21:58, 2
