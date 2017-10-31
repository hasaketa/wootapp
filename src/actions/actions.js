import Reflux from 'reflux';

const WootPluginActions = Reflux.createActions([
  /**
   * define your actions as strings below, for example:
   */
  'toggleStatus',
  'loginToWoot',
  'logoutWoot',
  'SubmitWootForm',
  'onSelectProject',
  'onStartDateEntered',
  'onEndDateEntered',
]);

export default WootPluginActions;
export { WootPluginActions };
