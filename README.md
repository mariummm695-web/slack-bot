⚡ Lily — Your Automated Slack Assistant

Lily is a Slack bot designed to make everyday interactions more convenient and engaging through a collection of useful commands, from checking the weather and looking up word definitions to generating random activities and sharing fun facts.

<img width="688" height="451" alt="Screenshot 2026-11-18 125317" src="https://github.com/user-attachments/assets/9cf0a95d-9d17-446d-960b-32556cf562b2" />

💬 Try Lily

Lily operates directly within HackClub's Slack through custom slash commands and interactive responses.

To try Lily, configure the Slack application and run the bot in the Slack workspace.

✨ Features

Lily currently supports seven custom slash commands:

Command                                  Description

/lily-help                               Displays a list of all available commands and their functions.

/lily-ping                               Checks whether Lily is responsive and measures its response latency.

/lily-catfact                            Fetches and shares a random cat fact.

/lily-joke                               Retrieves a random joke to brighten up your day.

/lily-weather_today                      Provides the current weather conditions and temperature for a specified city.

/lily-meaning                            Looks up the definition of a word.

/lily-activity                           Generates a random activity suggestion.

Real-time API integration: Retrieves information from external APIs instead of relying entirely on predefined responses.
Flexible weather lookup: Accepts a city as input, allowing users to check weather conditions in different locations.
Latency monitoring: Measures the time taken for Lily to acknowledge a ping command.
Error handling: Provides alternative responses when external API requests fail.

Prerequisites
Before running Lily, you'll need:

Node.js
A Slack workspace where you can install an app.
A Slack application configured with Socket Mode enabled.
A Slack bot token and an app-level token.

1. Clone the repository

git clone https://github.com/mariummm695-web/slack-bot.git

Navigate into the project directory:

cd slack-bot

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the root directory:

SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token

Replace the placeholder values with your actual Slack credentials.

Important: Keep your .env file private. Never upload authentication tokens to GitHub.

4. Configure your Slack application

In your Slack application settings:

Enable Socket Mode.

Generate an app-level token with the required connection permission.

Add the necessary bot permissions.

Configure the seven slash commands listed above.

Install the application into your Slack workspace.

5. Start Lily

Run the following command:

node index.js

If everything is configured correctly, the terminal will display:

bot is running!

Lily is now ready to respond to commands in your Slack workspace.

⚙️ How It Works

Lily uses the Slack Bolt framework to receive and process slash commands.

When a user enters a command, Slack Bolt routes it to the corresponding command handler in index.js. The bot acknowledges incoming commands and executes the relevant functionality.

For commands that require external information, Axios sends an HTTP request to the appropriate API. The returned data is then processed and formatted into a response that Lily sends back to Slack.

For example, when a user enters /lily-weather_today Karachi, Lily retrieves weather information from the weather API, extracts the current temperature and weather conditions, and returns the result directly in Slack.

🌟Built with JavaScript and a little bit of curiosity.
