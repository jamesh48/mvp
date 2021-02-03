const Report = (props) => {
  // return props.report ? props.report : null
  return (
    <div>
      <ul className ='uls'>
        {props.renderEntries}
      </ul>
      <ul class= 'uls' id='page-numbers'>
        {props.renderPageNumbers}
      </ul>
      </div>
        )
        };

export default Report;