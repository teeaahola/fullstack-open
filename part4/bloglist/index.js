const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')

const app = express()
app.use(express.json())

const blogRouter = require('./controllers/blog')
app.use('/api/blogs', blogRouter)

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
