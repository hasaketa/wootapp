import WootPluginPlugin from './plugin';
import WootPluginActions from 'actions';
import ApplyWootActions from 'actions';
import WootPluginStore from 'stores';
import ApplyWootStore from 'stores';


/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'WootPlugin',
  component: WootPluginPlugin
};

/**
 * Activate all the components in the Woot Plugin package.
 * @param {Object} appRegistry - The Hadron appRegisrty to activate this plugin with.
 **/
function activate(appRegistry) {
  // Register the WootPluginPlugin as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  appRegistry.registerRole('Instance.Tab', ROLE);
  appRegistry.registerAction('WootPlugin.Actions', WootPluginActions);
  appRegistry.registerStore('WootPlugin.Store', WootPluginStore);
  appRegistry.registerAction('WootPlugin.Actions',ApplyWootActions);
  appRegistry.registerStore('WootPlugin.Store',ApplyWootStore);
}

/**
 * Deactivate all the components in the Woot Plugin package.
 * @param {Object} appRegistry - The Hadron appRegisrty to deactivate this plugin with.
 **/
function deactivate(appRegistry) {
  appRegistry.deregisterRole('Instance.Tab', ROLE);
  appRegistry.deregisterAction('WootPlugin.Actions');
  appRegistry.deregisterStore('WootPlugin.Store');
}

export default WootPluginPlugin;
export { activate, deactivate };
