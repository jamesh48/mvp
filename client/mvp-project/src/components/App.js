import '../App.css';
import Report from './Report';
import Buttons from './Buttons';
import Profile from './Profile';
import requestFunctions from '../requestFunctions.js';
import React from 'react';
import Entry from './entry';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateReport = this.updateReport.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.renderEntries = this.renderEntries.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderPageNumbers = this.renderPageNumbers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setSport = this.setSport.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setFormat = this.setFormat.bind(this);

    this.state = {
      profile: {},
      totalEntries: [],
      entries: [],
      currentPage: 1,
      entriesPerPage: 7,
      sport: 'Run',
      checked: false,
      progressBarProgress: 0,
      distance: 0,
      format: 'kph',
      isLoaded: false,
      topActivities: [],
      invalidEntry: false
    };
  };

  handleClick = ({ target: { id } }) => {
    this.setState({
      currentPage: Number(id)
    })
  }


  setSport = ({ target: { value } }) => {
    this.setState((prevState, props) => {
      return {
        currentPage: 1,
        checked: false,
        sport: value,
        format: value === 'Run' ? 'kph' :
          value === 'Swim' ? 'avgmpace' :
            'kph',
        entries: prevState.totalEntries.filter((entry) => entry.type === value),
        distance: 0
      }
    });
  }

  setDistance = ({ target: { value } }, checked) => {
    if (typeof Number(value) !== 'number') {
      this.setState({ invalidEntry: true });
    } else if (checked) {
      this.setState((prevState, props) => {
        return {
          currentPage: 1,
          invalidEntry: false,
          checked: true,
          distance: Number(value),
          entries: prevState.totalEntries.filter((entry) => Number(value) <= Number(entry.distance)).filter((remainingEntry) => prevState.sport === remainingEntry.type)
        }
      });
    } else {
      this.setState((prevState, props) => {
        return {
          currentPage: 1,
          invalidEntry: false,
          checked: false,
          distance: Number(value),
          entries: prevState.totalEntries.filter((entry) => Number(value) <= Number(entry.distance)).filter((remainingEntry) => prevState.sport === remainingEntry.type)
        }
      });
    }
  }


  setFormat = ({ target: { value } }) => {
    this.setState({ format: value});
  }

  updateReport(report) {
    const topSwim = report[1].find(entry => entry.type === 'Swim') || {};
    const topRun = report[1].find(entry => entry.type === 'Run') || {};
    const topRide = report[1].find(entry => entry.type === 'Ride') || {};

    report = report[0].sort((a, b) => (b.distance / b.moving_time) - (a.distance / a.moving_time));

    const topActivities = [topSwim, topRun, topRide]

    this.setState((prevState, props) => {
      return {
        topActivities: topActivities,
        isLoaded: true,
        totalEntries: report,
        entries: report.filter((entry) => entry.type === 'Run')
      }
    }
    );
  }

  showUserProfile(userProfile) {
    this.setState({ profile: userProfile })
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
    requestFunctions.getLoggedInUser((user) => {
      this.showUserProfile(user);
      requestFunctions.getUserActivities(this.updateProgressBar, (results) => {
        this.updateReport(results);
      });
    });
  }

  // This Function is called inside of render so don't set state!
  renderEntries() {
    const { entries, currentPage, entriesPerPage, sport, distance, topActivities } = this.state;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    return currentEntries.map((entry, index) => {
      if (currentPage === 1 && (index >= 0 || index <= 3)) {
        if (distance === 0) {
          var currentTopActivity = topActivities.find((topActivity) => topActivity.type === sport);
          return <li key={index}><Entry currentTopActivity={currentTopActivity} topActivities={topActivities} no={index} sport={sport} entry={entry} format={this.state.format} /></li>
        } else {
          return <li key={index}><Entry topActivities={topActivities} no={index} sport={sport} entry={entry} format={this.state.format} /></li>
        }

      }
      return <li className='entry' key={index}><Entry sport={sport} entry={entry} format={this.state.format} /></li>
    });
  }

  // This Function is called inside of render so don't set state!
  renderEmpty() {
    return (
      <li className='inner-entry'>
        <h4 className='entry-title'>~No Entries Found~</h4>
        <p>-Keep up the Good Work Champ!</p>
      </li>
    )
  }

  // This Function is called inside of render so don't set state!
  renderPageNumbers() {
    const { entries, currentPage, entriesPerPage, sport, distance, topActivities } = this.state;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(entries.length / entriesPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map(number => {
      const style = {
        backgroundColor: 'coral'
      }

      return (
        <li
          key={number}
          id={number}
          style={Number(this.state.currentPage) === number ? style : null}
          onClick={this.handleClick}
          className='pagenos'
        >
          {number}
        </li>
      )
    });
  }




  render() {
    const { entries, currentPage, entriesPerPage, profile, checked, progressBarProgress, sport, distance, format, invalidEntry, isLoaded } = this.state;
    const { updateReport, setSport, setDistance, setFormat, updateProgressBar, renderEmpty, renderEntries, renderPageNumbers } = this;

    // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const currentEntries = entries.slice(((currentPage * entriesPerPage) - entriesPerPage), (currentPage * entriesPerPage))

    return (
      <div id='body'>
        <div id='upper-section'>
          <Profile profile={profile} />
          <Buttons setSport={setSport} updateReport={updateReport} sport={sport} checked={checked} updateProgressBar={updateProgressBar} progressBarProgress={progressBarProgress} distance={distance} setDistance={setDistance} setFormat={setFormat} format={format} />
        </div>
        <Report invalidEntry={invalidEntry} isLoaded={isLoaded} progressBarProgress={progressBarProgress} currentEntries={currentEntries} renderEmpty={renderEmpty} renderPageNumbers={renderPageNumbers} renderEntries={renderEntries} />
      </div>

    )
  }
}

export default App;
