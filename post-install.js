const { exec } = require('child_process');

let command;
console.log("MyTEST", VERCEL_ENV);
console.log("MyTEST2", ENV);
console.log("MyTEST", process.env.VERCEL_ENV);
console.log("MyTEST2", process.env.ENV);

if (process.env.ENV === 'production') {
    command = exec('ng build --aot --configuration=production');
} else if (process.env.ENV === 'stage') {
    command = exec('ng build --aot --configuration=stage');
}

if (command != undefined) {
    command.stdout.on('data', (data) => {
        console.log(data);
    });

    command.stderr.on('data', (data) => {
        console.error(data);
    });

    command.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
} else {
    console.error('process.env.ENV: ' + process.env.ENV);
}