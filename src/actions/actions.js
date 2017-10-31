import Reflux from 'reflux';

const WootPluginActions = Reflux.createActions([
  /**
   * define your actions as strings below, for example:
   */
  'toggleStatus',
  'loginToWoot',
  'logoutWoot',
  'onSubmitForm',
  'onSelectProject'
]);

export default WootPluginActions;
export { WootPluginActions };
