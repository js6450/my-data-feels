// Initializes the `feelings` service on path `/feelings`
const createService = require('feathers-mongoose');
const createModel = require('../../models/feelings.model');
const hooks = require('./feelings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/feelings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('feelings');

  service.hooks(hooks);
};
