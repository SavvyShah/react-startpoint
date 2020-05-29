module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'transform-imports',
      {
        '@material-ui/icons': {
          transform: '@material-ui/icons/${member}',
          preventFullImport: true
        }
      }
    ]
  ]
}
