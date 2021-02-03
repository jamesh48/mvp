const axios = require('axios');

module.exports.returnStravaResults = {
  returnStravaResults: (callback, config) => {
    return axios(config)
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error);
      });
  }

}