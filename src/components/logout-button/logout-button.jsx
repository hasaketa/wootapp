import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './logout-button.less';

class LogoutButton extends Component {
  static displayName = 'LogoutButton';

  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    children: 'Logout'
  };

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
   * Render ToggleButton.
   *
   * @returns {React.Component} the rendered component.
   */
  render() {
    return (
        <button
          className={classnames(styles.button, styles['button--ghost'], styles['button--animateFromTop'])}
          type="button"
          onClick={this.props.onClick}>
          <span className={classnames(styles['button-text'])}>
            {this.props.children}
          </span>
        </button>
    );
  }
}

export default LogoutButton;
export { LogoutButton };
