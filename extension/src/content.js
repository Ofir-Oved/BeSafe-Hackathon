const s = document.createElement("script");
s.src = chrome.runtime.getURL("overlay.js");
document.documentElement.appendChild(s);
console.log("🟢 Safety Scanner content script loaded");
