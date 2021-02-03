const Buttons = (props) => {
  return (
    <div id='button-layout'>
      <div>
        <form className='form-buttons' onSubmit={(event) => {
          props.eventListeners.getUserActivities(event, props.sport, (results) => {
            props.updateReport(results);
          });
        }
        } id='getRequest'>
          <p id='modality'>Choose Modality</p>
          <div onChange={(event) => props.setSport(event)}>
            <input type="radio" id="run" name="modality" value="Run" checked={props.checked}/>
            <label for="run">Running</label><br />
            <input type="radio" id="swim" name="modality" value="Swim" />
            <label for="swim">Swimming</label><br />
            <input type="radio" id="walk" name="modality" value="Walk" />
            <label for="walk">Walking</label><br />
          </div>
          <br/>
          <input type='submit' value='Get Results!'></input>
        </form>
      </div>

    </div>
  );
}


export default Buttons;