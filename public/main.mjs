import memoryModuleFactory from "./memory.js";
import { readFile } from "node:fs/promises";

const importObject = {
  a: {
    a: function(arg) {
      console.log('Function a.a called with argument:', arg);
      return arg; // Adjust this logic based on what the function is supposed to do
    }
  },
  env: {
    memory: new WebAssembly.Memory({ initial: 258, maximum: 258 }),
    table: new WebAssembly.Table({ initial: 1, element: 'anyfunc' }),
    // Define other necessary imports if required
  }
};

const wasmBuffer = await readFile("./memory.wasm");
const wasmInstanceObject = await WebAssembly.instantiate(wasmBuffer, importObject);


const example = async () => {
  const memoryModule = await memoryModuleFactory();
  const wasmMemory = wasmInstanceObject.instance.exports.b;

  const malloc = memoryModule.cwrap('my_malloc', 'number', ['number']);
  const free = memoryModule.cwrap('my_free', null, ['number']);
  // Allocate memory
  const size = 1024; // Size in bytes
  const ptr = malloc(size);
  console.log(`Allocated ${size} bytes at address ${ptr}`);

  // Use the allocated memory (example: write to it)
  const memory = new Uint8Array(wasmMemory.buffer, ptr, size);
  memory[0] = 42; // Example: setting the first byte to 42

  // Free the allocated memory
  free(ptr);
  console.log(`Freed memory at address ${ptr}`);
};

example();
