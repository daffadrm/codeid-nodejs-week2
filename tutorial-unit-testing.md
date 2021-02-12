step by step unit testing :
1. install modules 

> yarn add jest chai chai-http babel-jest @babel/plugin-transform-runtime -D

2. buat file baru jest.config.js, isi dengan script berikut ;

  const jestConfig = {
      verbose: true,
      testURL: "http://localhost:1338/",
      'transform': {
        '^.+\\.jsx?$': 'babel-jest',
      },
      testMatch: ['**/test/*.js?(x)'],
    }
    
    module.exports = jestConfig

3. tambahakan script berikut di .babelrc

    "plugins": [
        [
          "@babel/plugin-transform-runtime",
          {
            "regenerator": true
          }
        ]
      ]

4. buat script di package.json
   "test": "jest"

   masih di package.json tambahkan :
  
   "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }   

5. buat folder test di dalam folder 04-sequelize, buat file RegionTest.js
6. Run via debug