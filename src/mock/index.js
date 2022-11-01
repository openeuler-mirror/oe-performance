
if (process.env.NODE_ENV !== 'production') {
  const Mock = require('mock2js')
  require('./services/auth')

  Mock.setup({
    timeout: 800 // setter delay time
  });
}
