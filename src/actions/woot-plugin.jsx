import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoginButton from 'components/login-button';

import styles from './woot-plugin.less';

class WootPlugin extends Component {

  static displayName = 'WootPluginComponent';

  static propTypes = {
    actions: PropTypes.object.isRequired,
    status: PropTypes.oneOf(['enabled', 'disabled']),
    children: PropTypes.node,
    username: PropTypes.string,
    onSubmitForm: PropTypes.func,
    onSelectProject : PropTypes.func,
    wootproject: PropTypes.Array
  };

  static defaultProps = {
    //Check Login Status
  //  status: 'disabled',
  //  username: 'Ankur',
  //  sampletext: 'Sample text',
  //  children: 'ApplyWoot',
  //  sampletext: 'Sample text',

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
    console.log("Form SUBMITTED FROM APPLYWOOT", event.target);
//    this.props.actions.SubmitWootForm(event);
//    event.preventDefault();
  }

  onSelectProject = (selection) => {
    console.log("Project Selected from list", selection.target.value);
    this.props.actions.onSelectProject(selection.target.value);
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
          <button>
              Apply WOOT
          </button>
        </form>
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
          </div>
          );
    }
 }
}

export default WootPlugin;
export { WootPlugin };
