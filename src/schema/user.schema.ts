// import * as mongoose from "mongoose";

// // _id is added automatically

// enum UserType {
//   Admin = "admin",
//   User = "user",
// }

// enum InterestType {
//   FoodAndDrink = "Food And Drink",
//   Technology = "Technology",
// }

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//       message: "Invalid email format",
//     },
//   },
//   password: { type: String, required: true },
//   salt: { type: String, required: true },

//   verificationToken: { type: String },
//   isVerified: { type: Boolean, default: false },

//   name: { type: String, default: "" },
//   interest: {
//     type: String,
//     enum: Object.values(InterestType),
//     default: InterestType.Technology,
//   },
//   type: { type: String, enum: Object.values(UserType), default: UserType.User },

//   createdAt: { type: Date, default: Date.now },

//   board: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;
