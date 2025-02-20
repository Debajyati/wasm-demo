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

async function loadWASM(fileURL) {
  const wasmfileReq = new Request(fileURL);
  const wasmfileResponse = await fetch(wasmfileReq);

  if (!wasmfileResponse.ok) {
    throw new Error("Error: wasm file not found!");
  } else {
    const wasmfileArrayBuffer = await wasmfileResponse.arrayBuffer();
    const wasmModule = await WebAssembly.compile(wasmfileArrayBuffer);
    const wasmInstanceObject = await WebAssembly.instantiateStreaming(
      fetch(wasmfileReq),
      importObject,
    );
    return {
      wasmModule,
      wasmInstanceObject,
    };
  }
}

