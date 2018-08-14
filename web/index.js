const express = require('express')
const app = express()
const router = express.Router()
const logger = require('../logger').getLogger('web')
const util = require('../util')
const fs = require('fs')
const unzip = require('unzip')
fs.createReadStream('./views.zip')
  .pipe(unzip.Extract({ path: './' }))

app.set('view engine', 'ejs');

router.get('/', (req, res) => {
  res.render('index', {})
})
router.get('/en', (req, res) => {
  res.render('en/index', {})
})
router.get('/ja', (req, res) => {
  res.render('ja/index', {})
})

app.use((req, res, next) => {
  logger.info(`Access: '${req.path}'`)
  next()
})

app.use('/static', express.static(__dirname + '/../views'))
app.use('/', router)
app.listen(1234)
logger.info('Listening port at 1234')
