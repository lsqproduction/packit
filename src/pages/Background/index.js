import '../../assets/img/logo16.png';
import '../../assets/img/logo48.png';
import '../../assets/img/logo128.png';
import chromeService from "../../services/chromeService";


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


/**
 * Main extension functionality
 *
 * @class Main
 */

class Main {
  constructor() {
    this.ctxMenuId = null;
  }
  init = async () => {
    this.initContextMenu();
  };
  /**
   * Context menu option initialization
   *
   * @method
   * @memberof Main
   */
  initContextMenu = () => {
    console.log({ ctx: chrome.contextMenus });
    if (this.ctxMenuId) return;
    this.ctxMenuId = chromeService.createContextMenu({
      title: "Add this image",
      contexts: ["image"],
      onclick: this.onContextMenuClick
    });
  };
  /**
   * Context menu click handler
   *
   * @method
   * @memberof Main
   */
  onContextMenuClick = (info, tab) => {
    const { srcUrl } = info;
    chromeService.openHelpPage(encodeURIComponent(srcUrl));
  };
};

const main = new Main();
main.init().catch(e => {
  console.log("Error loading extension", { e });
});
