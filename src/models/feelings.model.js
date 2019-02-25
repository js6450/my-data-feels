// feelings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const feelings = new Schema({
    width:{
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    mouth: {
      type: Number,
      required: true
    },
    eyebrow: {
      type: Number,
      required: true
    },
    eyebrowIntensity:{
      type: Number,
      required: true
    },
    eye: {
      type: Number,
      required: true
    },
    pixels: {
      type:[Object],
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('feelings', feelings);
};
