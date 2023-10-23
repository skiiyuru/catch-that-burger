import {
  Float,
  GradientTexture,
  OrbitControls,
  Stage,
  Text,
} from "@react-three/drei"
import { Perf } from "r3f-perf"
import { Suspense, useEffect, useRef } from "react"
import Model from "./components/Model"
import PlaceHolder from "./components/Placeholder"
import Burger from "./components/Burger"
import Fox from "./components/Fox"
import { useFrame } from "@react-three/fiber"

export default function Experience() {
  const fox = useRef()
  const burger = useRef()
  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime
    const angle = state.clock.elapsedTime * 0.5

    // Burger
    burger.current.position.x =
      Math.cos(angle) * (5 + Math.sin(elapsedTime * 0.32))
    burger.current.position.z =
      Math.sin(angle) * (5 + Math.sin(elapsedTime * 0.5))
    burger.current.position.y =
      Math.sin(elapsedTime * 0.75 * 5) * Math.cos(angle)

    // Fox
    fox.current.lookAt(burger.current.position)
  })

  return (
    <>
      {/* LOGIC COMPONENTS */}

      <Perf position="top-left" />
      <OrbitControls makeDefault />

      {/* SCENE COMPONENTS */}

      {/* STAGE */}

      <Stage
        shadows={{
          type: "contact",
          opacity: 0.7,
          blur: 3,
        }}
        preset={"soft"}
        environment={"forest"}
        intensity={0.07}
      >
        <Suspense fallback={<PlaceHolder scale={[1, 0.5, 1]} />}>
          {/* <Model src={"./FlightHelmet/glTF/FlightHelmet.gltf"} /> */}
          <Model src={"./hamburger-draco.glb"} scale={0.1} ref={burger} />
          {/* <Burger scale={0.1} position-y={-1} position-x={1} /> */}
        </Suspense>

        <Suspense fallback={<PlaceHolder scale={[1, 3, 5]} />}>
          <Fox ref={fox} />
        </Suspense>

        <Float speed={3} floatIntensity={2}>
          <Text
            fontSize={2}
            color={"salmon"}
            font="./bangers-v20-latin-regular.woff"
            position={[2, 0, -10]}
            // maxWidth={2}
            textAlign="center"
          >
            Catch that burger!
            {/* <meshNormalMaterial /> */}
            <meshBasicMaterial>
              <GradientTexture
                stops={[0, 1]} // As many stops as you want
                colors={["aquamarine", "hotpink"]} // Colors need to match the number of stops
                size={1024} // Size is optional, default = 1024
              />
            </meshBasicMaterial>
          </Text>
        </Float>
      </Stage>
    </>
  )
}
