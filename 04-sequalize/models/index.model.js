//1. import module sequelize agar bisa create connection ke postgresdb
import Sequelize from 'sequelize';

//2. config database option akan di load dari file .env
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

//3. import all model dan store di variable models
const models = {
  Regions: sequelize.import('./region.model'),
};

//4. create relation OneToMany | ManyToMany
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// 5. export sequalize agar bisa di-call di module lain
export { sequelize };
export default models;
