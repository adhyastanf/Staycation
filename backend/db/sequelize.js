import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('authentication', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
});

sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

sequelize
  .authenticate()
  .then(() => {
    console.log('Authenticated db.');
  })
  .catch((err) => {
    console.log('Failed to authenticated db: ' + err.message);
  });

export default sequelize;
