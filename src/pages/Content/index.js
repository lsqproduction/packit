import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// let images = document.getElementsByTagName('img')
//  access the image url from the img tag
// }

//right click to get img url
//use img url to do post request

// Unique ID for the className.
var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';

// Previous dom, that we want to track, so we can remove the previous styling.
var prevDOM = null;

// Mouse listener for any move event on the current document.

document.addEventListener(
  'mousemove',
  function (e) {
    let srcTarget = e.target;

    // Lets check if our underlying element is a IMG.
    if (prevDOM !== srcTarget && srcTarget.nodeName === 'IMG') {
      // For NPE checking, we check safely. We need to remove the class name
      // Since we will be styling the new one after.
      if (prevDOM !== null) {
        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
      }

      // Add a visited class name to the element. So we can style it.
      srcTarget.classList.add(MOUSE_VISITED_CLASSNAME);
      console.log(srcTarget);
      //send srcTarget to popup.js

      // The current element is now the previous. So we can remove the class
      // during the next ieration.
      prevDOM = srcTarget;
    }
  },
  false
);
