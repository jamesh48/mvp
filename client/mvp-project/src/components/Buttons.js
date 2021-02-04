import ProgressBar from './progressbar/progress-bar';
import ChooseSport from './chooseSport';
import ChooseDistance from './chooseDistance';
import ChooseFormat from './chooseFormat';

const Buttons = (props) => {

  return (
    <div>
      <div>
        <form className='form-buttons' onSubmit={(event) => {
          props.eventListeners.getUserActivities(props.updateProgressBar, event, props.sport, props.distance, props.format, (results) => {
            props.updateReport(results);
          });
        }
        } id='getRequest'>

          <div id='button-layout'>
            <ChooseSport setSport = {props.setSport} checked={props.checked}/>
            <ChooseDistance distance={props.distance} sport={props.sport} setDistance={props.setDistance} />
            <ChooseFormat format={props.format} setFormat={props.setFormat} sport={props.sport}/>
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