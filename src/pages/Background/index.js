import '../../assets/img/logo16.png';
import '../../assets/img/logo48.png';
import '../../assets/img/logo128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

//get user info from the chrome.cookies
//this info will persist for all pages

const getUserCookie = () => {
  return new Promise((resolve, reject) => {
    const cookieDetails = {
      url: 'https://angora.techpacker.io',
      name: 'user',
    };
    chrome.cookies.get(cookieDetails, (cookie) => {
      // chrome.cookies.get takes callback as 2nd parameter
      // when callback returns we resolve
      resolve(cookie);
    });
  });
};

const getUserInfo = async () => {
  let userInfo;
  // getUserCookie returns a Promise
  // so using await to wait for it to return
  const userCookie = await getUserCookie();
  if (userCookie) {
    // decode cookie value using decodeURIComponent
    userInfo = decodeURIComponent(userCookie.value);
    // user info returns string, need to parse into json
    userInfo = JSON.parse(userInfo);
  } else {
    console.log('Check if you are logged in');
  }
  return userInfo;
};

// get userId and userEmail

getUserInfo().then((userInfo) => {
  let userId = userInfo.id;

  let fullName = userInfo.fullName;

  window.localStorage.setItem('userId', userId);

  window.localStorage.setItem('fullName', fullName);
});
