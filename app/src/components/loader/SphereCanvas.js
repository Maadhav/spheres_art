import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
const SphereCanvas = () => {
    return (
        <Canvas style={{width: "150px", height: "150px"}} gl={{ antialias: true }} dpr={4}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Sphere position={[0, 0, 0]} />
        </Canvas>
    )
}


function Sphere(props) {
    const ref = useRef()
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))
    return (
        <mesh
            {...props}
            ref={ref}
            scale={3}>
            <sphereGeometry args={[1, 32]} />
            <meshStandardMaterial color={'#da18a3'} wireframe={true} />
        </mesh>
    )
}



export default SphereCanvas
