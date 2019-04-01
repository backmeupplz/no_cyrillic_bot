const Telegraf = require('telegraf')
require('dotenv').config({ path: `${__dirname}/.env` })

const bot = new Telegraf(process.env.TOKEN)

bot.use(async (ctx, next) => {
  if (ctx.message) {
    const message = ctx.editedMessage || ctx.message
    if (message) {
      const cyrillicPattern = /[\u0400-\u04FF]/
      if (cyrillicPattern.test(message.text)) {
        try {
          await ctx.deleteMessage()
        } catch (err) {
          // Do nothing
        }
      }
    }
  }
  next()
})

bot.startPolling()