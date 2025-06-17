const { validationResult, body } = require("express-validator");
const xss = require("xss");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const sanitizeInput = (value) => {
  if (typeof value === "string") {
    return xss(value, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
    });
  }
  return value;
};

const authValidation = {
  register: [
    body("username")
      .trim()
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage("Username has to be between 2 and 15 characters.")
      .matches("/^[a-zA-Z0-9]+$/")
      .withMessage("Username can only include a-z, A-Z and 0-9.")
      .customSanitizer(sanitizeInput),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password has to be at least 8 characters.")
      .matches("/^(?=.d)(?=.[a-z])(?=.[A-Z])(?=.[?!.$%&])[A-Za-zd?!.$%&]{8,}$/")
      .withMessage(
        "Password has to contain one special character, one number, one uppercase and one lowercase letter."
      ),
    handleValidationErrors,
  ],
  login: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .customSanitizer(sanitizeInput),
    body("password").notEmpty().withMessage("Password is required."),
    handleValidationErrors,
  ],
};

const gameValidation = [
  body("name")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name has to be between 3 and 20 characters.")
    .matches("/^[a-zA-Z0-9]+$/")
    .withMessage("Only regular letters and digits are allowed.")
    .customSanitizer(sanitizeInput),
  body("description")
    .isLength({ max: 100 })
    .withMessage("Description can only be 100 characters.")
    .customSanitizer(sanitizeInput),
  body("path").trim().customSanitizer(sanitizeInput),
];

module.exports = {
  sanitizeInput,
  authValidation,
  gameValidation,
};
