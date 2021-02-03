const fs = require('fs');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const auth = require('./storage.txt')
const returnStravaResults = require('./getStravaResults').returnStravaResults;
let port = process.env.PORT;
if (port === undefined || port === "") {
  port = 8000;
}
const axios = require('axios');

const corsOptions = {
  origin: 'https://aqueous-fjord-59533.herokuapp.com'
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
  fs.readFile('./server/storage.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {

      const config = {
        method: 'GET',
        url: 'https://www.strava.com/api/v3/athlete/activities',
        headers: {
          Authorization: data,
        },
        params: {
          page: 1,
          per_page: 200
        },
        data: ''
      }

      returnStravaResults.returnStravaResults((err, data) => {
        if (err) {
          res.status(404).send(err)
        } else {
          config.params.page += 1;
          returnStravaResults.returnStravaResults((err, secondData) => {
            if (err) {
              res.status(404).send(err);
            } else {
              res.status(200).send(data.concat(secondData));
            }
          }, config)
        }
      }, config);

    }
  })
})

router.get('/', (req, res, next) => {
  res.status(200).end();
})

router.get('/getLoggedInUser', (req, res, next) => {
  fs.readFile('./server/storage.txt', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const config = {
        method: 'GET',
        url: 'https://www.strava.com/api/v3/athlete',
        headers: {
          Authorization: data
        },
        data: '',
        scope: 'activity:read_all'
      }

      return axios(config)
        .then((athlete) => {
          console.log(athlete);
          res.status(200).send(athlete.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        })
    }
  })
})

router.get('/exchange_token', (req, res, next) => {
  var authCodeFromStrava = req.query.code;
  return axios.post(`https://www.strava.com/oauth/token`, {
    client_id: 61039,
    client_secret: '6fc05c73bd3bff4203650315ed04e90683b96677',
    code: authCodeFromStrava,
    grant_type: 'authorization_code'
  })
    .then((results) => {
      return results.data.token_type + ' ' + results.data.access_token;
    }).then((auth) => {
      fs.writeFile('./server/storage.txt', auth, (err) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect(`http://localhost:3000/index.html#`);
          // res.end('success');
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
})

router.post('/', (req, res, next) => {
});


app.listen(port, () => {
  console.log(`MVP App Listening on port ${port}`)
}
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

