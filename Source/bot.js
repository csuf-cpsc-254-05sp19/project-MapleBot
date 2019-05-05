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
      // Clears all messages that are newer than 14 days
      case 'clear':
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
          msg.channel.fetchMessages().then(function(list) {
            msg.channel.bulkDelete(list);
          }, function(err) {msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})
        }
        msg.channel.send('All messages newer than 14 days were cleared!');
        break;

      // Displays an example of how to use commands
      case 'command':
        msg.channel.send(`
\`\`\`css
Example of command:
[prefix][command]
!help
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
!clear              Clear all messages that are newer than 14 days
!command            Displays an example of how to use commands
!greet              Displays greet message
!help               Display this help page
!ping               Returns the ping
!rank    [name]     Displays character ranking
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

      // Displays character rank
      case 'rank':
        msg.channel.send('This should display ranking of character.');
        break;

      // Default does nothing if command is incorrect
      default:
        break;
    }
  }
});


// Bot login
client.login(auth.token);
