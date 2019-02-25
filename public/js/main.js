let views, app;

window.onload = function(){

  views = new Views();
  app = new App(views);
  app.setup();
  app.showLogin();
};
