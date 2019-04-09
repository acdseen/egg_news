'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserInfoSchema = new Schema({
    // _id: false,
    staff: { type: Schema.Types.ObjectId, ref: 'User' },
  });
  const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
  return UserInfo;
};
