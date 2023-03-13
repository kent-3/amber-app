export function compactAddress(longAddress: string): string {
	const shortAddress = longAddress.substring(0, 6) + '...' + longAddress.substring(39)
	return shortAddress
}
