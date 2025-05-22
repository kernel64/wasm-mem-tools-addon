  const version = chrome.runtime.getManifest().version;
  const panelTitle = `WASM Memory Tools v${version}`;

chrome.devtools.panels.create(
  panelTitle,
  null,
  "src/panel.html",
  function(panel) {
    console.log("DevTools panel created");
  }
);
