import React from 'react';

const Entry = (props) => {
  var pastTense = '';
  if (props.sport === 'Walk') {
    pastTense = 'Walked-'
  } else if (props.sport === 'Swim') {
    pastTense = 'Swam-'
  } else if (props.sport === 'Ride') {
    pastTense = 'Rode-'
  } else if (props.sport === 'Run') {
    pastTense = 'Ran-'
  } else {
    pastTense = 'traveled-'
  }

  const handleTime = (movingTime, pace) => {
    if (movingTime !== Infinity) {
      if (pace) {
        return new Date(movingTime * 1000).toISOString().substr(15, 4)
      }
      return new Date(movingTime * 1000).toISOString().substr(11, 8)
    } else {
      return '00:00'
    }
  }

  return (
    <div id={'entry' + (Number(props.no) + 1)} className='inner-entry'>
      <h4 className='entry-title'>{props.entry.name}</h4>
      {props.format !== 'avgypace' ?
        <p>Distance {pastTense} {props.entry.distance} Meters</p> :
        <p>Distance {pastTense} {(props.entry.distance * 1.09361).toFixed()} Yards</p>
      }
      <p>Time Elapsed- {handleTime(props.entry.moving_time)}</p>

      {props.format === 'kph' ? <p><p className='speed'>{((props.entry.distance / props.entry.moving_time) * 3.6).toFixed(2)} </p> Kilometers Per Hour</p> :
        props.format === 'mph' ? <p><p className='speed'>{((props.entry.distance / props.entry.moving_time) * 2.237).toFixed(2)} </p> Miles Per Hour</p> :
          props.format === 'mps' ? <p><p className='speed'>{((props.entry.distance / props.entry.moving_time)).toFixed(2)} </p> Meters Per Second</p> :
            props.format === 'avgypace' ? <p><p className='speed'>{handleTime((props.entry.moving_time / ((props.entry.distance * 1.09361) / 100)), 'pace')} </p>/100 yards</p> :

              props.format === 'avgmpace' ? <p><p className='speed'>{handleTime(props.entry.moving_time / (props.entry.distance / 100), 'pace')}</p>/100 Meters</p>
                : null
      }

      <p>{new Date(props.entry.start_date).toLocaleString()}</p>
    </div>
  )
}

export default Entry;


// return data.filter(entry => entry.type === sport && entry.distance !== 0 && entry.distance >= distance).map((entry, index) => {
//   var entryStr = `<div id=${'entry' + (index + 1)} class='entry'>`
//   entryStr += `<p class='entry-title'>${index + 1}. ${entry.name}</p>`
//   entryStr += `<p>Distance ${pastTense} ${entry.distance} Meters</p>`
  // entryStr += `<p>Time Elapsed- ${handleTime(entry['moving_time'])}</p>`
//   entryStr += `<p><p className='speed'> ${((entry.distance / entry.moving_time) * 3.6).toFixed(2)} </p> Kilometers per Hour</p>`


//   var entryDate = new Date(entry.start_date).toLocaleString();
//   entryStr += `<p>On ${entryDate}</p>`
//   entryStr += `</div>`
//   return parse(entryStr);
// })