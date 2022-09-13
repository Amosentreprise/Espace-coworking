const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  Username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Telephone: { type: Number, required: true },
  Password: { type: String, required: true },
  Date:{type:Date, default:Date.now}
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)
