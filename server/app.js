const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const returnStravaResults = require('./getStravaResults').returnStravaResults;
let port = process.env.PORT;
if (port === undefined || port === "") {
  port = 8000;
}
const axios = require('axios');

const corsOptions = {
  origin: 'https://aqueous-fjord-59533.herokuapp.com/'
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/', router);
router.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

router.get('/getResults', (req, res, next) => {
  returnStravaResults((err, results) => {
    if (err) {
      res.status(404).send('error')
    } else {
      res.status(200).send(results);
    }
  });
})
router.get('/', (req, res, next) => {
  res.status(200).end();
})

router.get('/authorize', (req, res, next) => {
//   // return axios({
//   //   method: 'GET',
//   //   url: `https://www.strava.com/oauth/authorize?client_id=61039&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all`,
//   //   headers: {
//   //     'Access-Control-Allow-Origin': true
//   //   }
//   // })
//   // .then((results) => {
//   //   results = Object.values(results);
//   //   res.status(200).send(results);
//   // })
  res.redirect(`https://www.strava.com/oauth/authorize?client_id=61039&response_type=code&redirect_uri=http://localhost:4000/exchange_token&approval_prompt=force&scope=activity:read_all`);
res.status(200).send('success')
})

router.post('/', (req, res, next) => {
});


app.listen(port, () => {
  console.log(`MVP App Listening on port ${port}`)}
)

// To Manually Get Access Token...
//First- GET Request
// https://www.strava.com/oauth/authorize?client_id=61039&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all

//Get the 'code' param from the queryString

//Second-POST Request
// https://www.strava.com/oauth/token?
    // client_id=61039&
    // client_secret=6fc05c73bd3bff4203650315ed04e90683b96677&
    // code=<code param from query string>&
    // grant_type=authorization_code

//access-token: POST request returns an access token

//Third- Get Request- In getStravaResults.js
//https://www.strava.com/api/v3/athlete/activities
//With Auth set to OAUTH2.0 with provided access-token

