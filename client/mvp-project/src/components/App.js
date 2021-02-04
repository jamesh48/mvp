import '../App.css';
import Report from './Report';
import Buttons from './Buttons';
import Profile from './Profile';
import eventListeners from '../eventListeners.js';
import React from 'react';
import Entry from './entry';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateReport = this.updateReport.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setSport = this.setSport.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setFormat = this.setFormat.bind(this);

    this.myVar = '';
    this.state = {
      report: null,
      profile: null,
      entries: [],
      currentPage: 1,
      entriesPerPage: 7,
      sport: 'Run',
      checked: 'checked',
      progressBarProgress: 0,
      isLoaded: false,
      distance: 0,
      format: 'kph'
    }
  }

  updateReport(report) {
    this.setState({ entries: report});
  }

  handleClick(event) {
    this.setState({ currentPage: Number(event.target.id) });
  }

  setSport(event) {
    this.setState({
      sport: event.target.value,
      checked: event.target.value === 'Run' ? 'Checked' : '',
      distance: 0
    });
  }

  setDistance(event) {
    this.setState({ distance: Number(event.target.value)});
  }

  setFormat(event) {
    this.setState({format: event.target.value});
  }

  showUserProfile(userProfile) {
    this.setState({ profile: userProfile, isLoaded: true })
  }

  updateProgressBar(end, reset) {
    if (end) {
      this.setState({ progressBarProgress: 100 })
    } else if (this.state.progressBarProgress === 95) {
      return true;
    } else if (reset) {
      this.setState({ progressBarProgress: 0 });
    } else {
      this.setState(prevState => {
        return {
          ...prevState,
          progressBarProgress: prevState.progressBarProgress + 1
        }
      });
    }
  }

  componentDidMount() {
    document.title = 'Strava Report Generator';
    eventListeners.getLoggedInUser((user) => {
      this.showUserProfile(user);
    });
  }

  render() {
    // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const { entries, currentPage, entriesPerPage } = this.state;

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    const renderEntries = currentEntries.map((entry, index) => {
      // return <li key={index}>{entry}</li>
      return new Entry;
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
          className='pagenos'
        >
          {number}
        </li>
      )
    });

    return (
      <div id='body'>
        <Profile profile={this.state.profile} />
        <Buttons eventListeners={eventListeners} setSport={this.setSport} updateReport={this.updateReport} sport={this.state.sport} checked={this.state.checked} updateProgressBar={this.updateProgressBar} progressBarProgress={this.state.progressBarProgress} distance={this.state.distance} setDistance={this.setDistance} setFormat ={this.setFormat} format={this.state.format}/>
        <Report format={this.state.format} renderPageNumbers={renderPageNumbers} renderEntries={renderEntries} report={this.state.report} />
      </div>

    )
  }
}

export default App;
