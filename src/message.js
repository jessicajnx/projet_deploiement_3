function formatGreeting(name) {
  const safeName = (name || "inconnu").trim();
  return `Bonjour ${safeName}`;
}

module.exports = {
  formatGreeting
};
