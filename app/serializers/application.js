import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize (snapshot) {
    let json = this._super(...arguments),
        changedAttributes = snapshot.changedAttributes(),
        attributes = {};
    Object.keys(changedAttributes).forEach(key => {
        attributes[this.keyForAttribute(key)] = changedAttributes[key][1];
    });
    json["data"]["attributes"] = attributes;
    //example: remove relationship from json:
    //delete json["data"]["relationships"];
    return json;
  },
  normalizeResponse (store, primaryModelClass, payload, id, requestType) {
    //console.log("normalize Response "+primaryModelClass+": ", payload);
    let result = this._super(...arguments);
    return result;
  },
  payloadKeyFromModelName(modelName) {
    //return plural model name: 'orga', 'event'
    let underscore = Ember.String.underscore(modelName);
    return Ember.String.pluralize(underscore);
  },
  keyForRelationship: function(key) {
    //return underscore keys for relationships
    return Ember.String.underscore(key);
  },
  keyForAttribute: function(key) {
    //return underscore keys for attributes
    return Ember.String.underscore(key);
  },
  keyForLink: function(key) {
    //return underscore keys for links
    return Ember.String.underscore(key);
  }
});
