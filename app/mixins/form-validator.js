import Ember from 'ember';

/*
 * Mixin that allows form vaildation across all components in the app
 */
export default Ember.Mixin.create({
  validateForm: function(inputs) {
    for(let form of inputs) {
      let value = this.get(form);
      if(!value || value.length===0) {
        Materialize.toast('Der Input "'+form+'" darf nicht leer sein.', 10000);
        return false;
      }
    }
    return true;
  }
});
