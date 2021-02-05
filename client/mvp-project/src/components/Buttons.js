import ProgressBar from './progressbar/progress-bar';
import ChooseSport from './chooseSport';
import ChooseDistance from './chooseDistance';
import ChooseFormat from './chooseFormat';

const Buttons = (props) => {

  return (
    <div>
      <div>
        <div id='button-layout'>
          <ChooseSport setSport={props.setSport} checked={props.checked} />
          <ChooseDistance distance={props.distance} sport={props.sport} setDistance={props.setDistance} />
          <ChooseFormat format={props.format} sport={props.sport} setFormat={props.setFormat} />
        </div>
        <ProgressBar completed={props.progressBarProgress} />
      </div>
    </div>
  );
}


export default Buttons;