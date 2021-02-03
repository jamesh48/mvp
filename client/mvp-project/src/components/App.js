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
    this.state = {
      report: null,
      profile: null
    }
  }

  updateReport(report) {
    this.setState({ report: report });
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
    return (
      <div>
        <Profile profile={this.state.profile} />
        <Buttons eventListeners={eventListeners} updateReport={this.updateReport} showUserProfile={this.showUserProfile} />
        <Report report={this.state.report} />
      </div>
    )
  }
}

export default App;
