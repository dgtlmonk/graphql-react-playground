module.exports = {
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['prettier', 'jsx-a11y'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx']},
    ],
  },
}
