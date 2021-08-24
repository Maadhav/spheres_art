import React, { Suspense } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NFTCard.css'
import BigNumber from 'bignumber.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import IPFS from 'ipfs-core/src/components'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';

const NFTCard = ({ sphere }) => {
    const location = useLocation()
    const history = useHistory()
    const loader = new GLTFLoader();
    // console.log(sphere.imageData.scene)
    const [ipfsCid, ipfsName] = sphere.image.split('ipfs://')[1].split('/')
    return (
        <div className="container" onClick={() => { history.push((location.pathname == "/" ? "" : location.pathname) + `/item/${sphere.token_id}`) }}>
            <Canvas className="image-container" style={{height: "230px", width: "auto"}}>
                <Suspense fallback={null}>
                    <Model ipfs={`https://${ipfsCid}.ipfs.dweb.link/${ipfsName}`}/>
                </Suspense>
            </Canvas>
            <div className="title-style">{sphere.name}</div>
            <div className="price-style"><span style={{ fontWeight: "600" }}>{(sphere.price / 1000000).toFixed(2)}</span> XTZ</div>
        </div>
    )
}

const Model = ({ ipfs }) => {
    const model = useLoader(
        GLTFLoader,
        ipfs
    )

    // Here's the animation part
    // ************************* 
    let mixer
    if (model.animations.length) {
        mixer = new THREE.AnimationMixer(model.scene);
        model.animations.forEach(clip => {
            const action = mixer.clipAction(clip)
            action.play();
        });
    }

    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    // *************************

    model.scene.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.side = THREE.FrontSide
        }
    })
    return (
        <>
            <primitive object={model.scene} />
        </>
    );
};

export default NFTCard
