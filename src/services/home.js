exports.filmsList = async (request) => {
  const data = require('../../public/data.json');
  return {data: data.docinfos};
}