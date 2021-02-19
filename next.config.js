const withPWA = require("next-pwa");

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     disable: true,
//     register: false,
//   },
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: "empty",
//       };
//     }

//     return config;
//   },
// });
