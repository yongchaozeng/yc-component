import { isString, judgeClient } from "./utils";

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

  dom.setAttribute("class", "m-message-container message-info");

  if (judgeClient() === "PC") {
    dom.setAttribute("class", "m-message-container pc-message-container message-info");
  }

  dom.innerHTML = `<div class="text">${msg}</div>`;
  document.body.appendChild(dom);
  doms = document.querySelectorAll(".message-info");
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
    // dom.style.top = `${height}px`;
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
