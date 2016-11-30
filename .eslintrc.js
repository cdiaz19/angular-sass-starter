module.exports = {
    "env": {
        "browser": true,
        "es6": false
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "script"
    },
    "globals": {
      "angular": false,
      "FB": false,
      "ga": false
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
