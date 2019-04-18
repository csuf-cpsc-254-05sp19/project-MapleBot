// Check if required files exists
var Discord = require('../Libs/node_modules/discord.io');
var logger = require('../Libs/node_modules/winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	logger.info('Connected');
	logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
	// Our bot needs to know if it will execute a command
	// It will listen for messages that will start with `!`
	if (message.substring(0, 1) == '!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];
		args = args.splice(1);
		// List of commands
		switch(cmd) {
			// !test
			case 'test':
				bot.sendMessage({
					to: channelID,
					message: 'This is a test!'
				});
			break;
			// !greet
			case 'greet':
				bot.sendMessage({
					to: channelID,
					message: 'Hello, this is ' + bot.username + ' bot!'
				});
			break;
			// !help
			case 'help':
				bot.sendMessage({
					to: channelID,
					message: '```\nMapleBot help page\n```'
				});
			break;
			// Just add any case commands if you want to..
		}
	}
});