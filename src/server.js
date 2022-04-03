import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';

const adminJS = new AdminJS({
  database: [],
  rootPath: '/admin',
  resources: [],
});

const app = express();

const  router = AdminJSExpress.buildRouter(adminJS);

app.use(adminJS.options.rootPath, router);
app.listen(5000, () => {
  console.log('AdminJS is under https://localhost:5000/admin');
})