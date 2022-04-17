import { Category } from "../models/Category.js";
exports.create = (req, res) => {
  setTimeout(() => {
    res.json({
      successMessage: `${req.body.category} was created`,
    });
  }, 5000);
};
