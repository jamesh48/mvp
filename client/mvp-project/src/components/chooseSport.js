const ChooseSport = (props) => {
  return (
    <div onChange={(event) => props.setSport(event)}>
      <h4 id='choose-sport'>Choose Sport</h4>
      <input type="radio" id="run" name="modality" value="Run" checked={props.checked} />
      <label for="run">Running</label><br />
      <input type="radio" id="swim" name="modality" value="Swim" />
      <label for="swim">Swimming</label><br />
      <input type="radio" id="ride" name="modality" value="Ride" />
      <label for="ride">Cycling</label><br />
      <input type="radio" id="walk" name="modality" value="Walk" />
      <label for="walk">Walking</label><br />
    </div>
  )
};

export default ChooseSport;