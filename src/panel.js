document.addEventListener("DOMContentLoaded", function (event) {

  const mainContent = document.getElementById("main-content");
  const msgErr = document.getElementById("msg-err");

    chrome.devtools.inspectedWindow.eval(
    "typeof wasmMemory !== 'undefined' && wasmMemory instanceof WebAssembly.Memory",
    function (result, exceptionInfo) {
      if (exceptionInfo) {
        mainContent.style.display = "none";
        msgErr.style.display = "block";
        return;
      }

      if (result) {
        msgErr.style.display = "none";
        mainContent.style.display = "block";
      } else {
        mainContent.style.display = "none";
        msgErr.style.display = "block";
      }
    }
  );



  document.getElementById("btn-write").onclick = () => {

    const addrRead = parseInt(document.getElementById("addr").value);
    const len = parseInt(document.getElementById("length").value);
    const addrWrite = parseInt(document.getElementById("w-addr").value);

    console.log("Copy data from " + addrRead +" to memory " + addrWrite);
    chrome.devtools.inspectedWindow.eval(
      `window.memWrapper.writeBytes(${addrWrite}, window.memWrapper.readBytes(${addrRead}, ${len}))`,
      (result, exceptionInfo) => {
        if (exceptionInfo) {
          document.getElementById(
            "output"
          ).textContent = `Error: ${exceptionInfo.value}`;
        } else {
          document.getElementById("output").textContent = "";
        }
      }
    );
  };

  document.getElementById("btn-read").onclick = () => {
    const addr = parseInt(document.getElementById("addr").value);
    const len = parseInt(document.getElementById("length").value);
    console.log("reading memory from " + addr);
    chrome.devtools.inspectedWindow.eval(
      `window.memWrapper.readBytes(${addr}, ${len})`,
      (result, exceptionInfo) => {
        if (exceptionInfo) {
          document.getElementById(
            "output"
          ).textContent = `Error: ${exceptionInfo.value}`;
        } else {
          const padded = result.map((v) => {
            const dec = v.toString().padStart(3, " ");
            const hex = (v.toString(16).toUpperCase()).padStart(3, " ");
            const char = v >= 32 && v <= 126 ? String.fromCharCode(v) : ".";
            return { dec, hex, char };
          });

          const decLine = "[DEC]  " + padded.map((p) => p.dec).join(" ");
          const hexLine = "[HEX]  " + padded.map((p) => p.hex).join(" ");
          const charLine =
            "[CHAR] " + padded.map((p) => "  " + p.char).join(" ");

          document.getElementById("output").textContent =
            decLine + "\n" + hexLine + "\n" + charLine;
        }
      }
    );
  };
});
