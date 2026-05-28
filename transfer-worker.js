let wasmReady = null;
let wasmModule = null;

function formatWorkerError(err) {
  if (!err) {
    return "Unknown transfer worker error";
  }

  return err?.stack || err?.message || String(err);
}

globalThis.addEventListener("error", event => {
  console.error("transfer worker uncaught error", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: formatWorkerError(event.error)
  });
});

globalThis.addEventListener("unhandledrejection", event => {
  console.error("transfer worker unhandled rejection", formatWorkerError(event.reason));
});

async function ensureWasmReady() {
  if (!wasmReady) {
    wasmReady = (async () => {
      wasmModule = await import("./pkg/darkfi_wasm.js");
      await wasmModule.default();
      return wasmModule;
    })();
  }

  return await wasmReady;
}

self.onmessage = async event => {
  const { id, task, payload } = event.data || {};

  try {
    const wasm = await ensureWasmReady();

    if (task === "ping") {
      self.postMessage({ id, ok: true, result: "pong" });
      return;
    }

    if (task === "build_transfer_with_fee") {
      const tx = wasm.build_transfer_with_fee(
        payload.secret,
        payload.coinJson,
        payload.feeCoinJson,
        payload.recipient,
        payload.amount,
        payload.fee,
        payload.mintZkbin,
        payload.burnZkbin,
        payload.feeZkbin
      );

      self.postMessage({ id, ok: true, result: tx });
      return;
    }

    throw new Error(`Unknown transfer worker task: ${task}`);
  } catch (err) {
    self.postMessage({
      id,
      ok: false,
      error: formatWorkerError(err)
    });
  }
};
