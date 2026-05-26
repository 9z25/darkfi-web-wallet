import init, {
    version,
    create_wallet,
    import_wallet,
    try_decrypt_raw_note
} from "./pkg/darkfi_wasm.js";

await init();

let savedSecret = localStorage.getItem("darkfi_secret_key");
let wallet;

if (savedSecret) {
  wallet = import_wallet(savedSecret);
} else {
  wallet = create_wallet();
  localStorage.setItem("darkfi_secret_key", wallet.secret_key);
}

document.getElementById("out").textContent = JSON.stringify({
  version: version(),
  wallet,
  saved: Boolean(savedSecret)
}, null, 2);

