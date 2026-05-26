import init, {
  build_transfer_with_fee
} from "./pkg/darkfi_wasm.js";

let wasmReady = null;

async function ensureWasmReady() {
  if (!wasmReady) {
    wasmReady = init();
  }

  await wasmReady;
}

self.onmessage = async event => {
  const { id, task, payload } = event.data || {};

  try {
    await ensureWasmReady();

    if (task === "build_transfer_with_fee") {
      const tx = build_transfer_with_fee(
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
      error: err?.stack || err?.message || String(err)
    });
  }
};
