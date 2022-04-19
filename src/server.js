import "dotenv/config";

import './database';

import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import express from 'express';

import UsersResource from './resources/UsersResource';
import ProjectsResource from './resources/ProjectsResource';
import TasksResource from './resources/TasksResource';

import locale from './locales';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();
const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  dashboard: {
    component: AdminJS.bundle('./components/Dashboard/index'),
  },
  resources: [UsersResource, ProjectsResource, TasksResource],
  ...locale,
});


const router = AdminJSExpress.buildRouter(adminJS);

app.use(adminJS.options.rootPath, router);
app.listen(5000, () => {
  console.log('AdminJS is under https://localhost:5000/admin');
})