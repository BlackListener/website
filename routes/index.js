const express = require('express')
const router = express.Router()
const fs = require('fs')

function exists(path) {
  try {
    return fs.accessSync("../views/" + path)
  } catch (e) {
    return false;
  }
}

/* GET home page. */

router.get('/', (req, res) => {
  res.redirect('/en')
})

router.get('/:lang', (req, res) => {
  res.render(`${req.params.lang}/index`, {})
})

router.get('/:lang/:page', (req, res) => {
  //console.log(exists(`${req.params.lang}/${req.params.page}`))
  //if (exists(`${req.params.lang}/${req.params.page}`)) {
    res.render(`${req.params.lang}/${req.params.page}`, {})
  //} else {
    //res.render(`404`)
  //}
})

module.exports = router
