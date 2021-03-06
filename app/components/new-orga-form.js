import Ember from 'ember';
import RSVP from 'rsvp';

/*
 * mixins with function validateForm
 */
import FormValidatorMixin from '../mixins/form-validator';
import RouteHelper from '../mixins/route-helper';


export default Ember.Component.extend(FormValidatorMixin, RouteHelper, {
  store: Ember.inject.service(),
  locationInstance: null,
  annotationInstance: null,
  contactInfoInstance: null,
  newOrgaInstance: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const store = this.get('store');
    //init empty orga instance and set default values
    const orgaInstance = store.createRecord('orga');
    //set default valus
    this.set('newOrgaInstance', orgaInstance);
    //init empty contactInfo instance
    this.set('contactInfoInstance', store.createRecord('contactInfo'));
    //init empty localtion instance
    this.set('locationInstance', store.createRecord('location'));
    //init empty annotation instance
    this.set('annotationInstance', store.createRecord('annotation'));
  },
	actions: {
		save: function() {
      let store = this.get('store');

      let orga = this.get('newOrgaInstance');
      orga.save().then((savedOrga)=> {
        /*set contactable*/
        this.get('contactInfoInstance').set('contactable', savedOrga);
        this.get('locationInstance').set('locatable', savedOrga);
        this.get('annotationInstance').set('annotatable', savedOrga);
        const saveMeta = RSVP.hash({
          contact: this.get('contactInfoInstance').save(),
          location: this.get('locationInstance').save(),
          annotation: this.get('annotationInstance').save()
        });
        saveMeta.then((hash) => {
          history.back();
        });
      });
		},
    /*
     * Input type select for setting parent orga
     */
    selectParent: function(parentOrgaId) {
      let parentOrga = this.get('store').peekRecord('orga', parentOrgaId);
      this.get('newOrgaInstance').set('parentOrga', parentOrga);
    }
	}
});

