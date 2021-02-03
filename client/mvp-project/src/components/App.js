import '../App.css';
import Report from './Report';
import Buttons from './Buttons';
import Profile from './Profile';
import eventListeners from '../eventListeners.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateReport = this.updateReport.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setSport = this.setSport.bind(this);

    this.state = {
      report: null,
      profile: null,
      entries: [],
      currentPage: 1,
      entriesPerPage: 7,
      sport: 'Run',
      checked: 'checked'
    }
  }

  updateReport(report) {
    this.setState({entries: report });
  }

  handleClick(event) {
    this.setState({currentPage: Number(event.target.id)});
  }

  setSport(event) {
    this.setState({sport: event.target.value,
                  checked: event.target.value === 'Run' ? 'Checked' : ''});
  }

  showUserProfile(userProfile) {
    this.setState({ profile: userProfile })
  }

  componentDidMount() {
    document.title = 'Swim Report Generator';
    eventListeners.getLoggedInUser((user) => {
      this.showUserProfile(user);
    })
  }


  render() {
    // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const {entries, currentPage, entriesPerPage} = this.state;

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    const renderEntries = currentEntries.map((entry, index) => {
      return <li key={index}>{entry}</li>
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(entries.length / entriesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
      <li
      key={number}
      id={number}
      onClick={this.handleClick}
      className = 'pagenos'
      >
        {number}
      </li>
      )
    });

    return (
      <div>
        <Profile profile={this.state.profile} />
        <Buttons eventListeners={eventListeners} setSport ={this.setSport} updateReport={this.updateReport} checked={this.state.checked} sport={this.state.sport}/>
        <Report renderPageNumbers = {renderPageNumbers} renderEntries = {renderEntries} report={this.state.report} />
      </div>

    )
  }
}

export default App;
