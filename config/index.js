let config = {}
if (process.env["NODE_ENV"] === 'production') {
    config = require("./prod.js");
} else if (process.env["NODE_ENV"] === 'stable') {
    config = require("./stable.js");
} else {
    config = require("./test.js");
}

for (let e in process.env) {
    config[e] = process.env[e];
}
module.exports = config;

// if (process.env["NODE_ENV"] === 'test')