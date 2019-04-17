/**
 * Module dependencies
 */
const PromiseFtp = require("promise-ftp");

module.exports = {
  provider: "FTP",
  name: "FTP",
  auth: {
    host: {
      label: "Host",
      type: "text",
    },
    user: {
      label: "User",
      type: "text",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },
  init: (config) => {
    const { host, user, password } = config;

    const ftp = new PromiseFtp().connect({
      host,
      user,
      password,
    });

    return {
      upload(file) {
        // upload
      },
      delete(file) {
        // delete
      },
    };
  },
};
