'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const NewsListSchema = new Schema({
    articleTitle: { type: String },
    newsAutor: { type: String },
    newsType: { type: Number },
    newsLabel: { type: String },
    publishTime: { type: String },
  });

  const NewsList = mongoose.model('NewsList', NewsListSchema);
  return NewsList;
};
