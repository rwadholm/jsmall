// jSmall: jQuery-like functions, © 2019 Bob Wadholm, MIT License
const $ = (function(selector){

  let el = [selector]
  if (typeof selector === 'string'){
    /** jQuery-like Selectors
    * :scope forces JS to listen to all selectors after it */
    el = document.querySelectorAll(':scope '+ selector)
  }

  /** jQuery-like append & prepend functions
  * argument accepts html or text as a string */
  append = el.append
  el.append = function(html){
    el.forEach(function(item){
      appender(item, html)
    })

    function appender(el, html){
      const newHTML = document.createElement('div')
      newHTML.innerHTML = html
      el.appendChild(newHTML)
      const parent = newHTML.parentNode
      while (newHTML.firstChild) parent.insertBefore(newHTML.firstChild, newHTML)
      parent.removeChild(newHTML)
    }
  }

  prepend = el.prepend
  el.prepend = (html) => {
    el.forEach(item => {
      prepender(item, html)
    })

    function prepender(el, html) {
      const newHTML = document.createElement('div')
      newHTML.innerHTML = html
      el.insertBefore(newHTML, el.firstChild);
    }
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
  };

  /** jQuery-like class functions */
  el.addClass = function(className){
    el.forEach((item) => {
      item.classList.add(className)
    })
  }

  el.removeClass = function(className){
    el.forEach((item) => {
      item.classList.remove(className)
    })
  }

  el.toggleClass = function(className){
    el.forEach((item) => {
      if(item.classList.contains(className)){
        item.classList.remove(className)
      } else {
        item.classList.add(className)
      }
    })
  }

  //remove = el.remove
  el.remove = function(){
    el.forEach((item) => {
      const parent = item.parentNode
      parent.removeChild(item)
    })
  }

  el.attr = function(attrName, prop = false){
    if(prop){
      el.forEach((item) => {
        item.setAttribute(attrName, prop)
      })
    } else {
      return document.querySelector(':scope '+ selector).getAttribute(attrName)
    }
  }

  return el;
})
