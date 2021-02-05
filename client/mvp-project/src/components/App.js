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
    this.handleClick = this.handleClick.bind(this);
    this.setSport = this.setSport.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setFormat = this.setFormat.bind(this);

    this.state = {
      profile: {},
      totalEntries: [],
      entries: [],
      currentPage: 1,
      entriesPerPage: 7,
      sport: 'Run',
      checked: 'checked',
      progressBarProgress: 0,
      distance: 0,
      format: 'kph',
      isLoaded: false
    }
  }



  handleClick(event) {

    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  setSport(event) {
    this.setState((prevState, props) => {
      return {
        currentPage: 1,
        sport: event.target.value,
        format: event.target.value === 'Run' ? 'kph' :
          event.target.value === 'Swim' ? 'avgmpace' :
            'kph',
        entries: prevState.totalEntries.filter((entry) => entry.type === event.target.value),
        distance: 0
      }
    });

  }

  setDistance(event) {
    this.setState((prevState, props) => {
      return {
        currentPage: 1,
        distance: Number(event.target.value),
        entries: prevState.totalEntries.filter((entry) => Number(event.target.value) <= Number(entry.distance)).filter((remainingEntry) => prevState.sport === remainingEntry.type)
      }
    });
  }

  setFormat(event) {
    this.setState({ format: event.target.value });
  }

  updateReport(report) {
    report = report.sort((a, b) => (b.distance / b.moving_time) - (a.distance / a.moving_time));
    this.setState((prevState, props) => {
      return {
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


  render() {
    // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const { entries, currentPage, entriesPerPage } = this.state;
    const { sport, distance } = this.state;
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

    const renderEmpty = () => {
      console.log('render empty');
      return (
        <li className='inner-entry'>
          <h4 className='entry-title'>~No Entries Found~</h4>
          <p>-Keep up the Good Work Champ!</p>
        </li>
      )
    }

    const renderEntries = currentEntries.map((entry, index) => {
      if (currentPage === 1) {
        return <li key={index}><Entry no={index} sport={sport} entry={entry} format={this.state.format} /></li>
      }
      return <li className='entry' key={index}><Entry sport={sport} entry={entry} format={this.state.format} /></li>
    });

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(entries.length / entriesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
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

    return (
      <div id='body'>
        <div id='upper-section'>
          <Profile profile={this.state.profile} />
          <Buttons setSport={this.setSport} updateReport={this.updateReport} sport={this.state.sport} checked={this.state.checked} updateProgressBar={this.updateProgressBar} progressBarProgress={this.state.progressBarProgress} distance={this.state.distance} setDistance={this.setDistance} setFormat={this.setFormat} format={this.state.format} />
        </div>
        <Report isLoaded={this.state.isLoaded} progressBarProgress={this.state.progressBarProgress} currentEntries={currentEntries} renderEmpty={renderEmpty} renderPageNumbers={renderPageNumbers} renderEntries={renderEntries} />

      </div>

    )
  }
}

export default App;
