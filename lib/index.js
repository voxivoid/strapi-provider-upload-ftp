/**
 * Module dependencies
 */
const FTP = require("ftp");

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
    baseUrl: {
      label: "Base URL",
      type: "text",
    },
    path: {
      label: "Path",
      type: "text"
    },
    secure: {
      label: "Secure",
      type: "checkbox",
      required: false,
    },
  },
  init: (config) => {
    const { host, port, user, password, baseUrl, path, secure } = config;

    const ftp = new FTP();

    ftp.connect({
      host,
      port,
      user,
      password,
      secure
    });

    const connection = new Promise((resolve, reject) => {
      ftp.on("ready", () => {
        resolve();
      });

      ftp.on("error", (err) => {
        reject(err);
      });
    });

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          connection.then(() => {

            let fileName = `${file.hash}${file.ext}`;
            let filePath = `${path}${fileName}`;

            ftp.append(file.buffer, filePath, (err) => {
              ftp.end();

              if (err) {
                return reject(err);
              }

              file.url = `${baseUrl}${fileName}`;
              return resolve();
            });
          });
        });
      },
      delete(file) {
        return new Promise((resolve, reject) => {
          connection.then(() => {
            let filePath = `${path}${file.hash}${file.ext}`;
            ftp.delete(filePath, (err) => {
              ftp.end();
              if (err) {
                return reject(err);
              }

              return resolve();
            });
          });
        });
      },
    };
  },
};
