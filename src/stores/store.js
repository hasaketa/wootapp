import Reflux from 'reflux';
import StateMixin from 'reflux-state-mixin';
import WootPluginActions from 'actions';



const APP_ID = "wootapp-xdann"
const MONGO_SERVICE_NAME = 'mongodb-atlas'
const DB_NAME = "wootdb"
const WOOT_COLLECTION = "wootdoc"

const stitch = require("mongodb-stitch");
const client = new stitch.StitchClient(APP_ID);
const db = client.service('mongodb', MONGO_SERVICE_NAME).db(DB_NAME);

const debug = require('debug')('mongodb-compass:stores:woot-plugin');

const loginfalsestate_stitchconnected = {
  status: 'disabled',
  username: null,
  sitchconnectionerror: false,
};
//Initial state should containt all the state values used in plugin
const initialState = {
  status: 'disabled',
  username: null,
  sitchconnectionerror: true,
  wootproject: ['mtools','skunkworks','Colonizer'],
  selectedproject: 'skunkworks',

};

/**
 * Woot Plugin store.
 */
const WootPluginStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   *
   * If you call `this.setState({...})` this will cause the store to trigger
   * and push down its state as props to connected components.
   */
  mixins: [StateMixin.store],

  /**
   * listen to all actions defined in ../actions/index.js
   */
  listenables: WootPluginActions,

  /**
   * Initialize everything that is not part of the store's state. This happens
   * when the store is required and instantiated. Stores are singletons.
   */
  init() {
  },

  /**
   * This method is called when all plugins are activated. You can register
   * listeners to other plugins' stores here, e.g.
   *
   * appRegistry.getStore('OtherPlugin.Store').listen(this.otherStoreChanged.bind(this));
   *
   * If this plugin does not depend on other stores, you can delete the method.
   *
   * @param {Object} appRegistry - app registry containing all stores and components
   */
  // eslint-disable-next-line no-unused-vars
  onActivated(appRegistry) {
    // Events emitted from the app registry:
    //
     appRegistry.on('application-intialized', (version) => {
       // Version is string in semver format, ex: "1.10.0"
       console.log('WOOTSTORE activated lets regist applywoot store');

     });

    //
    // appRegistry.on('data-service-intialized', (dataService) => {
    //   // dataService is not yet connected. Can subscribe to events.
    //   // DataService API: https://github.com/mongodb-js/data-service/blob/master/lib/data-service.js
    // });
    //
    // appRegistry.on('data-service-connected', (error, dataService) => {
    //   // dataService is connected or errored.
    //   // DataService API: https://github.com/mongodb-js/data-service/blob/master/lib/data-service.js
    // });
    //
    // appRegistry.on('collection-changed', (namespace) => {
    //   // The collection has changed - provides the current namespace.
    //   // Namespace format: 'database.collection';
    //   // Collection selected: 'database.collection';
    //   // Database selected: 'database';
    //   // Instance selected: '';
    // });
    //
    // appRegistry.on('database-changed', (namespace) => {
    //   // The database has changed.
    //   // Namespace format: 'database.collection';
    //   // Collection selected: 'database.collection';
    //   // Database selected: 'database';
    //   // Instance selected: '';
    // });
    //
    // appRegistry.on('query-applied', (queryState) => {
    //   // The query has changed and the user has clicked "filter" or "reset".
    //   // queryState format example:
    //   //   {
    //   //     filter: { name: 'testing' },
    //   //     project: { name: 1 },
    //   //     sort: { name: -1 },
    //   //     skip: 0,
    //   //     limit: 20,
    //   //     ns: 'database.collection'
    //   //   }
    // });
  },

  /**
   * Initialize the Woot Plugin store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    //initially not logged in
    return initialState;
  },

  /**
   * handlers for each action defined in ../actions/index.jsx, for example:
   */
  loginToWoot() {
    //Do Something to Login to WOOT. Login code should return status: 'enabled' on login
    //Fetch client data and update the state
    console.log("loginToWoot: Starting Login")
    client.login().then(() =>
        db.collection(WOOT_COLLECTION).updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
    ).then(() =>
       db.collection(WOOT_COLLECTION).find({owner_id: client.authedId()})
    ).then(docs => {
        var userid = docs.slice()[0].owner_id
        console.log("Found owner_id", docs)
        console.log("loginToWoot: [MongoDB Stitch] Connected to Stitch")
        this.setState({
          status: 'enabled',
          username: userid,
          wootproject: ['mtools','skunkworks','Colonizer'],
          selectedproject: 'skunkworks',
          sitchconnectionerror: false
       });
     }).catch(err => {
    console.error('loginToWoot: StitchError',err)
    this.setState({
      status: 'disabled',
      username: null,
      sitchconnectionerror: true
     });
   });
},

  logoutWoot() {
    this.setState({
      status: 'disabled',
      username: null,
      selectedproject: 'projectfromApplyWoot'
    });
  },

  SubmitWootForm() {
    console.log('FormSubmitted: Project selected is ', selection);
    db.collection(WOOT_COLLECTION).insert([{ selectedproject: selection, owner_id: client.authedId()}]
  ).then(() => {
      this.setState({
        status: 'disabled',
        username: null,
        sitchconnectionerror: false
      });
    });

  },

  onSelectProject(selection) {
    console.log('storeonSelectProject: Project selected setting selected project to', selection);
    this.setState({
      selectedproject: selection
    });
  },



  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate(prevState) {
    debug('WootPlugin store changed from', prevState, 'to', this.state);
    console.log('Main STORE GOT UPDATED!!');

  }


});

export default WootPluginStore;
export { WootPluginStore };
