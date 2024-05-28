const Rcon = require('rcon');
const readline = require('readline');

const rconHost = '';
const rconPort = 0;
const rconPassword = '';

const rcon = new Rcon(rconHost, rconPort, rconPassword);
async function connectRcon() {
    try {
        await rcon.connect();
        console.log('Connected to RCON server');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Enter command: '
        });
        rl.prompt();
        rl.on('line', async (input) => {
            if (input.trim().toLowerCase() === 'exit') {
                rl.close();
                rcon.disconnect();
                console.log('Disconnected from RCON server');
                process.exit(0);
            }

            try {
                const response = await rcon.send(input);
                console.log('Server response:', response);
            } catch (error) {
                console.error('Error sending command:', error);
            }

            rl.prompt();
        });

        rl.on('close', () => {
            rcon.disconnect();
            console.log('Disconnected from RCON server');
            process.exit(0);
        });
    } catch (error) {
        console.error('Error connecting to RCON server:', error);
    }
}
connectRcon();