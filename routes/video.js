import path from 'path';
import upload, { createGifPreview } from '../lib/video';

export default (router) => {
  router
    .get('root', '/', (ctx) => {
      ctx.body = `
        <form action="video" method="post" name="form" enctype="multipart/form-data">
          <input type="file" name="video"><br>
          <input type="submit">
        </form>`;
    })
    .post('save video', '/video', upload.single('video'), async (ctx) => {
      const { req: { file: { originalname, path: pathFile } } } = ctx;
      const { name } = path.parse(originalname);
      const newName = `${name}.gif`;
      const input = path.join(__dirname, '..', pathFile);
      const output = path.join(__dirname, '..', '/public/gifs', newName);

      try {
        await createGifPreview(input, output);
      } catch (err) {
        ctx.throw(500);
      }

      ctx.body = { gif: `/gifs/${newName}` };
    });
};
