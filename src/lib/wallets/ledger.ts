import {
    fromBase64, fromBech32, fromHex, toBase64, toBech32, toHex,
  } from '@cosmjs/encoding'
import { sha256, stringToPath, type HdPath } from '@cosmjs/crypto'
// ledger
import TransportWebBLE from '@ledgerhq/hw-transport-web-ble'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import type Transport from '@ledgerhq/hw-transport'
import CosmosApp from 'ledger-cosmos-js'
import { LedgerSigner } from '@cosmjs/ledger-amino'
// import { ethToEvmos } from '@tharsis/address-converter'

import RIPEMD160 from 'ripemd160'

export function getLocalObject(name: string) {
  const text = localStorage.getItem(name)
  if (text) {
    return JSON.parse(text)
  }
  return null
}

export function getLocalChains() {
  return getLocalObject('chains')
}

export function getLocalAccounts() {
  return getLocalObject('accounts')
}

export function getLocalTxHistory() {
  return getLocalObject('txHistory')
}

export function setLocalTxHistory(tx) {
  const newTx = tx
  const txs = getLocalTxHistory()
  if (txs) {
    txs.push(newTx)
    return localStorage.setItem('txHistory', JSON.stringify(txs))
  }
  return localStorage.setItem('txHistory', JSON.stringify([newTx]))
}

export async function connectLedger(transport = 'usb') {
  const trans = transport === 'usb' ? await TransportWebUSB.request() : await TransportWebBLE.create()
  console.log(trans)
  return new CosmosApp(trans)
}

export function valoperToPrefix(valoper: string) {
  const prefixIndex = valoper.indexOf('valoper')
  if (prefixIndex === -1) return null
  return valoper.slice(0, prefixIndex)
}

export function operatorAddressToAccount(operAddress: string) {
  const { prefix, data } = fromBech32(operAddress)
  if (prefix === 'iva') { // handle special cases
    return toBech32('iaa', data)
  }
  if (prefix === 'crocncl') { // handle special cases
    return toBech32('cro', data)
  }
  return toBech32(prefix.replace('valoper', ''), data)
}

export function pubKeyToValcons(pubkey: any, prefix: string) {
  const addressData = sha256(fromBase64(pubkey.key)).slice(0, 20)
  return toBech32(`${prefix}valcons`, addressData)
}

export function toETHAddress(cosmosAddress: string) {
  return `0x${toHex(fromBech32(cosmosAddress).data)}`
}

export function addressDecode(address: string) {
  // if (address.startsWith('0x')) {
  //   return fromBech32(ethToEvmos(address))
  // }
  return fromBech32(address)
}

export function addressEnCode(prefix: string, pubkey: Uint8Array) {
  return toBech32(prefix, pubkey)
}

export function extractAccountNumberAndSequence(ret: any) {
  let { account } = ret
  if (account && account.base_vesting_account) { // vesting account
    account = account.base_vesting_account?.base_account
  } else if (account && account.base_account) { // evmos based account
    account = account.base_account
  }
  const accountNumber = account.account_number
  const sequence = account?.sequence || 0

  return {
    accountNumber,
    sequence,
  }
}

export function consensusPubkeyToHexAddress(consensusPubkey: any) {
  let raw = null
  if (typeof consensusPubkey === 'object') {
    if (consensusPubkey['@type'] === '/cosmos.crypto.ed25519.PubKey') {
      // raw = toBase64(fromHex(toHex(sha256(fromBase64(consensusPubkey.key))).slice(0, 40)))
      raw = toHex(sha256(fromBase64(consensusPubkey.key))).slice(0, 40).toUpperCase()
      return raw
    }
    // /cosmos.crypto.secp256k1.PubKey
    if (consensusPubkey['@type'] === '/cosmos.crypto.secp256k1.PubKey') {
      raw = new RIPEMD160().update(Buffer.from(sha256(fromBase64(consensusPubkey.key)))).digest('hex')
      return raw
    }
    if (consensusPubkey.type === 'tendermint/PubKeySecp256k1') {
      raw = new RIPEMD160().update(Buffer.from(sha256(fromBase64(consensusPubkey.value)))).digest('hex').toUpperCase()
      return raw
    }
    raw = sha256(fromBase64(consensusPubkey.value))
  } else {
    raw = sha256(fromHex(toHex(fromBech32(consensusPubkey).data).toUpperCase().replace('1624DE6420', '')))
  }
  const address = toHex(raw).slice(0, 40).toUpperCase()
  return address
}

function toSignAddress(addr: string) {
  const { data } = addressDecode(addr)
  return addressEnCode('cosmos', data)
}

function getHdPath(address: string) {
  let hdPath = "m/44'/118/0'/0/0"
  Object.values(getLocalAccounts()).forEach(item => {
    const curr = item.address.find(i => i.addr === address)
    if (curr && curr.hdpath) {
      hdPath = curr.hdpath
    }
  })
  //  m/0'/1/2'/2/1000000000
  return stringToPath(hdPath)
}

function isEvmosBasedChain(chainId: string) {
  const re = /[_]{1}[\d]{4}[\\-]{1}[\d]+$/g
  return re.test(chainId)
}
// TODO deal with signing later
// export async function sign(device, chainId, signerAddress, messages, fee, memo, signerData) {
//   const hdpath = getHdPath(signerAddress)
//   let client
//   if (device.startsWith('ledger')) {
//     client = await getSigningClient(device, hdpath)
//   } else {
//     if (!window.getOfflineSigner || !window.keplr) {
//       throw new Error('Please install keplr extension')
//     }
//     await window.keplr.enable(chainId)
//     if (isEvmosBasedChain(chainId)) {
//       const signer = window.getOfflineSigner(chainId)
//       client = await SigningKeplerEthermintClient.offline(signer)
//     } else {
//       const signer = window.getOfflineSignerOnlyAmino(chainId)
//       client = await SigningStargateClient.offline(signer)
//     }
//   }
//   const coinType = Number(hdpath[1])
//   const addr = device.startsWith('ledger') && coinType !== 60 ? toSignAddress(signerAddress) : signerAddress
//   return client.sign(addr, messages, fee, memo, signerData)
// }

// import address from ledger
async function getLedgerAppName(coinType: number, device: string | Transport, hdpath: HdPath) {
  let ledgerAppName = 'Cosmos'
  switch (coinType) {
    // case 60:
    //   return EthereumLedgerSigner.create(device, hdpath) // 'Ethereum'
    case 529:
      ledgerAppName = 'Secret' // 'Secret'
      break
    // case 852:
    //   ledgerAppName = 'Desmos' // 'Desmos'
    //   break
    // case 330:
    //   ledgerAppName = 'Terra' // 'Terra'
    //   break
    case 118:
    default:
  }
  console.log(ledgerAppName)
  const transport = await (device === 'ledgerBle' ? TransportWebBLE.create() : TransportWebUSB.create())
  console.log(hdpath)
  return new LedgerSigner(transport, { hdPaths: [hdpath], ledgerAppName, prefix: "secret" })
}

export async function getLedgerAddress(transport = 'blu', hdPath = "m/44'/529/0'/0/0") {
  const protocol = transport === 'usb' ? await TransportWebUSB.create() : await TransportWebBLE.create()
  // extract Cointype from from HDPath
  console.log(hdPath)
  const coinType = Number(stringToPath(hdPath)[1])
  console.log(coinType)
  const signer = await getLedgerAppName(coinType, protocol, stringToPath(hdPath))
  console.log(signer)
  return signer.getAccounts()
}
/// end import address from ledger