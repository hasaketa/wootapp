import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoginButton from 'components/login-button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './woot-plugin.less';

class WootPlugin extends Component {

  static displayName = 'WootPluginComponent';

  static propTypes = {
    actions: PropTypes.object.isRequired,
    status: PropTypes.oneOf(['enabled', 'disabled']),
    children: PropTypes.node,
    username: PropTypes.string,
    SubmitWootForm: PropTypes.func,
    onSelectProject : PropTypes.func,
    wootproject: PropTypes.Array,
    onStartDateEntered: PropTypes.func,
    onEndDateEntered: PropTypes.func
  };

  static defaultProps = {
  };

  LoginCLick = () => {
    console.log("LOGIN BUTTON CLICKED IN WOOT PLUGIN");
    this.props.actions.loginToWoot();
  }

  logOut = () => {
    this.props.actions.logoutWoot();
  }

  SubmitWootForm = (event) => {
    event.preventDefault();
    console.log("Form SUBMITTED FROM APPLYWOOT");
    this.props.actions.SubmitWootForm();
    event.preventDefault();
  }

  onSelectProject = (selection) => {
    console.log("Project Selected from list", selection.target.value);
    this.props.actions.onSelectProject(selection.target.value);
  }

  onStartDateEntered = (selection) => {
    console.log("Project Start Date entered", selection);
    this.props.actions.onStartDateEntered(selection);
  }

  onEndDateEntered = (selection) => {
    console.log("Project End Date entered", selection);
    this.props.actions.onEndDateEntered(selection);
  }

  /**
   * Render WootPlugin component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    if (this.props.username) {
      //Successful login or already logged in
      //return(
      //  <div className={classnames(styles.root)}>
      //    <ApplyWoot/>
      //  </div>
      //);
      console.log(this.props);
      const options = this.props.wootproject.map((option) => <option key={option} value={option}>{option}</option>);
      const stitchconnecterrorhtml = this.props.sitchconnectionerror ? <div>Error Connecting to STITCH</div> : <div>Connected to Stitch</div>;


      console.log(stitchconnecterrorhtml);
      return (

        <div className={classnames(styles.root)}>
        <p>Hello your username is {this.props.username}</p>
        <form onSubmit={this.SubmitWootForm}>
        <label>
          Pick the Project to Work on WOOT:
          <select value={this.props.selectedproject} onChange={this.onSelectProject}>
            {options}
          </select>
        </label>
        <label>
          Start Date:
          <DatePicker selected={this.props.selectedproject_start_date} onChange={this.onStartDateEntered} />
        </label>
        <label>
          End Date:
          <DatePicker selected={this.props.selectedproject_end_date} onChange={this.onEndDateEntered} />
        </label>
          <button>
              Apply WOOT
          </button>
        </form>
          <div><p>Status: {this.props.status_string}</p></div>
        </div>
      );
    }
      else {
        return (
          <div className={classnames(styles.root)}>
            <h2 className={classnames(styles.title)}>WootPlugin</h2>
              <p>Login to Apply for WOOT</p>
              <p>Currently you are not Logged in</p>
              {(this.props.sitchconnectionerror) ? <div>Not Connected to STITCH</div> : <div>Connected to Stitch Backend. Good to Login</div>}
              <LoginButton onClick={this.LoginCLick} />
              <div><p>Status: {this.props.status_string}</p></div>
          </div>
          );
    }
 }
}

export default WootPlugin;
export { WootPlugin };
