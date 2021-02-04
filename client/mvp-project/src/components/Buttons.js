import ProgressBar from './progressbar/progress-bar';
import MoreButtons from './moreButtons';

const Buttons = (props) => {

  return (
    <div>
      <div>
        <form className='form-buttons' onSubmit={(event) => {
          console.log(props.distance);
          props.eventListeners.getUserActivities(props.updateProgressBar, event, props.sport, props.distance, (results) => {
            props.updateReport(results);
          });
        }
        } id='getRequest'>

          <div id='button-layout'>
            <div onChange={(event) => props.setSport(event)}>
              <h4 id='choose-sport'>Choose Sport</h4>
              <input type="radio" id="run" name="modality" value="Run" checked={props.checked} />
              <label for="run">Running</label><br />
              <input type="radio" id="swim" name="modality" value="Swim" />
              <label for="swim">Swimming</label><br />
              <input type="radio" id="walk" name="modality" value="Walk" />
              <label for="walk">Walking</label><br />
            </div>
            <MoreButtons distance={props.distance} sport={props.sport} setDistance={props.setDistance} />
            <div></div>
            <div></div>
          </div>

          <br />
          <ProgressBar completed={props.progressBarProgress} />
          {props.progressBarProgress === 0 ? <input type='submit' value='Get Results!'></input> : null}
        </form>
      </div>

    </div>
  );
}


export default Buttons;