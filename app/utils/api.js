export default (function createApi() {
  const baseUrl = 'http://localhost:5000';

  const deleteModel = (model) => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: {
        model,
      },
    };
    return fetch(`${baseUrl}/models?action=delete`, options);
  };

  const getData = (query) => fetch(`${baseUrl}/data?${query}`);

  const getDatafiles = () => fetch(`${baseUrl}/datafiles`);

  const getModels = (id) => fetch(`${baseUrl}/models/${id}`);

  return {
    deleteModel,
    getData,
    getDatafiles,
    getModels,
  };
}());
