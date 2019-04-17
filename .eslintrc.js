module.exports = {
  extends: [
    "airbnb-base",
  ],
  // add your custom rules here
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    "max-len": "off",
    quotes: ["error", "double"],
    "object-curly-newline": ["error", { multiline: true, consistent: true }],
    "no-unused-vars": "warn",
    "brace-style": ["error", "stroustrup"],
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-shadow": "off"
  },
};
