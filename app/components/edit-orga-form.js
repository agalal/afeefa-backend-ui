import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  orga: null,
  actions: {
    saveOrga: function() {
      const orga = this.get('orga');
      const orgaSave = orga.save();
      const annotations = orga.get('annotations').then((annotation) => {
        annotation.save();
      });
      const contactInfos = orga.get('contactInfos').then((contactInfo) => {
        contactInfo.save();
      });
      const locations = orga.get('locations').then((location) => {
        location.save();
      });
      const diff = RSVP.hash({
        orgaSave,
        annotations,
        contactInfos,
        locations,
      });
      diff.then((success)=>{
        history.back();
      });
    }
  }
});

