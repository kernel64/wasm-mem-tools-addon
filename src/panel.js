document.addEventListener("DOMContentLoaded", function (event) {
  const msgErr = document.getElementById("msg-err");

  chrome.devtools.inspectedWindow.eval(
    "typeof wasmMemory !== 'undefined' && wasmMemory instanceof WebAssembly.Memory",
    function (result, exceptionInfo) {
      if (exceptionInfo) {
        msgErr.style.display = "block";
        document.querySelectorAll(".partition").forEach((el) => {
          el.style.display = "none";
        });
        return;
      }
      if (result) {
        msgErr.style.display = "none";
        document.querySelectorAll(".partition").forEach((el) => {
          el.style.display = "block";
        });
      } else {
        msgErr.style.display = "block";
        document.querySelectorAll(".partition").forEach((el) => {
          el.style.display = "none";
        });
      }
    }
  );

  function parseAddress(addrStr) {
    return addrStr.startsWith("0x") ? parseInt(addrStr, 16) : parseInt(addrStr);
  }

  document.getElementById("readMemoryBtn").onclick = () => {
    const addr = parseAddress(document.getElementById("readAddress").value);
    const typefunction = document.getElementById("readType").value;

    try {
      chrome.devtools.inspectedWindow.eval(
        `window.memWrapper.${typefunction}(${addr})`,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "readResult"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById(
              "readResult"
            ).textContent = `DEC: ${result}\nHEX: ${result.toString(
              16
            )}\nCHAR: ${String.fromCharCode(Number(result))}`;
          }
        }
      );
    } catch (e) {
      document.getElementById("readResult").textContent = `Error: ${e.message}`;
    }
  };

  document.getElementById("writeMemoryBtn").onclick = () => {
    const addr = parseAddress(document.getElementById("writeAddress").value);
    const typefunction = document.getElementById("writeType").value;
    const val = document.getElementById("writeValue").value;

    try {
      chrome.devtools.inspectedWindow.eval(
        `window.memWrapper.${typefunction}(${addr}, ${
          isNaN(val) ? val : Number(val)
        })`,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "writeResult"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById("writeResult").textContent = "Write done";
          }
        }
      );
    } catch (e) {
      document.getElementById("readResult").textContent = `Error: ${e.message}`;
    }
  };

  document.getElementById("readStringBtn").onclick = () => {
    const addr = parseAddress(document.getElementById("stringAddress").value);

    try {
      chrome.devtools.inspectedWindow.eval(
        `window.memWrapper.readString(${addr})`,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "stringOutput"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById("stringOutput").textContent = result;
          }
        }
      );
    } catch (e) {
      document.getElementById(
        "stringOutput"
      ).textContent = `Error: ${e.message}`;
    }
  };

  document.getElementById("writeStringBtn").onclick = () => {
    const addr = parseAddress(document.getElementById("stringAddress").value);
    const val = document.getElementById("stringValue").value;

    try {
      chrome.devtools.inspectedWindow.eval(
        `window.memWrapper.writeString(${addr}, '${val}')`,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "stringOutput"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById("stringOutput").textContent = "Write done";
          }
        }
      );
    } catch (e) {
      document.getElementById(
        "stringOutput"
      ).textContent = `Error: ${e.message}`;
    }
  };

  document.getElementById("copyMemoryBtn").onclick = () => {
    const src = parseAddress(document.getElementById("copySrc").value);
    const dst = parseAddress(document.getElementById("copyDst").value);
    const len = parseInt(document.getElementById("copyLen").value);

    try {
      chrome.devtools.inspectedWindow.eval(
        `window.memWrapper.writeBytes(${dst}, window.memWrapper.readBytes(${src}, ${len}))`,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "copyOutput"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById("copyOutput").textContent = "Copy done";
          }
        }
      );
    } catch (e) {
      document.getElementById("copyOutput").textContent = `Error: ${e.message}`;
    }
  };

  document.getElementById("searchMemoryBtn").onclick = () => {
    const value = document.getElementById("searchValue").value;
    const typefunction = document.getElementById("searchType").value;
    let result = [];

    let instruction;

    if (typefunction.startsWith("searchString")) {
      instruction = `window.memWrapper.${typefunction}('${value}')`;
    } else if (typefunction.includes("64")) {
      instruction = `window.memWrapper.${typefunction}(${BigInt(value)})`;
    } else {
      instruction = `window.memWrapper.${typefunction}(${Number(value)})`;
    }

    try {
      chrome.devtools.inspectedWindow.eval(
        instruction,
        (result, exceptionInfo) => {
          if (exceptionInfo) {
            document.getElementById(
              "searchOutput"
            ).textContent = `Error: ${exceptionInfo.value}`;
          } else {
            document.getElementById("searchOutput").textContent = result
              .map((a) => "0x" + a.toString(16) + "\t" + a)
              .join("\n");
          }
        }
      );
    } catch (e) {
      document.getElementById(
        "searchOutput"
      ).textContent = `Error: ${e.message}`;
    }
  };
});
