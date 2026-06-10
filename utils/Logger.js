const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.logFile = process.env.LOG_FILE || './logs/test.log';
    this.levels = { error: 0, warn: 1, info: 2, debug: 3 };
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  writeLog(level, message) {
    if (this.levels[level] > this.levels[this.logLevel]) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message);

    // Console output
    const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[method](formattedMessage);

    // File output
    try {
      fs.appendFileSync(this.logFile, formattedMessage + '\n', 'utf8');
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }

  error(message) {
    this.writeLog('error', message);
  }

  warn(message) {
    this.writeLog('warn', message);
  }

  info(message) {
    this.writeLog('info', message);
  }

  debug(message) {
    this.writeLog('debug', message);
  }

  clearLogs() {
    try {
      fs.writeFileSync(this.logFile, '', 'utf8');
    } catch (err) {
      console.error('Failed to clear logs:', err);
    }
  }
}

module.exports = { Logger };
