// jSmaller © 2023 Bob Wadholm, MIT License
const $ = (function(selector){

  let el = [selector]
  if (typeof selector === 'string'){
    /** jQuery-like Selectors
    * :scope forces JS to listen to all selectors after it */
    el = document.querySelectorAll(':scope '+ selector)
  }  

  /** jQuery-like on event function for dynamically added elements*/
  el.on = function(ev, element, callback){
    // If no second argument, provide one
    if(typeof element === 'function'){
      el = document.querySelectorAll('body')
      callback = element
      element = selector
    }

    el.forEach(function(el){
        addEvent(ev, element, callback, el)
    })

    function addEvent(ev,element,callback,el){
      // Add the event listeners to the designated static parent(s)
      el.addEventListener(ev, function(currentEv){
        for (i = 0; i < (currentEv.path.length - 3); i++) {
        // If matching element(s) (even dynamically added ones or parent elements of the one clicked)
          if(currentEv.path[i].matches(element)){
            // Perform the callback and pass the current element as the default
            callback.call(currentEv.srcElement,currentEv)
            i = currentEv.path.length // escape from for loop
          }
        }
      })
    }
  }  

  return el;
})
