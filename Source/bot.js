// check for required files
const Discord = require('../Libs/node_modules/discord.js');
const auth = require('./auth.json');
// Create the client
const client = new Discord.Client();
// Makes sure bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ game: { name: '!help' } });
});

// Commands for bot, prefix is '!'
client.on('message', msg => {
  if (msg.content.substring(0,1) == '!') {
    let args = msg.content.substring(1).split(' ');
    let cmd = args[0];
    args = args.splice(1);
    // List of commands
    switch (cmd) {
      // Cleans up n numbers of messages
      case 'clean':
      // Checks if user has permission to manage messages
      // Fetches n numbers of messages and deletes them
      if (msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.channel.fetchMessages({ limit: args }).then(function(list) {
          msg.channel.bulkDelete(list);
        }, function(err) {msg.channel.send(`ERROR: ERROR CLEANING CHANNEL`)})
      }
      msg.channel.send(`${args} message(s) were cleaned!`)
      break;
      // Clears all messages that are newer than 14 days
      case 'clear':
      // Checks if user has permission to manage messages
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
          msg.channel.fetchMessages().then(function(list) {
            msg.channel.bulkDelete(list);
          }, function(err) {msg.channel.send(`ERROR: ERROR CLEARING CHANNEL.`)})
        }
        msg.channel.send(`All messages newer than 14 days were cleared!`);
        break;

      // Displays an example of how to use commands
      case 'command':
        msg.channel.send(`
\`\`\`css
Example of commands:
!help
!clean 10
\`\`\`
          `);
        break;

      // Displays greet message
      case 'greet':
        msg.reply(`Hi, this is ${client.user.tag}!`);
        break;

      // Returns the help page
      case 'help':
        msg.channel.send(`
\`\`\`css
[MapleBot help page]
!clean   [number]   Cleans up n numbers of messages
!clear              Clear all messages that are newer than 14 days
!command            Displays examples of commands
!greet              Displays greet message
!help               Display this help page
!ping               Returns the ping
\`\`\`
`);
        break;

      // Returns the ping
      case 'ping':
        let start = msg.createdTimestamp;
        msg.channel.send('MapleBot responded').then((msg) => {
          let diff = Math.abs(msg.createdTimestamp - start);
          msg.edit(`MapleBot responded in *${diff/1000} seconds*`);
        }).catch((error) => console.log(error));
        break;

      // Default does nothing if command is incorrect
      default:
        break;
    }
  }
});


// Bot login
client.login(auth.token);
