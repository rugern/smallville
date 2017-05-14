export default (function createApi() {
  const baseUrl = 'http://localhost:5000';

  const deleteModel = (datafile, model) => {
    const options = {
      method: 'DELETE',
    };
    return fetch(`${baseUrl}/datafiles/${datafile}/models/${model}`, options)
      .then((response) => response.text());
  };

  const getData = (datafile, query) => fetch(`${baseUrl}/datafiles/${datafile}/data?${query}`)
    .then((response) => response.json());

  const getDatafiles = () => fetch(`${baseUrl}/datafiles`)
    .then((response) => response.json());

  const getModels = (datafile) => fetch(`${baseUrl}/datafiles/${datafile}/models`)
    .then((response) => response.json());

  return {
    deleteModel,
    getData,
    getDatafiles,
    getModels,
  };
}());
