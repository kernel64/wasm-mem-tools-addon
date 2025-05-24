# WASM Memory Tools

A Chrome extension to inspect and manipulate WebAssembly memory at runtime. Read, view, and copy memory values to assist in reverse engineering

## What is it?

**WASM Memory Tools** is a developer tool that lets you view, read, write, and search through a WASM module’s memory in real time using a clean, interactive DevTools panel. It's built for reverse engineers, cybersecurity researchers, and WebAssembly developers.

## Features

- ✅ Read and write all major data types (Int8, Int16, Int32, Int64, Float32, Float64)
- ✅ Read and write strings and byte arrays
- ✅ Search memory for values or strings
- ✅ View memory contents as:
  - Decimal
  - Hexadecimal
  - Character
- ✅ Easy-to-use DevTools panel
- ✅ Injected memory wrapper class (`MemoryWrapper`) accessible from the console
- ✅ Works on all pages running WebAssembly modules

## How It Works

The extension injects a helper class (`MemoryWrapper`) into every page that uses WebAssembly. This class simplifies reading and writing directly to the WASM memory buffer.

Once the page loads, open your browser DevTools and go to the **"WASM Memory tools"** tab to explore and manipulate memory.

## UI Overview

> ![WASM Memory Tools screenshot.](https://mabslabs.com/images/wasm_memory_tools.png)


The DevTools panel provides:
- Input fields to read/write memory at specific addresses
- Buttons to search values or strings
- A display of the result in decimal, hexadecimal, and ASCII

## Installation

1. Download the extension from:
   - [Chrome Web Store](#) *(coming soon)*
   - [Firefox Add-ons](#) *(coming soon)*
2. Or install manually for development:
   - Clone this repo
   - Open `chrome://extensions/` in your browser
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the project folder

## Acknowledgments

This extension integrates the excellent [WASMToolkit](https://github.com/ExcelliumSA/WASMToolkit) library by **Excellium SA**, which provides the core memory manipulation functions.  
Special thanks to their team for open-sourcing such a solid foundation.

## Author

Made by [mabslabs.com](https://mabslabs.com)  
GitHub: [https://github.com/kernel64](https://github.com/kernel64)

## License

Licensed under the MIT License.

