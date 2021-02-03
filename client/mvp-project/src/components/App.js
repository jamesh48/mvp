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

    this.state = {
      report: null,
      profile: null,
      entries: [],
      currentPage: 1,
      entriesPerPage: 7
    }
  }

  updateReport(report) {
    this.setState({entries: report });
  }

  handleClick(event) {
    this.setState({currentPage: Number(event.target.id)});
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
        <Buttons eventListeners={eventListeners} updateReport={this.updateReport} showUserProfile={this.showUserProfile} />
        <Report renderPageNumbers = {renderPageNumbers} renderEntries = {renderEntries} report={this.state.report} />
      </div>

    )



    // return (
    //   <div>
    //     <Profile profile={this.state.profile} />
    //     <Buttons eventListeners={eventListeners} updateReport={this.updateReport} showUserProfile={this.showUserProfile} />
    //     <Report report={this.state.report} />
    //   </div>
    // )
  }
}

export default App;
