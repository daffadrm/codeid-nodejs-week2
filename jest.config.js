const jestConfig = {
    verbose: true,
    testURL: "http://localhost:1338/",
    'transform': {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/test/*.js?(x)'],
  }
  
  module.exports = jestConfig