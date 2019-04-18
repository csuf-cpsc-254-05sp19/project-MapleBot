# project-MapleBot
Need to set up a Discord account if you don't have one at discordapp.org.
Head to discordapp.com/developers/applications/me to set up the bot.
Click on "New Application" set up the bot, copy down your client id.
Click on "Bot" tab and click on "Add Bot", copy down your token.
Use this link to send the bot to your Discord server https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8 but replace "CLIENTID" with the client id you copied down earlier.
In the auth.json file, replace "Your Bot Token" with the token you copied down earlier and put it in " ".

Download Node.js from nodejs.org

Go to your source folder in your terminal and run "npm install discord.io winston –save" to install dependencies.
Run "npm install https://github.com/woor/discord.io/tarball/gateway_v6" for additional dependencies.

Go to your bot.js folder location and run "node bot.js" to run the bot server. Use Ctrl-C to stop the server.