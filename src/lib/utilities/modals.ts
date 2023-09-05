import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";

const modal_store = getModalStore()

export const modals = {
    confirm: (settings: ModalSettings) => new Promise<boolean>((resolve) => {
       modal_store.trigger({...settings, response: (r: boolean) => resolve(r)});
    }),
}