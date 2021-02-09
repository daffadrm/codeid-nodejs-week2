// 1. pastikan selalu import dotenv di line pertama
import 'dotenv/config';
//CORS is used to restrict access between web applications
import cors from "cors";
import express from "express";

// import model dan routes
import models, { sequelize } from './models/index.model';
import routes from './routes/index.route';



// 2. let's create express application & store in app
const port = process.env.PORT || 1337
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*  gunakan function middleware untuk store models [regions,department,etc..] 
 dan menyimpan object nya di variable req.context
 agar bisa diakses di semua file js, function middleware akan diexecute
 ketika kita call api dari client (browser | mobile app| postman) */
app.use(async (req, res, next) => {
  req.context = {models};
  next();
});

/*  3. Routes memiliki 2 parameter
 param 1 : path mapping
 param 2 : call function routes di folder routes */
app.use('/regions', routes.regions);


 /* 4. Create Connection pooling to postgresql
 force  : true => all table will be drop, then re-create
 force : false => table already exist akan diskip, jika di deploy di production
           pastikan set force : false
 force : alter => tiap perubahan kolom di model akan di sync dng di table db
         if found difference kolom & datatype, akan di alter, */

const dropDatabaseSync = false;
/* 5. webserver listening port akan di aktifkan jika connection ke db sudah true,
jika connection db failed, webserver express tidak di execute */
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Do Nothing")
  }

  app.listen(process.env.PORT, () =>
    console.log(`Server is listening on port ${process.env.PORT}!`),
  );
});


/* console.log('Hello Fullstack');
console.log(process.env.PASSWORD); */