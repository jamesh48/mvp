import parse from 'html-react-parser';

const Report = (props) => {
  return props.report ? parse(props.report) : null
};

export default Report;