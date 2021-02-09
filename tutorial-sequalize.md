Tutorial orm guide :
1. install nodemon di dev
   > yarn add nodemon -D
2. add script nodemon in package.json

   "scripts": {
    "start": "nodemon --exec babel-node ./04-sequalize/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

3. buat file index.js di folder ./04-sequalize (path folder suka2)

4. buat file nodemon.json dan isi dengna script berikut :
  {
    "watch": ["index.js", "04-sequalize/"],
    "ext": "js, css"
  }

4. install @babel/core @babel/node @babel/preset-env di devDependencies 

    > yarn add @babel/core @babel/node @babel/preset-env -D

5. create file .babelrc, isi dengan sintak berikut : 
    {
        "presets": [
        "@babel/preset-env"
        ]
    }

alasan menggunakan .babelrc :
Babel transpiles your code to vanilla JavaScript.

6. install dotenv jika kita ingin set value config atau environment variable tanpa show di source code
    > yarn add dotenv 

7. install sequalize-auto untuk reverse enginnering schema db
> yarn add sequelize-auto

8. lalu execute script berikut : 

 > "reverse" : "sequelize-auto -o ./out -d batch7 -h localhost -u postgres -p 5432 -x admin -e postgres"

 
 9. create folder models & controllers

