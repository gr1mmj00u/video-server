import multer from 'koa-multer';
import ffmpeg from 'fluent-ffmpeg';

const UPLOAD_PATH = 'uploads';
const fileSize = 1024 * 1024 * 50; // 50Mb

const fileFilter = (req, file, cb) => {
  // accept image only
  if (!file.originalname.match(/\.(mp4|avi|ogv|webm|flv)$/)) {
    return cb(new Error('Only video files are allowed!'), false);
  }
  return cb(null, true);
};

export const createGifPreview = (input, output) => new Promise((resolve, reject) => {
  ffmpeg(input)
    .toFormat('gif')
    .outputOptions('-vf trim=end=5,reverse')
    .on('error', reject)
    .on('progress', (progress) => {
      console.log(`Processing: ${progress.targetSize} KB converted`);
    })
    .on('end', resolve)
    .save(output);
});

const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter, limits: { fileSize } });

export default upload;
