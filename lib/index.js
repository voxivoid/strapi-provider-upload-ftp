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
    port: {
      label: "Port",
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
    secure: {
      label: "Secure",
      type: "checkbox",
      required: false,
    },
  },
  init: (config) => {
    const { host, port, user, password } = config;

    const ftp = new PromiseFtp().connect({
      host,
      port,
      user,
      password,
    });

    return {
      async upload(file) {
        await ftp;

        await ftp.put(file.buffer, `${file.hash}${file.ext}`);
        ftp.end();
      },
      delete(file) {
        // delete
      },
    };
  },
};
