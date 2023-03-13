import { dev } from '$app/environment'
import type { PageLoad } from './$types';
import type { SecretAddress, Token } from '$lib/tokens'
import { tokenList } from '$lib/tokens'
import { tokenStore } from '$lib/stores'

export const csr = dev
export const prerender = true

export const load = (async () => {
    //   setLoading(true);
    const tokens = new Map<SecretAddress, Token>()
    const test = "hello"
    for (const token of tokenList) {
        if (token.address in tokens) {
            console.error(`Duplicate tokens ${token} and ${tokens.get(token.address)}`)
        }
        tokens.set(token.address, token)
    }
    tokenStore.set(tokens)
    //   setLoading(false);
    return {test};
}) satisfies PageLoad;