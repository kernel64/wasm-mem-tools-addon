try {
    if (typeof wasmMemory !== 'undefined' && wasmMemory instanceof WebAssembly.Memory) {
        window.memWrapper = new MemoryWrapper(wasmMemory.buffer);

        console.log("[WASM Memory Tools] WASM memory found and wrapper initialized.");
    } else {
        console.info("[WASM Memory Tools] No WASM memory found on this page.");
    }
} catch (error) {
    console.error("Erreur lors de l'accès à wasmMemory :", error);
}


