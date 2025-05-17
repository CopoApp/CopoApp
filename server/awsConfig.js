// Multer parses incoming file information
const multer = require("multer");
const multerS3 = require("multer-s3");
// AWS allows for uploads to S3 bucket
const { S3Client } = require("@aws-sdk/client-s3");

// Main interface for making requests to S3
const s3 = new S3Client({
  // Region of the S3 bucket
  region: process.env.AWS_REGION,
  // Credentials to authenticate requests to AWS S3 bucket
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer S3 config
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { post_id: req.params.id });
    },
    key: (req, file, cb) => {
      const postRoutes = { patch: "/api/posts/:id", post: "/api/posts"};
      const userRoutes = "/api/users/:id";
      const commentRoutes = { postInteractions:  '/api/posts/:id/comments', commentInteractions: '/api/comments/:id' }
      const filename = Date.now().toString() + "-" + file.originalname;
      // If the origin of the request is from a the /api/posts endpoint the image gets added to the report-pictures folder
      if (req.route.path === postRoutes.patch || req.route.path === postRoutes.post ) {
        cb(null, `report-pictures/${filename}`);
      }
      if (req.route.path === userRoutes) {
        cb(null, `user-profile-pictures/${filename}`);
      }
      if (req.route.path === commentRoutes.postInteractions || req.route.path === commentRoutes.commentInteractions) {
        cb(null, `comment-images/${filename}`);
      }
    },
  }),
  // FIlters files of only image type
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
  },
});

module.exports = { upload, s3 };
