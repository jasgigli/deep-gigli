// lib/utils/logger.js
// Example using Pino for logging (install pino: npm install pino)
import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info', // Default log level: info
    formatters: {
        level: label => ({ level: label.toUpperCase() }), // Uppercase log levels
    },
    timestamp: pino.stdTimeFunctions.isoTime, // ISO timestamp format
});

export default logger;