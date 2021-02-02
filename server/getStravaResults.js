const axios = require('axios');

const authorizationToken = 'Bearer fd929d04d80c243330a1ae1b4ff25559aa321f2e'
const authorizationCookie = '_strava4_session=lvbt391rhlo8pjjalnrb6ovci72c05jg';
const url = 'https://www.strava.com/api/v3/athlete/activities';

const config = {
  method: 'GET',
  url: url,
  headers: {
    'Authorization': authorizationToken,
    'Cookie': authorizationCookie
  }
};

module.exports.returnStravaResults = (callback) => {
  return axios(config)
  .then((response) => {
    callback(null, response.data);
  })
  .catch((error) => {
    callback(error);
  });
}