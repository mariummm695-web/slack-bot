const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/lily-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
app.command("/lily-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/lily-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/lily-help - Show this help message
/lily-ping - Check bot latency
/lily-catfact - Get a cat fact
/lily-joke - Get a random joke
/lily-weather_today - Get today's weather forecast
/lily-meaning - Look up the meaning of a word
/lily-activity - Get a random activity idea`

  });
});

app.command("/lily-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});


app.command("/lily-weather_today", async ({ command,ack, respond }) => {
  await ack();
  
  const city = command.text.trim() || "New York"; // You can change this to any city you want
  try {
    const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const currentCondition = response.data.current_condition[0];
    const temp = currentCondition.temp_C;
    const weatherDesc = currentCondition.weatherDesc[0].value;

    await respond({
      text:
     `Today's weather in *${city}* is *${weatherDesc}* at ${temp}°C!`

    });
  } catch (err) {
      console.error("weather error:", err.message);
      await respond({ text: `Failed to fetch weather information for ${city}.` });
  }
});


app.command("/lily-meaning", async ({ command, ack, respond }) => {
  await ack();

  const term = command.text.trim().toLowerCase();
 
  if (!term) {
    await respond({ text: "Please provide a term to look up." });
    return;
  }
 
  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`);
    const firstMeaning = response.data[0]?.meanings?.[0];
    const firstDefinition = firstMeaning?.definitions?.[0]?.definition;
    
    if (firstDefinition) {
        await respond({
          text: `The meaning of *${term}* is:\n${firstDefinition}`
        });
    
    } else {
        await respond({ text: `No definition found for *${term}*.` });

    }
  } catch (err) {
     console.error("meaning error:", err?.message);
     await respond({ text: "Failed to find the meaning of the term." });
  }
});



app.command("/lily-activity", async ({ command, ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/random`);
    const activity = response.data.activity;
    const type = response.data.type; // e.g., "education", "relaxation", "social
    if (activity) {
        await respond({
          text: `*Bored? Here is an idea:* \n\n> "${activity}"`
        });
    
    } else {
        await respond({ text: `No activity found.` });

    }
  } catch (err) {
     console.error("activity api error:", err?.message);
     await respond({ text: "Failed to find an activity." });
  }

  const backups = [
       "Take a 5-minute walk around your workspace.",
       "Drink a glass of water right now.",
       "Do 10 jumping jacks or a quick stretch.",
       "Message a teammate you haven't talked to this week just to say hi.",
       "Write down one thing you're grateful for today.",
       "Organize your desk or workspace for 5 minutes.",
       "Read a book from your to-be read list"
     ];
     const randomBackup = backups[Math.floor(Math.random() * backups.length)];
     await respond({ 
       response_type: "in_channel",
       text: `*Bored? Here is an idea:* \n\n> "${randomBackup}"` 
     });
});
