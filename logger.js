const fs = require('fs')
DARKGRAY='\033[1;30m'
RED='\033[0;31m'
LIGHTRED='\033[1;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
LIGHTPURPLE='\033[1;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
SET='\033[0m'

class Logger {
  initLog() {
    this.initialized = true
    fs.writeFileSync('latest.log', `--- The log begin at ${new Date().toLocaleString()} ---\n`)
    this.info('The log file has initialized.', true)
    return this
  }
  getLogger(thread, color = 'yellow') {
    if (!this.initialized) {
      this.initLog()
    }
    this.info(`Added logger for: ${thread}`, true)
    let newLogger = new Logger();
    newLogger.thread = thread
    switch (color) {
      case 'yellow': newLogger.color = YELLOW; break;
      case 'darkgray': newLogger.color = DARKGRAY; break;
      case 'red': newLogger.color = RED; break;
      case 'lightred': newLogger.color = LIGHTRED; break;
      case 'green': newLogger.color = GREEN; break;
      case 'lightpurple': newLogger.color = LIGHTPURPLE; break;
      case 'white': newLogger.color = WHITE; break;
      case 'cyan': newLogger.color = CYAN; break;
      case 'purple': newLogger.color = PURPLE; break;
    }
    return newLogger;
  }
  info(message, isLogger = false) {
    let thread = this.thread, color = this.color
    if (isLogger) { thread = 'logger'; color = PURPLE }
    fs.appendFileSync('latest.log', `${color}${thread} ${CYAN}${message}${SET}\n`)
    console.info(`${color}${thread} ${CYAN}${message}${SET}`)
    return this
  }
  warn(message, isLogger = false) {
    let thread = this.thread
    if (isLogger) thread = 'logger'
    fs.appendFileSync('latest.log', `[${thread}/WARN] ${message}\n`)
    console.warn(`[${thread}/WARN] ${message}`)
    return this
  }
  error(message, isLogger = false) {
    let thread = this.thread
    if (isLogger) thread = 'logger'
    fs.appendFileSync('latest.log', `[${thread}/ERROR] ${message}\n`)
    console.error(`[${thread}/ERROR] ${message}`)
    return this
  }
  fatal(message, isLogger = false) {
    let thread = this.thread
    if (isLogger) thread = 'logger'
    fs.appendFileSync('latest.log', `[${thread}/FATAL] ${message}\n`)
    console.error(`[${thread}/FATAL] ${message}`)
    return this
  }
}

module.exports = new Logger()
