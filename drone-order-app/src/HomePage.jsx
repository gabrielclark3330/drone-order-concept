import { Suspense, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Grid, Center, PerspectiveCamera, Text3D } from '@react-three/drei';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return <Html className="text-white text-4xl" center>{progress} % loaded</Html>
}

function Model() {
    //const model = useLoader(GLTFLoader, "./serravalle_scrivia/scene.gltf");
    //const model = useLoader(FBXLoader, "./flat_town/Export10500k6x8192.fbx");
    const model = useLoader(GLTFLoader, "./general_ship_repair_gltf/scene.gltf")
    return (
        <primitive object={model.scene} scale={0.05} /> // if gltf need model.scene if fbx pass model
    );
};

function PlaceHolderText({text}) {
    return (
    <Center rotation={[-1.2, -0.1, 0]}>
    <Text3D
        curveSegments={32}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.1}
        height={0.5}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        font="/Inter_Bold.json">
        {text}
        <meshNormalMaterial />
    </Text3D>
    </Center>);
}

//lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]
function Header(props) {
    return (
        <div className="flex flex-row space justify-between p-4 sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-700/60">

            <div className="flex flex-row center items-center outline outline-1 outline-gray-400 rounded-3xl shadow-sm shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6 my-1 mx-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>

            <div className="flex flex-row center outline outline-1 outline-gray-400 rounded-3xl items-center shadow-md shadow-black" onClick={() => OnPhoto(props.photos, props.setPhotos, props.gl)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6 my-1 mx-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
            </div>

            <div className="flex flex-row center outline outline-1 outline-gray-400 rounded-3xl items-center shadow-sm shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-5 h-5 my-1 mx-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-8 h-8 m-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </div>
    );
}

function OnPhoto(photos, setPhotos, gl) {
    if (photos===null){
        setPhotos([gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream')]);
    }else{
        setPhotos([...photos, gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream')]);
    }
}

function AccountMenu() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    );
}

function SideBar(props) {
    const shoppingCart = [];
    if (props.photos===null) {
        shoppingCart.push(
            <div key="1">
                <div className="text-white">Click </div>

                <div className="flex flex-row center outline outline-1 outline-gray-400 rounded-3xl items-center shadow-md shadow-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6 my-1 mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                </div>

                <div className="text-white"> to add a photo to the cart</div>
            </div>
        );
    }
    else{
        for (var index in props.photos) {
            const photo = props.photos[index]

            shoppingCart.push(
                <div key={index} className="flex flex-row center items-center outline outline-1 outline-gray-400 rounded-3xl shadow-sm shadow-black m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E5E7EA" className="w-6 h-6 my-1 mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <div className="w-32 h-32 rounded-full overflow-hidden m-1">
                        <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="absolute overflow-y-auto max-h-full flex flex-col space p-4 top-0 w-min z-40 backdrop-blur transition-colors duration-500 lg:z-50 bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-700/60 rounded-br-md">
            {shoppingCart}
        </div>
    );
}

function Scene(props) {
    const localGl = useThree((state) => state.gl)
    props.setGl(localGl);
    const { gridSize, ...gridSettings } = {
        gridSize: [100.5, 100.5],
        cellSize: 1,
        cellThickness: 1,
        cellColor: '#9AA4B3',
        sectionSize: 3.3,
        sectionThickness: 1.5,
        sectionColor: '#D7D8C5',
        fadeDistance: 50,
        fadeStrength: 1,
        followCamera: false,
        infiniteGrid: true
    };
    return (
        <>
            <PerspectiveCamera
                makeDefault
                //ref={camera}}
                fov={75}
                near={0.1}
                far={100}
                position={[0, 10, 0]}
                rotation={[-0.6,0,0]}/>
            <Grid position={[0, -0.01, 0]} args={gridSize} {...gridSettings}/>
            <OrbitControls />
            <ambientLight intensity={0.3} color="#FFFFFF" />
            <pointLight intensity={1.0} position={[10, 10, 10]} />
                {/*<Suspense fallback={<PlaceHolderText text={'Model\nLoading...'}/>}>*/}
                <Suspense fallback={<Loader/>}>
                <Center>
                    <Model/>
                </Center>
            </Suspense>
            <Environment preset="sunset" background blur={0.5}/>
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>
        </>
    );
}

function HomePage() {
    const canvasRef = useRef(null);
    const camera = useRef(null);
    const [photos, setPhotos] = useState(null);
    const [gl, setGl] = useState(null);

    return (
    <div className="flex flex-row">
        <main role="main" className="w-screen h-screen">
            <Header photos={photos} setPhotos={setPhotos} gl={gl}/>
            <SideBar photos={photos} setPhotos={setPhotos}/>
            <div className="h-screen w-screen absolute top-0 left-0">
                <Canvas gl={{ preserveDrawingBuffer: true }} ref={canvasRef}>
                    <Scene gl={gl} setGl={setGl}/>
                </Canvas>
            </div>
        </main>
    </div>
    );
}

export default HomePage;