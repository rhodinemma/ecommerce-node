const multer = require("multer");
const ApiError = require("../utils/apiError");

exports.uploadSingleImage = (fieldName) => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError(`Only Images allowed`, 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  upload.single(fieldName);
};
