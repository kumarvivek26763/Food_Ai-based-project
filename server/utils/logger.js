function log(...args) {
  // Keep it simple and dependency-free; swap with winston later if needed.
  console.log(...args);
}

function error(...args) {
  console.error(...args);
}

module.exports = { log, error };

