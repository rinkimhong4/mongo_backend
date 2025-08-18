// const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

// const categorySchema = new mongoose.Schema({
//   category_name: { type: String, required: true, maxlength: 100 },
//   description: { type: String, required: true, maxlength: 100 },
// });

// // Auto-increment id
// // categorySchema.plugin(AutoIncrement, { inc_field: "id" });

// const Category = mongoose.model("categories", categorySchema);
// module.exports = Category;
// category.js
const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
});

categorySchema.plugin(AutoIncrement, { inc_field: "category_id" });

const Category = mongoose.model("Category", categorySchema); // <-- Name must match ref
module.exports = Category;
