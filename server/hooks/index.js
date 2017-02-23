'use strict';

// Add any common hooks you want to share across services in here.
//
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

module.exports.myHook = function(options) {
  return function(hook) {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};
module.exports.userInGroup=function(options){
    return function(hook){
       if(options && hook.params.user.group !== options) {
           throw new Error('User not in group '+ options);
       }
    }
    
}
