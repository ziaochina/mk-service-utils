var env = {

}
function translate(cfg, level = 1, valueObj = getENV()) {
  Object.keys(cfg).forEach(key => {
    var value = cfg[key];
    if (value && typeof value == "object" && level > 1) {
      translate(value, level - 1, valueObj)
    }
    else if (typeof value == "string") {
      var match = value.match(/\${([^}]+)}/g);
      match && match.forEach(m => {
        var word = m.substr(2).replace("}", "");
        var evnValue = valueObj[word] || "";
        value = value.replace(new RegExp("\\$\\{" + word + "\\}", "g"), evnValue);
      })
      cfg[key] = value;
    }
  })

  return cfg;
}

function getENV() {
  if (!env._inited) {
    env._inited = true
    Object.assign(env, process.env)
    process.argv.filter(i => i.indexOf("-D") == 0).forEach(k => {
      var key = k.split("=")[0].substr(2).trim()
      var value = k.substr(k.indexOf("=") + 1)
      env[key] = value
    })
  }
  return env
}

module.exports = translate;
