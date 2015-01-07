var app = require('./app/app.js');
var AppRouter = require('./app/routers/AppRouter.js');

app.appRouter = new AppRouter();
app.start();
