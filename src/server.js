import "dotenv/config";

import './database';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import express from 'express';

import UsersResource from './resources/UserResource';

AdminJS.registerAdapter(AdminJSSequelize);

const adminJS = new AdminJS({
  database: [],
  rootPath: '/admin',
  resources: [UsersResource],
});

const app = express();

const  router = AdminJSExpress.buildRouter(adminJS);

app.use(adminJS.options.rootPath, router);
app.listen(5000, () => {
  console.log('AdminJS is under https://localhost:5000/admin');
})