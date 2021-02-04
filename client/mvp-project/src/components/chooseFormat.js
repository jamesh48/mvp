const ChooseFormat = (props) => {
  return (
    <div className='choose-radio' onChange={(event) => props.setFormat(event)}>
      {
        props.sport === 'Swim' ?
          <div>
            <h4 id='choose-format'>Choose Format</h4>
            <div>
              <input type='radio' id='avgmpace' name='format' value="avgmpace" checked={props.format === 'avgmpace' ? 'Checked' : null} />
              <label for="avgmpace">Pace per 100 Meters</label>
            </div>
            <div>
              <input type='radio' id='avgypace' name='format' value="avgypace" />
              <label for="avgypace">Pace per 100 Yards</label>
            </div>
          </div>
          :
          props.sport === 'Run' ?
            <div>
              <h4 id='choose-format'>Choose Format</h4>
              <input type="radio" id="kph" name="format" value="kph" checked={props.format === 'kph' ? 'Checked' : null} />
              <label for="kph">Kilometers/Hour</label><br />

              <input type="radio" id="mph" name="format" value="mph" />
              <label for="mph">Miles/Hour</label><br />

              <input type="radio" id="mps" name="format" value="mps" />
              <label for="mps">Meters/Second</label><br />
            </div>
            : null
      }
    </div>

  )
}

export default ChooseFormat;