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
    destPath: {
      label: "Destination Path",
      type: "text",
      required: "false",
    },
    baseUrl: {
      label: "Base URL",
      type: "text",
    },
    // secure: {
    //   label: "Secure",
    //   type: "checkbox",
    //   required: false,
    // },
  },
  init: (config) => {
    const { host, port, user, password, baseUrl, destPath } = config;

    const ftp = new FTP();

    ftp.connect({
      host,
      port,
      user,
      password,
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
            ftp.list((err, list) => {
              if (err) {
                return reject(err);
              }

              const originalFileName = file.name.split(".")[0]; // removing the extension from the name

              let fileName = `${originalFileName}${file.ext}`;
              let c = 0;

              const compareNames = file => file.name === fileName;

              while (list.some(compareNames)) {
                c += 1;
                fileName = `${originalFileName}(${c})${file.ext}`;
              }

              ftp.append(file.buffer, destPath ? destPath + fileName : fileName, (err) => {
                if (err) {
                  return reject(err);
                }

                file.public_id = fileName;
                file.url = baseUrl + fileName;
                ftp.end();

                return resolve();
              });
            });
          });
        });
      },
      delete(file) {
        return new Promise((resolve, reject) => {
          connection.then(() => {
            ftp.delete(destPath ? `${destPath}${file.public_id}` : file.public_id, (err) => {
              if (err) {
                return reject(err);
              }

              ftp.end();

              return resolve();
            });
          });
        });
      },
    };
  },
};
