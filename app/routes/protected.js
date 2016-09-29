import Ember from 'ember';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model() {
    return RSVP.hash({
      user: this.store.findRecord('user', this.get('session.currentUser')),
      events: this.store.findAll('event')
    });
  }
});