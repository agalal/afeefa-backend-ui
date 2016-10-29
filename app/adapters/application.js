import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  session: Ember.inject.service('session'),
	namespace: 'api/v1',
	authorizer: 'authorizer:devise',
  /*
   * Debug helper: print URL for every API requst running through this adapter
   */
  buildURL: function() {
    let url = this._super(...arguments);
    console.log("make API request to: "+url);
    return url;
  },
  pathForType(modelName) {
    //dasherize URL
    let dasherize = Ember.String.dasherize(modelName);
    return Ember.String.pluralize(dasherize);
  },
  urlForRequest(params) {
    let url = this._super(...arguments);
    console.log("urlForRequest: "+url);
    return url;
  },
  handleResponse: function(status, headers) {
    //new token from API is present: update session
    if(headers && headers['access-token']) {
      this.get('session').set('data.authenticated.accessToken', headers['access-token']);
      this.get('session').set('data.authenticated.expiry', headers['expiry']);
      this.get('session').set('data.authenticated.client', headers['client']);
    }
    return this._super(...arguments);
  }
});
