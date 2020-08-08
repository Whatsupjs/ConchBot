const Discord = require('discord.js');
const bot = new Discord.Client();  //dependencies for client (aka bot)
require('dotenv').config();

const token = process.env.TOKEN;   //token loaded via env variable

const prefix = '!conch';           //prefix for all bot commands

bot.once('ready', () => {
    console.log('Bot is ALIVE'); 
});

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; // if it's not followed by prefix, do nothing

    const args = message.content.slice(prefix.length+1).split(/ +/); // exclude prefix from list of arguments 
    const commands = args[0].toLowerCase();

    if(commands == 'sitout'){
        args.shift();
        
        var counter = 0;
        var result = 0;

        //count # of args after sitout
        for(var i = 0; i < args.length; i++){
            counter++;
        }
        
        //randomly select from counted args
        if(counter > 0){;
            result = Math.floor(Math.random() * Math.floor(counter));
        }
        message.channel.send(args[result] + ' is voted off the island');

    } else if (commands.length > 0) {
        //array of responses that conch can give with weighting of probability. 
        //the weights are arbituary numbers and does not have to equal to 1 (just made it to decimals for the hell of it)
        const r_pool = [
            {text: "yes", weight: 0.3}, {text: "try asking again", weight: 0.2},
            {text: "maybe some day", weight: 0.1}, {text: "nothing", weight: 0.1},
            {text: "no", weight: 0.1}, {text: "neither", weight: 0.1}, {text: "I don't think so", weight: 0.1}
        ];

        var sum_weight = 0; 
        var response; 

        // calculate sum of all weights of responses for limit of random range
        for(var i = 0; i < r_pool.length; i++) {
            sum_weight += r_pool[i].weight;
        }

        var rand = Math.random() * sum_weight;

        for(var i = 0; i < r_pool.length; i++) {
            var result = r_pool[i];
            if(rand < result.weight){
                response = result.text;
                break;
            }
            rand -= result.weight;            
        }

        message.channel.send(response);

    } else {
        var help = "Please ask a question or say 'sitout' and list the members \n" + "*i.e. !conch sitout x y z*"
        
        message.channel.send(help);
    }
    
});

bot.login(token);