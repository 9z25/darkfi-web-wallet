/* tslint:disable */
/* eslint-disable */

export function build_transfer(secret_key: string, coin_json: string, recipient: string, amount: bigint, mint_zkbin_bytes: Uint8Array, burn_zkbin_bytes: Uint8Array): string;

export function build_transfer_with_fee(secret_key: string, coin_json: string, fee_coin_json: string, recipient: string, amount: bigint, required_fee: bigint, mint_zkbin_bytes: Uint8Array, burn_zkbin_bytes: Uint8Array, fee_zkbin_bytes: Uint8Array): string;

export function create_wallet(): any;

export function import_wallet(secret: string): any;

export function new_money_tree_base64(): string;

export function try_decrypt_raw_note(secret_key: string, encrypted_note_hex: string, coin_string: string): any;

export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly build_transfer: (a: number, b: number, c: number, d: number, e: number, f: number, g: bigint, h: number, i: number, j: number, k: number) => [number, number];
    readonly build_transfer_with_fee: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: bigint, j: bigint, k: number, l: number, m: number, n: number, o: number, p: number) => [number, number];
    readonly create_wallet: () => any;
    readonly import_wallet: (a: number, b: number) => any;
    readonly new_money_tree_base64: () => [number, number];
    readonly try_decrypt_raw_note: (a: number, b: number, c: number, d: number, e: number, f: number) => any;
    readonly version: () => [number, number];
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
