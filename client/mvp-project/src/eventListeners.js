import $ from "jquery";

const eventListeners = {
  authorizeSubmit: (event) => {
    event.preventDefault();
    window.open('https://www.strava.com/oauth/authorize?client_id=61039&response_type=code&redirect_uri=http://localhost:8000/exchange_token&approval_prompt=force&scope=activity:read_all')
  },

  getLoggedInUser: (callback) => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8000/getLoggedInUser',
      success: (data) => {
        // console.log(data);
        var formatedUser = formatUser(data);
        callback(formatedUser);
      },
      error: (err) => {
        console.log(err);
      }
    })
  },

  getUserActivities: (event, callback) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/getResults',
      contentType: 'application/json',

      success: (data) => {
        const sortedResults = sortResults(data);
        const formatedResults = formatResults(sortedResults);
        callback(formatedResults);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

const sortResults = (data) => {
  return data.sort((a, b) => (b.distance / b.moving_time) - (a.distance / a.moving_time));
}

const formatResults = (data) => {
  var resultStr = '';
  data.filter(entry => entry.type === 'Swim' && entry.distance !== 0).forEach((entry, index) => {
    var entryStr = `<div id=${'entry' + (index + 1)} class='entry'>`
    entryStr += `<p class='entry-title'>${index + 1}. ${entry.name}</p>`
    entryStr += `<p>Distance Swam- ${entry.distance} Meters</p>`
    entryStr += `<p>Time Elapsed- ${handleTime(entry['moving_time'])}</p>`
    entryStr += `<p>${(entry.distance / entry.moving_time).toFixed(2)} Meters per Second</p>`
    var entryDate = new Date(entry.start_date).toLocaleString();
    entryStr += `<p>At ${entryDate}</p>`
    entryStr += `</div>`
    resultStr += entryStr;
  })
  return resultStr;
}

const handleTime = (movingTime) => {
  return new Date(movingTime * 1000).toISOString().substr(11, 8)
}

const formatUser = (user) => {
  console.log(user);
  var resultStr = '<div id=user-profile>';
  resultStr += `<img id='user-img' src='${user.profile}'/>`
  resultStr += `<span id='user-info'>`
  resultStr += `<p id='user-name'>${user.firstname} ${user.lastname}</p>`;
  resultStr += `<p id='user-location'>${user.city}, ${user.state} ${user.country}</p>`
  resultStr += `</span>`

  resultStr += '</div>'
  return resultStr;
}

export default eventListeners;