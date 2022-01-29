const zaq = require("zaq")
const {
    WebhookClient
} = require("discord.js");
const webhookClient = new WebhookClient({
    id: process.env.LOG_WEBHOOK_ID,
    token: process.env.LOG_WEBHOOK_TOKEN
});
const beautify = require("js-beautify").js;
const moment = require("moment"); //nodejs moment

const LabAlien = zaq.as("LabAlien")

exports.log = (content, type = "log") => {
    const timestamp = `${moment().format("YYYY/MM/DD HH:mm:ss")}`
    switch (type) {
        case "log":
            return LabAlien.info(content);
            break;
        case "warn":
            LabAlien.warn(beautify(content, {
                indent_size: 2,
                space_in_empty_paren: true
            }), {
                executionTime: timestamp,
                sessionId: process.pid
            });

            return webhook.send("Warn:\n" + content)
            break;
        case "error":
            return LabAlien.err(content)
            break;
        case "debug":
            return LabAlien.debug(beautify(content, {
                indent_size: 2,
                space_in_empty_paren: true
            }));
            break;
        case "ready":
            return LabAlien.ok(beautify(content, {
                indent_size: 2,
                space_in_empty_paren: true
            }));
            break;
        case "user":
            return console.log(`${timestamp} ${content}`)
            break;
        case "time":
            return LabAlien.time(beautify(content, {
                indent_size: 2,
                space_in_empty_paren: true
            }), {
                ms: client.ping,
                executionTime: timestamp,
                sessionId: process.pid
            });
            break;
        default:
            throw new TypeError("Logger type must be either warn, debug, log, ready, time, divider, user or error.");
    }
};

exports.error = (args) => this.log(args, "error")

exports.warn = (args) => this.log(args, "warn")

exports.debug = (args) => this.log(args, "debug")

exports.cmd = (args) => this.log(args, "cmd")