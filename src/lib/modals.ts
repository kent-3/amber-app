import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

const loading: ModalSettings = {
  type: 'alert',
  title: 'Processing...',
  body: `
    <h3>Please wait<h3>
  `,
  buttonTextCancel: 'OK',
  modalClasses: '',
  backdropClasses: '',
};

export function setLoading() {
  modalStore.trigger(loading);
}

export function doneLoading() {
  modalStore.close();
}

