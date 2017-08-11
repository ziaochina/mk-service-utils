var env = {

}
function translate(cfg, valueObj = getENV(), level = 1) {
  Object.keys(cfg).forEach(key => {
    var value = cfg[key];
    if (value && typeof value == "object" && level > 1) {
      translate(value, valueObj, --level)
    }
    else if (typeof value == "string") {
      var match = value.match(/\${(\w+)}/g);
      match && match.forEach(m => {
        var word = m.match(/\w+/g)[0];
        var evnValue = valueObj[word];
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
