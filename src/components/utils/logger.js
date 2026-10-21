// src/utils/logger.js

function writeLog(level, context, message, details = null) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    context,
    message:
      message instanceof Error
        ? message.message
        : String(message),
    details:
      details instanceof Error
        ? details.message
        : details,
  };

  const output = JSON.stringify(entry);

  if (level === "ERROR") {
    console.error(output);
  } else if (level === "WARN") {
    console.warn(output);
  } else {
    console.info(output);
  }
}

export function logInfo(context, message, details = null) {
  writeLog("INFO", context, message, details);
}

export function logWarn(context, message, details = null) {
  writeLog("WARN", context, message, details);
}

export function logError(context, error, details = null) {
  writeLog("ERROR", context, error, details);
}