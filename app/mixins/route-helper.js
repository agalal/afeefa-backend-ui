import Ember from 'ember';

export default Ember.Mixin.create({
    actions: {
      goBack: function() {
        history.back();
      }
    }
});
