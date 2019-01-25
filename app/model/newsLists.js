'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NewSchema = new Schema({
    articleTitle: { type: String },
    editorContent: { type: String },
    newsAutor: { type: String },
    newsType: { type: Number },
    newsLabel: { type: String },
    publishTime: { type: String },
  });
};
