import $ from "jquery";
import parse from 'html-react-parser';

const eventListeners = {
  authorize: (event) => {
    // event.preventDefault();
    window.open('https://www.strava.com/oauth/authorize?client_id=61039&response_type=code&redirect_uri=http://localhost:8000/exchange_token&approval_prompt=force&scope=activity:read_all')
  },

  getLoggedInUser: (callback) => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8000/getLoggedInUser',
      // url: 'https://aqueous-fjord-59533.herokuapp.com/getLoggedInUser',
      success: (data) => {
        var formatedUser = formatUser(data);
        callback(formatedUser);
      },
      error: (err) => {
        if (err.status !== 429) {
          eventListeners.authorize();
        } else {
          alert('Error 429, Rate Limited')
        }
      }
    });
  },

  getUserActivities: (updateProgressBar, event, sport, distance, callback) => {
    event.preventDefault();

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
        const sortedResults = sortResults(data);
        const formatedResults = formatResults(sortedResults, sport, distance);
        callback(formatedResults);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        setTimeout(() => {
          updateProgressBar(null, 'reset');
        }, 500)
      }
    });
  }
}

const sortResults = (data) => {
  return data.sort((a, b) => (b.distance / b.moving_time) - (a.distance / a.moving_time));
}

const formatResults = (data, sport, distance) => {
  var pastTense = '';
  if (sport === 'Walk') {
    pastTense = 'Walked-'
  } else if (sport === 'Swim') {
    pastTense = 'Swam-'
  } else if (sport === 'Run') {
    pastTense = 'an-'
  } else {
    pastTense = 'traveled-'
  }

  return data.filter(entry => entry.type === sport && entry.distance !== 0 && entry.distance >= distance).map((entry, index) => {
    var entryStr = `<div id=${'entry' + (index + 1)} class='entry'>`
    entryStr += `<p class='entry-title'>${index + 1}. ${entry.name}</p>`
    entryStr += `<p>Distance ${pastTense} ${entry.distance} Meters</p>`
    entryStr += `<p>Time Elapsed- ${handleTime(entry['moving_time'])}</p>`
    entryStr += `<p>${(entry.distance / entry.moving_time).toFixed(2)} Meters per Second</p>`
    var entryDate = new Date(entry.start_date).toLocaleString();
    entryStr += `<p>On ${entryDate}</p>`
    entryStr += `</div>`
    return parse(entryStr);
  })
}

const handleTime = (movingTime) => {
  return new Date(movingTime * 1000).toISOString().substr(11, 8)
}

const formatUser = (user) => {
  console.log(user.ytd_swim_totals);
  var resultStr = '<div id=user-profile>';

  resultStr +=
  `<img id='user-img' src='${user.profile}'/>
  <div id='user-info'>
  <p id='user-name'>${user.firstname} ${user.lastname}</p>
  <p id='user-location'>${user.city}, ${user.state} ${user.country}</p>
  </div>`

  resultStr +=
  `<div class='ytd-totals'>
  <h4>Year-To-Date Run Totals</h4>
  <p>Number of Runs: ${user.ytd_run_totals.count}</p>
  <p>Total Distance: ${user.ytd_run_totals.distance} Meters</p>
  <p>Average Speed:
  ${(user.ytd_run_totals.count === 0 ? 0 : (user.ytd_run_totals.distance / user.ytd_run_totals.elapsed_time).toFixed(2))} Meters per Second</p>
  </div>`

  resultStr +=
  `<div class='ytd-totals'>
  <h4>Year-To-Date Swim Totals</h4>
  <p>Number of Swims: ${user.ytd_swim_totals.count}</p>
  <p>Total Distance: ${user.ytd_swim_totals.distance} Meters</p>
  <p>Average Speed:
  ${(user.ytd_swim_totals.count === 0 ? 0 : (user.ytd_swim_totals.distance / user.ytd_swim_totals.elapsed_time).toFixed(2))} Meters per Second</p>
  </div>`

  resultStr += '</div>'


  return resultStr;
}

export default eventListeners;