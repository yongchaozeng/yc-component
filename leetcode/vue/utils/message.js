import { isString } from "./utils";

const $msg = (msg, options = {}) => {
  let doms = null,
    height = 0;
  const dom = document.createElement("div");

  if (isString(options)) {
    let oldOptions = options;
    options = {
      type: oldOptions
    };
  }

  dom.setAttribute("class", "pc-message-container pc-message-info");
  if (options.type === "succeed") {
    dom.setAttribute("class", "pc-message-container pc-message-succeed");
  }
  if (options.type === "error") {
    dom.setAttribute("class", "pc-message-container pc-message-error");
  }
  dom.innerHTML = `<div class="text">${msg}</div>`;
  document.body.appendChild(dom);
  doms = document.querySelectorAll(".pc-message-container");
  if (doms) {
    height = Array.from(doms)
      .map((item, index, array) => {
        return item.clientHeight;
      })
      .reduce((prev, cur, index) => {
        return prev;
      });
  }
  clearDestroy(dom, height);
};

function clearDestroy(dom, height) {
  setTimeout(() => {
    dom.style.top = `${height}px`;
    dom.style.opacity = "1";
  }, 0);
  setTimeout(() => {
    if (dom.remove) {
      dom.remove();
    } else {
      dom.removeNode(true);
    }
  }, 3000);
}

export default $msg;
