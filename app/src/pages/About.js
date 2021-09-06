import React, { useRef, useState } from 'react'
import LinedButton from '../components/button/LinedButton'
import SolidButton from '../components/button/SolidButton'
import * as THREE from 'three'
import './About.css'
import { Canvas, } from '@react-three/fiber'
import { Sphere, OrbitControls, MeshDistortMaterial, MeshWobbleMaterial, CameraShake, OrthographicCamera } from '@react-three/drei'
import { Link } from 'react-router-dom'
import preview from '../assets/editor_preview.png'
import videoPreview from '../assets/spherearteditor.mp4'



const About = () => {
    const [distort, setdistort] = useState(0)
    return (
        <>
            <div style={{ height: "680px", position: "absolute", zIndex: "1", top: "0", width: "100%", left: "0", }}>
                <Canvas dpr={3}>
                    <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={40} />
                    <CameraShake makeDefault maxYaw={0.1}
                        key={distort}
                        maxPitch={0.1}
                        maxRoll={0.1}
                        yawFrequency={1}
                        pitchFrequency={1}
                        rollFrequency={1}
                        intensity={distort}
                        decay={false}
                        decayRate={0.65} />
                    <group position={[10, 0, -10]} onPointerEnter={() => { console.log('Pointer'); setdistort(0.9) }} onPointerLeave={() => { console.log('Pointer --'); setdistort(0) }}>
                        <mesh
                            visible // object gets render if true
                            userData={{ test: "hello" }} // An object that can be used to store custom data about the Object3d
                            position={[1.3, 4.5, 1]} // The position on the canvas of the object [x,y,x]
                            rotation={[0, 0, 0]} // The rotation of the object
                            castShadow // Sets whether or not the object cats a shadow
                        // There are many more props.....
                        >
                            {/* A spherical shape*/}
                            <sphereGeometry attach="geometry" args={[3, 60, 60]} />
                            {/* A standard mesh material*/}
                            <meshStandardMaterial
                                attach="material" // How the element should attach itself to its parent
                                color="#7222D3" // The color of the material
                                transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
                                roughness={0.1} // The roughness of the material - Defaults to 1
                                metalness={0.1} // The metalness of the material - Defaults to 0
                            />
                        </mesh>
                        {/*An ambient light that creates a soft light against the object */}
                        <ambientLight intensity={0.5} />
                        {/*An directional light which aims form the given position */}
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        {/*An point light, basically the same as directional. This one points from under */}
                        <pointLight position={[0, -10, 5]} intensity={1} />
                        <mesh
                            visible // object gets render if true
                            userData={{ test: "hello" }} // An object that can be used to store custom data about the Object3d
                            position={[1.3, 4.5, 1]} // The position on the canvas of the object [x,y,x]
                            rotation={[0, 0, 0]} // The rotation of the object
                            castShadow // Sets whether or not the object cats a shadow
                        // There are many more props.....
                        >
                            {/* A spherical shape*/}
                            <sphereGeometry attach="geometry" args={[3, 60, 60]} />
                            {/* A standard mesh material*/}
                            <meshStandardMaterial
                                attach="material" // How the element should attach itself to its parent
                                color="#7222D3" // The color of the material
                                transparent // Defines whether this material is transparent. This has an effect on rendering as transparent objects need special treatment and are rendered after non-transparent objects. When set to true, the extent to which the material is transparent is controlled by setting it's .opacity property.
                                roughness={0.1} // The roughness of the material - Defaults to 1
                                metalness={0.1} // The metalness of the material - Defaults to 0
                            />
                        </mesh>
                        {/*An ambient light that creates a soft light against the object */}
                        <ambientLight intensity={0.5} />
                        {/*An directional light which aims form the given position */}
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        {/*An point light, basically the same as directional. This one points from under */}
                        <pointLight position={[0, -10, 5]} intensity={1} />

                        {/* A spherical shape*/}
                        <Sphere visible position={[-6.9, -1.4, 1]} args={[3, 16, 16]}>
                            <MeshWobbleMaterial
                                attach="material"
                                color="#EB1E99"
                                factor={2} // Strength, 0 disables the effect (default=1)
                                speed={4} // Speed (default=1)
                                roughness={0}
                            />
                        </Sphere>
                        {/* This sphere has a distort material attached to it */}
                        <mesh>

                            <Sphere visible position={[3, -4, 1]} args={[3, 60, 60]} >
                                <MeshDistortMaterial
                                    color="#00A38D"
                                    attach="material"
                                    distort={0.25} // Strength, 0 disables the effect (default=1)
                                    speed={20} // Speed (default=1)
                                    roughness={0}
                                />
                            </Sphere>
                        </mesh>
                    </group>
                </Canvas>
            </div>
            <div style={{ padding: "0 81px" }}>
                <div style={{ position: "absolute", top: "146px", left: "81px", zIndex: 3 }}>
                    <div className="title-text-style" >Sphere.<span style={{ color: "var(--red-violet)" }}>ART</span></div>
                    <div className="description-text-style">
                        Sphere.ART is a platform that aims to build a new creative economy—a world where creators, designers, and developers can use the Tezos blockchain to value their skills in an entirely new way. In this world, users can create, buy and sell 3D Spheres as an NFT.
                    </div>
                    <div className="action-section">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <SolidButton title="Explore" style={{ fontSize: "20px", height: "auto" }} />
                        </Link>
                        <Link to="/create" style={{ textDecoration: "none" }}>
                            <LinedButton title="Create" style={{ fontSize: "20px", height: "auto" }} />
                        </Link>
                    </div>
                </div>
                <div className="title-text-style" style={{ marginTop: "810px" }}>Why Sphere.<span style={{ color: "var(--red-violet)" }}>ART</span> ?</div>
                <div className="subtitle-text-style" style={{ marginTop: "5px" }}>
                    Unlike other NFT marketplaces, Sphere.ART has come up with a unique way of presenting the NFTs. It allows users to move the camera to orbit around the 3d Sphere NFT. This gives the users freedom to look around the NFT and have a close to real life three dimensional view.
                </div>
                <div className="title-text-style" style={{ marginTop: "160px" }}>Features</div>
                <div className="feature-section">
                    <ol style={{ flex: 1 }}>
                        <li>No, buy/sell transaction fees.</li>
                        <li>Low gas fees.</li>
                        <li>Minted on the Tezos Blockchain.</li>
                        <li>Data files are stored on IPFS.</li>
                        <li>Video Preview of the NFT on hover.</li>
                        <li>Orbit Controls to interact with the NFT.</li>
                    </ol>
                    <ol style={{ flex: 1 }} start={'7'}>
                        <li>Ability to update price of the NFT.</li>
                        <li>Search NFT tokens.</li>
                        <li>Sort the tokens on the basis of time, users etc.</li>
                        <li>Deployed on the Granada testnet.</li>
                        <li>Buyers get a .sphere file, which can be imported in our editor.</li>
                    </ol>
                </div>
                <div className="title-text-style" style={{ marginTop: "136px", textAlign: "center" }}>Sphere.<span style={{ color: "var(--red-violet)" }}>ART</span> Editor</div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "50px" }}>
                    <div className="subtitle-text-style" style={{ textAlign: "center", width: "790px", fontSize: "30px" }}>
                        A tool/ software which allows anyone to get started with building 3D Spheres.
                    </div>
                </div>
                <img src={preview} alt={''} className="preview-container" />
                <div className="subtitle-text-style" style={{ marginTop: "160px", }}>
                    With the help of the editor, there is no need for the creators to have 3rd party complex software, nor do they need a powerful machine to run them. Sphere.ART Editor is a part of our submission. The user can export the project and then sell it as a NFT for the buyers to buy it. With even close to zero knowledge about 3d development, our editor can be used to showcase their creativity  and convert their ideas into real art.
                </div>
                <div className="action-section" style={{ width: "100%", marginTop: "50px" }}>
                    <SolidButton title="Online Editor" style={{ fontSize: "20px", height: "auto" }} onClick={() => {
                        window.open("https://sphereart-editor.netlify.app/editor/", "_blank", "", true).focus();
                    }} />
                    {/* <LinedButton title="Download" style={{ fontSize: "20px", height: "auto" }} onClick={() => {
                        window.open("https://github.com/Maadhav/sphere-art-three.js/archive/refs/heads/master.zip", "_blank", "", true).focus();
                    }} /> */}
                </div>
                <video className="video-container" controls autoPlay loop muted>
                    <source src={videoPreview} type="video/mp4" />
                </video>
                <div className="title-text-style" style={{ marginTop: "135px" }}>Features</div>
                <div className="feature-section">
                    <ol style={{ flex: 1 }}>
                        <li>Easy to learn.</li>
                        <li>Offline support.</li>
                        <li>Import anykind of texture maps to apply to your spheres.</li>
                        <li>The.sphere file can then be re imported to our editor.</li>
                        <li>Export project to a.sphere file which contains the code, thumbnail and a small video preview of the 3d model in motion.</li>
                    </ol>
                    <ol style={{ flex: 1 }} start={'6'}>
                        <li>Auto save.</li>
                        <li>Import any kind of 3d assets(gltf, obj, etc).</li>
                        <li>Import examples directly from the editor.</li>
                        <li>Progress saved even after closing the browser session.</li>
                        <li>PWA support, which allows the editor to run nativly on any operating system.</li>
                        <li>Mobile Support.</li>
                    </ol>
                </div>
            </div>
        </>
    )
}

export default About

