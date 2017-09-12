function translate(cfg, level = 1) {
  for (var key in cfg) {
    var value = cfg[key];
    if (!value || !cfg.hasOwnProperty(key)) continue;
    if (typeof value == "object" && level > 1) {
      level--;
      translate(value)
    }
    else if (typeof value == "string") {
      var match = value.match(/\${(\w+)}/g);
      match && match.forEach(m => {
        var word = m.match(/\w+/g)[0];
        var evnValue = process.env[word];
        value = value.replace(new RegExp("\\$\\{" + word + "\\}", "g"), evnValue);
      })
      cfg[key] = value;
    }
  }
  return cfg;
}

module.exports = translate;
