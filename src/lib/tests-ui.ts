import { chains } from './config'
import { toHex, SecretNetworkClient } from 'secretjs';
// import { keccak256 } from '@cosmjs/crypto';
import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

const SECRET_CHAIN_ID = chains['Secret Network'].chain_id
const SECRET_LCD = chains['Secret Network'].lcd
const secretjs = new SecretNetworkClient({
    url: "https://lcd.secret.express",
    chainId: "secret-4"
});

export function testToasts() {
    const t: ToastSettings = {
        message: `
        <h4>Transaction Success 🥳</h4>
        <details class="text-sm">
            <summary>Details</summary>
            <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
                <dt class="opacity-50">Tx Hash:</dt>
                <a
                    href="https://www.mintscan.io/secret/txs/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <dd>View on block explorer</dd>
                </a>
                <dt class="opacity-50">Fee:</dt>
                <dd>0.000625 SCRT</dd>
                <dt class="opacity-50">Gas Used:</dt>
                <dd>35,458</dd>
            </dl>
            </details>
        `,
        background: 'variant-glass-surface !bg-success-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-success-800',
        autohide: false,
        classes: '-translate-y-4 font-semibold'
    };
    toastStore.trigger(t)

    const t2: ToastSettings = {
        message: `
            <h4>Something went wrong 🤔</h4>
            <details class="text-sm">
                <summary>Details</summary>
                <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
                    <dt class="opacity-50">Action:</dt>
                    <dd>Create Viewing Key</dd>
                    <dt class="opacity-50">Message:</dt>
                    <dd class="text-error-500">No wallet connected</dd>
                </dl>
            </details>
        `,
        background: 'variant-glass-surface !bg-primary-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-primary-800',
        autohide: false,
        classes: '-translate-y-4 font-semibold'
    };
    toastStore.trigger(t2)

    const t3: ToastSettings = {
        message: `
            <h4>Transaction Failed 😩</h4>
            <details class="text-sm">
                <summary>Details</summary>
                <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
                    <dt class="opacity-50">Raw Log:</dt>
                    <dd class="text-error-500">MetaMask Message Signature: User denied message signature.</dd>
                </dl>
            </details>
            `,
        background: 'variant-glass-surface !bg-error-900 !bg-opacity-50 sm:!bg-opacity-30 ring-2 ring-inset ring-error-800',
        autohide: false,
        classes: '-translate-y-4 font-semibold'
    };
    toastStore.trigger(t3)
}
