import React, { useState } from 'react';

const MoreButtons = (props) => {
  if (props.sport === 'Swim') {
    return (
      <div className='more-buttons' onChange={(event) => props.setDistance(event)}>
        <h4 id='choose-distance'>Choose Distance</h4>

        <input type="radio" id="allresults" name="distance" value="0" checked={props.distance === 0 ? 'Checked' : null} />
        <label for="allresults">All Results</label><br />

        <input type="radio" id="mile" name="distance" value="1500" />
        <label for="mile">Mile</label><br />

        <input type="radio" id="3k" name="distance" value="3000" />
        <label for="3k">3k</label><br />

        <input type="radio" id="5k" name="distance" value="5000" />
        <label for="5k">5k</label><br />

        <input type="radio" id="10k" name="distance" value="10000" />
        <label for="10k">10k</label><br />
      </div>
    )
  } else if (props.sport === 'Run') {
    return (
      <div className='more-buttons' onChange={(event) => props.setDistance(event)}>
        <h4 id='choose-distance'>Choose Distance</h4>
        <input type="radio" id="allresults" name="distance" value="0" checked={props.distance === 0 ? 'Checked' : null} />
        <label for="allresults">All Results</label><br />

        <input type="radio" id="5k" name="distance" value="5000"/>
        <label for="5k">5k</label><br />

        <input type="radio" id="10k" name="distance" value="10000" />
        <label for="10k">10k</label><br />

        <input type="radio" id="halfmarathon" name="distance" value="21097.5" />
        <label for="halfmarathon">Half Marathon</label><br />

        <input type="radio" id="marathon" name="distance" value="42195" />
        <label for="marathon">Marathon</label><br />
      </div>
    )
  } else {
    return null;
  }
}

export default MoreButtons;