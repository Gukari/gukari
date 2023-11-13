module.exports = {
    content: [
      './pages/**/*.{html,js}',
      './components/**/*.{html,js}',
      'node_modules/preline/dist/*.js',
    ],
    plugins: [
        require('preline/plugin')
      ],
    // ...
  }