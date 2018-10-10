exports.filmDetail = async (request) => {
  const id = parseInt(request.params.id);
  const data = require('../../public/data.json');
  let ret = null;
  for (let index = 0; index < data.docinfos.length; index++) {
    const value = data.docinfos[index];
    if (value.albumDocInfo.albumId === id) {
      ret = value;
      break;
    }
  }
  if (ret) {
    return {filmDetail: ret};
  }
  return null;
}