import $ from "jquery";
import parse from 'html-react-parser';
import config from './settings';
import testData from './testData';
import profileTestData from './profileTestData';


const requestFunctions = {
  authorize: () => {
    window.open(`https://www.strava.com/oauth/authorize?client_id=${config.userId}&response_type=code&redirect_uri=http://localhost:8000/exchange_token&approval_prompt=force&scope=activity:read_all`)
  },

  getLoggedInUser: (callback) => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8000/getLoggedInUser',
      // url: 'https://aqueous-fjord-59533.herokuapp.com/getLoggedInUser',
      success: (data) => {
        callback(data);
      },
      error: (err) => {
        if (err.status === 429) {
          console.log(`Error ${err.status}: ${err.statusText}`);
          callback(profileTestData);
        } else {
          requestFunctions.authorize();
        }
      }
    });
  },

  getUserActivities: (updateProgressBar, callback) => {
    const moveProgressBar = setInterval(() => {
      var test = updateProgressBar()
      if (test === true) {
        clearInterval(moveProgressBar);
      }
    }, 90);

    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/getResults',
      // url: 'https://aqueous-fjord-59533.herokuapp.com/getResults',
      contentType: 'application/json',
      success: (data) => {
        clearInterval(moveProgressBar)
        updateProgressBar('end');
        callback(data);
      },
      error: (err) => {
        console.log(err);
        clearInterval(moveProgressBar);
        updateProgressBar('end');
        callback(testData)
      },
      complete: () => {
        setTimeout(() => {
          updateProgressBar(null, 'reset');
        }, 400)
      }
    });
  }
}

export default requestFunctions;