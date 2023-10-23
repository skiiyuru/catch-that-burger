import { Clone, useGLTF } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { forwardRef, useRef } from "react"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default forwardRef(function Model(props, ref) {
  const model = useGLTF(props.src)

  // const model = useLoader(GLTFLoader, props.src, (loader) => {
  //   const dracoLoader = new DRACOLoader()
  //   dracoLoader.setDecoderPath("./draco/")
  //   loader.setDRACOLoader(dracoLoader)
  // })

  const clones = []

  if (props.cloneCount) {
    for (let index = 0; index < props.cloneCount; index++) {
      clones.push(
        <Clone
          key={"c" + index}
          object={model.scene}
          position-y={-1}
          position-z={(Math.random() - 0.5) * 7}
          position-x={(Math.random() - 0.5) * 7}
          {...props}
        />
      )
    }
  }

  return (
    <>
      {clones.length ? (
        clones
      ) : (
        <primitive ref={ref} object={model.scene} position-y={-1} {...props} />
      )}
    </>
  )
})

// useGLTF.preload(props.src)
