import IPFS from 'ipfs-core'
import {TextDecoder} from 'text-encoding'
const node = IPFS.create()

export default async function getIPFSData(ipfs) {
    const stream = (await node).cat(ipfs)
    let data = ''

    for await (const chunk of stream) {
        data += new TextDecoder().decode(chunk)
    }
    return data;
}