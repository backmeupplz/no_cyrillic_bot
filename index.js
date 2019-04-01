const Telegraf = require('telegraf')
require('dotenv').config({ path: `${__dirname}/.env` })

const bot = new Telegraf(process.env.TOKEN)

bot.use(async (ctx, next) => {
  try {
    const message = ctx.message
    const editedMessage = ctx.editedMessage
    const cyrillicPattern = /[\u0400-\u04FF]/
    if ((message && cyrillicPattern.test(message.text)) || (editedMessage && cyrillicPattern.test(editedMessage.text))) {
        await ctx.deleteMessage()
    }
  } catch (err) {
    // Do nothing
  }
  next()
})

bot.startPolling()
