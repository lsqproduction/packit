import chromeService from "../../services/chromeService";
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
