import '../../assets/img/logo16.png';
import '../../assets/img/logo48.png';
import '../../assets/img/logo128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
});

console.log('chrome.storage', chrome.storage);
console.log('session', document.cookie);

var getCookie = function (cname) {
  console.log('running');
  console.log('document.cookie', document.cookie);
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

console.log('cookie', getCookie('user'));
