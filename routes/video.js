export default (router) => {
  router.get('root', '/', (ctx) => {
    ctx.body = `
      <form action="fileupload" method="post" enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
      </form>`;
  });
};
