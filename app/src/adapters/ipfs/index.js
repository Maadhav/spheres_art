import IPFS from 'ipfs-core'

const node = IPFS.create()

export default async function getIPFSData(ipfs) {
    const stream = (await node).cat(ipfs)
    let data = ''

    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }
    return data;
}