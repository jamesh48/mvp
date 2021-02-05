const ChooseDistance = (props) => {
  if (props.sport === 'Swim') {
    return (
      <div className='choose-radio'>
        <h4 className='choose-title' id='choose-distance'>Choose Distance</h4>

        <input type="radio" id="allresults" name="swimdistance" value="0" checked={props.distance === 0 ? 'checked' : null} onClick={(event) => props.setDistance(event)} />
        <label for="allresults">All Results</label><br />

        <input type="radio" id="mile" name="swimdistance" value="1500" onClick={(event) => props.setDistance(event)} />
        <label for="mile">Mile</label><br />

        <input type="radio" id="3k" name="swimdistance" value="3000" onClick={(event) => props.setDistance(event)} />
        <label for="3k">3k</label><br />

        <input type="radio" id="5k" name="swimdistance" value="5000" onClick={(event) => props.setDistance(event)} />
        <label for="5k">5k</label><br />

        <input type="radio" id="10k" name="swimdistance" value="10000" onClick={(event) => props.setDistance(event)} />
        <label for="10k">10k</label><br />
      </div>
    )
  } else if (props.sport === 'Run') {
    return (
      <div className='choose-radio'>
        <h4 className='choose-title' id='choose-distance'>Choose Distance</h4>
        <input type="radio" id="allresults" name="distance" value="0" checked={props.distance === 0 ? 'checked' : null} onClick={(event) => props.setDistance(event)} />
        <label for="allresults">All Results</label><br />

        <input type="radio" id="5k" name="distance" value="5000" onClick={(event) => props.setDistance(event)} />
        <label for="5k">5k</label><br />

        <input type="radio" id="10k" name="distance" value="10000" onClick={(event) => props.setDistance(event)} />
        <label for="10k">10k</label><br />

        <input type="radio" id="halfmarathon" name="distance" value="21097.5" onClick={(event) => props.setDistance(event)} />
        <label for="halfmarathon">Half Marathon</label><br />

        <input type="radio" id="marathon" name="distance" value="42195" onClick={(event) => props.setDistance(event)} />
        <label for="marathon">Marathon</label><br />
      </div>
    )
  } else {
    return null;
  }
}

export default ChooseDistance;