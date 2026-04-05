module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true,
        "jquery": true,
      },
    "rules": {
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      },
};