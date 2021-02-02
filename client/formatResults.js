const formatResults = (data) => {
  var resultStr = '';
  data.filter(entry => entry.type === 'Swim' && entry.distance !== 0).forEach((entry, index) => {
    var entryStr = `<div id=${'entry' + (index + 1)} class='entry'>`
    entryStr += `<p>${index + 1}. ${entry.name}</p>`
    entryStr += `<p>Distance Swam- ${entry.distance}</p>`
    entryStr += `<p>Time Elapsed- ${handleTime(entry['moving_time'])}</p>`
    entryStr += `<p>${(entry.moving_time / entry.distance).toFixed(2)} seconds per meter swam</p>`
    entryStr += `</div>`
    resultStr += entryStr;
  })
  return resultStr;
}

const handleTime = (movingTime) => {
  return new Date(movingTime * 1000).toISOString().substr(11, 8)
}