const Buttons = (props) => {
  return (
    <div id ='button-layout'>

      <div>
        <form className='form-buttons' onSubmit={(event) => props.eventListeners.authorizeSubmit(event)} id='authorizeRequest'>
          <input type='submit' value='Authorize!'></input>
        </form>
      </div>

      <div>
        <form className='form-buttons'  onSubmit={(event) => {
          props.eventListeners.getUserActivities(event, (results) => {
            props.updateReport(results);
          });
        }
        } id='getRequest'>
          <input type='submit' value='Get Results!'></input>
        </form>
      </div>

    </div>
  );
}


export default Buttons;