import { toastStore, type ToastSettings } from "@skeletonlabs/skeleton";
import type { TxResponse } from "secretjs";

export function responseToast(tx: TxResponse) {
  if (tx.code === 0) {
    const t: ToastSettings = {
      message: `
        <h4>Transaction Success 🥳</h4>
        <details class="text-sm">
            <summary>Details</summary>
            <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
            <dt class="opacity-50">Tx Hash:</dt>
            <a
              href="https://secretnodes.com/pulsar/transactions/${tx.transactionHash}"
              target="_blank"
              rel="noreferrer"
              class="!dark:text-success-500 !text-success-800"
            >
              <dd>View on block explorer</dd>
            </a>
            <dt class="opacity-50">Gas Used:</dt>
            <dd>${tx.gasUsed.toLocaleString()}</dd>
            </dl>
            </details>
        `,
      background: 'variant-glass-surface ring-2 ring-inset dark:ring-success-700 ring-success-700',
      autohide: false,
      classes: '-translate-y-4 font-semibold',
    };
    toastStore.trigger(t)
  } else {
    console.log(tx.rawLog)
    const t: ToastSettings = {
      message: `
            <h4>Transaction Failed</h4>
            <details class="text-sm">
                <summary>Details</summary>
                <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
                    <dt class="opacity-50">Raw Log:</dt>
                    <dd>${tx.rawLog}</dd>
                </dl>
            </details>
            `,
      background: 'variant-glass-surface ring-2 ring-inset ring-error-500',
      autohide: false,
      classes: '-translate-y-4 font-semibold',
    };
    toastStore.trigger(t)
  }
}

export function errorToast(error: any) {
  const t: ToastSettings = {
    message: `
    <h4>Something went wrong 🤔</h4>
    <details class="text-sm">
      <summary>Details</summary>
      <dl class="font-mono grid grid-cols-[5rem_minmax(0,_2fr)]">
        <dt class="opacity-50">Action:</dt>
        <dd>Execute</dd>
        <dt class="opacity-50">Message:</dt>
        <dd class="text-error-700 dark:text-error-500">${error.message}</dd>
      </dl>
    </details>
    `,
    background: 'variant-glass-surface ring-2 ring-inset ring-secondary-500',
    autohide: false,
    classes: '-translate-y-4 font-semibold',
  };
  toastStore.trigger(t)
}