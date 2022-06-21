// SHELL DOES NOT WORK YET AND IT IS IN DEVELOPMENT

const { exec } = require("child_process");
const process = require("process");
let pd = false;

while(true){
    // Prompting for user input
    if(!pd){
        process.stdout.write("fest-shell> ");
        pd = true;
    }
    
    // Getting data from user input
    process.stdin.on("data", data => {
        if(!data){
            console.log("Error: invalid inputn/Exit code: n0006");
            return 6;
        }
        
        let dts = data.toString();

        console.log(dts, "  ", data);

        pd = true;

        switch(process.platform){
            case "win32":
                exec('cls', (err, stdout, stderr) => {if(err){ console.log("Error: unable to activate required commandsn/Exit code: n0005"); process.exit(1)}});
                break;
            case "darwin" || "linux":
                exec('clear', (err, stdout, stderr) => {if(err){ console.log("Error: unable to activate required commandsn/Exit code: n0005"); process.exit(1);}});
                break;
            default:
                console.log("Error: unsupported platformn/Exit code: n0007");
                process.exit(1);
                break;
        }
    });
}

//21/6/2022, 16:34, 11