import '../App.css';
import Report from './Report';
import Buttons from './Buttons';
import Profile from './Profile';
import requestFunctions from '../requestFunctions.js';
import React from 'react';
import Entry from './entry';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateReport = this.updateReport.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.renderEmpty = this.renderEmpty.bind(this);
    this.renderPageNumbers = this.renderPageNumbers.bind(this);
    this.showIndividualEntry = this.showIndividualEntry.bind(this);
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
      invalidEntry: false,
      currentActivity: {}
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

  showIndividualEntry = ({ target: { dataset: { testid } } }) => {

    var config = {
      'method': 'GET',
      // 'url': 'http://localhost:8000/individualEntry',
      url: 'https://aqueous-fjord-59533.herokuapp.com/individualEntry',
      'contentType': 'application/json',
      params: {
        'entryid': testid
      }
    }

    return axios(config)
      .then((response) => {
        this.setState({ currentActivity: response.data });
      })
      .catch((err) => {
        console.log(err)
      })
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
    this.setState({ format: value });
  }

  updateReport(report) {
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

  // This Function is called inside of render so don't set state!
  renderEmpty() {
    return (
      <li className='inner-entry'>
        <h4 className='entry-title'>~No Entries Found~</h4>
        <p>But keep up the Good Work Champ!</p>
      </li>
    )
  }

  // This Function is called inside of render so don't set state!
  renderPageNumbers() {
    const { entries, currentPage, entriesPerPage, sport, distance } = this.state;
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
    const { currentActivity, entries, currentPage, entriesPerPage, profile, checked, progressBarProgress, sport, distance, format, invalidEntry, isLoaded } = this.state;
    const { updateReport, setSport, setDistance, setFormat, updateProgressBar, renderEmpty, renderPageNumbers } = this;

    // https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
    const currentEntries = entries.slice(((currentPage * entriesPerPage) - entriesPerPage), (currentPage * entriesPerPage))

    const renderEntries = currentEntries.map((entry, index) => {

      if (currentPage === 1 && (index >= 0 && index <= 3)) {
        return <li key={index}><Entry currentActivity={currentActivity} showIndividualEntry={this.showIndividualEntry} no={index} sport={sport} entry={entry} format={format} /></li>
      } else {
        return <li className='entry' key={index}><Entry currentActivity={currentActivity} showIndividualEntry={this.showIndividualEntry} sport={sport} entry={entry} format={format} /></li>
      }

    })


    // if (currentPage === 1 && (index >= 0 && index <= 3)) {
    //   if (distance === 0) {
    //     var currentTopActivity = topActivities.find((topActivity) => topActivity.type === sport);
    //     return <li key={index}><Entry showIndividualEntry={this.showIndividualEntry} currentTopActivity={currentTopActivity} topActivities={topActivities} no={index} sport={sport} entry={entry} format={this.state.format} /></li>
    //   } else {
    //     return <li key={index}><Entry no={index} showIndividualEntry={this.showIndividualEntry} sport={sport} entry={entry} format={format} /></li>
    //   }

    // } else if (currentActivity.id === entry.id) {
    //   console.log('bingo one')
    //   return
    //   <li className='entry' key={index}>
    //     <Entry currentActivity={currentActivity} showIndividualEntry={this.showIndividualEntry} sport={sport} entry={entry} format={this.state.format} />
    //   </li>
    // } else {
    //   return <li className='entry' key={index}><Entry showIndividualEntry={this.showIndividualEntry} sport={sport} entry={entry} format={format} /></li>
    // }

    // });

    return (
      <div id='body' >
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
