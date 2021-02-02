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