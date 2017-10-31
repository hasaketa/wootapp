import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import styles from './apply-woot.less';


class ApplyWoot extends Component {

  static displayName = 'ApplyWoot';

  static propTypes = {
    //recevied from woot-plugin maybe add more info here for employee
    children: PropTypes.node,
    username: PropTypes.string,
    onSubmitForm: PropTypes.func,
    onSelectProject : PropTypes.func,
    wootproject: PropTypes.string
  };

  static defaultProps = {
    children: 'ApplyWoot',
    username: 'applywootUsername',
    sampletext: 'Sample text',
    wootproject: 'skunkworks'
  };

  onSubmitForm = () => {
    console.log("Form SUBMITTED FROM APPLYWOOT");
    this.props.actions.onSubmitForm();
  }

  onSelectProject(event) {
    this.setState({wootproject: event.target.value  });
    this.props.actions.onSelectProject();
  }


  componentDidMount() {
    this.noop();
  }

  // A no-operation so that the linter passes for the compass-plugin template,
  // without the need to an ignore rule, because we want the linter to fail when this
  // dependency is "for-real" not being used (ie: in an actual plugin).
  noop = () => {
    const node = ReactDOM.findDOMNode(this);
    return node;
  };

  /**
   * Render ApplyWoot FORM.
   *
   * @returns {React.Component} the rendered component.
   */
  render() {
      console.log('APPLYWOOT APP HERE');
    if (this.props.username) {
    return (
      <div className={classnames(styles.root)}>
      <p>Hello your username is {this.props.username}</p>
      <form onSubmit={this.props.onSubmitForm}>
      <label>
        Pick the Project to Work on WOOT:
        <select value={this.props.wootproject} onChange={this.props.onSelectProject}>
          <option value="skunkworks">SkunkWorks</option>
          <option value="mtools">mtools</option>
          <option value="colonizer">Colonizer</option>
          <option value="exodev">Exodev</option>
        </select>
      </label>
        <button>
            Apply WOOT
        </button>
      </form>
      </div>
    );
  } else {
    return null;
  }
  }
}

export default ApplyWoot;
export { ApplyWoot };
