import { browser } from "$app/environment";
import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";


export const modals = {
    confirm: (settings: ModalSettings) => new Promise<boolean>((resolve) => {
        if (!browser) return
       getModalStore().trigger({...settings, response: (r: boolean) => resolve(r)});
    }),
}