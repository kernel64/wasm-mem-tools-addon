chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (typeof tab.url !== "undefined" && tab.url !== null && typeof memoryWrapper === "undefined") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        world: "MAIN",
        files: ["lib/WASMToolkit/memoryWrapper.js", "src/content.js"],
      });
    }
  }
});
