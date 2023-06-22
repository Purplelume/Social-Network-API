const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  if (this.friends) {
    return this.friends.length;
  }
})

const User = model('user', userSchema);

module.exports = User;
