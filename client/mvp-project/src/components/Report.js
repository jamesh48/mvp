import Entry from './entry';

const Report = (props) => {
  return (
    <div id='report'>
      <ul className='uls'>
        {props.renderEntries}
        {/* {props.entries.map((entry) => {
        return <Entry entry={entry} />
      })} */}
      </ul>
      <ul class='uls' id='page-numbers'>
        {props.renderPageNumbers}
      </ul>



    </div>
  )
};

export default Report;

