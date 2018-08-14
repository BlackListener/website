const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/en')
})

router.get('/en', (req, res) => {
  res.render('en/index', {})
})

router.get('/ja', (req, res) => {
  res.render('ja/index', {})
})

module.exports = router
