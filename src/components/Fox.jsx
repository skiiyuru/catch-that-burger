import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useControls } from "leva"
import { forwardRef, useEffect, useRef } from "react"
import { Vector3 } from "three"

export default forwardRef(function Fox(props, ref) {
  // const fox = useRef()
  const model = useGLTF("./Fox/glTF/Fox.gltf")
  const animations = useAnimations(model.animations, model.scene)

  // const { actionName } = useControls("Fox", {
  //   actionName: { options: animations.names },
  // })

  useEffect(() => {
    // const action = animations.actions[actionName]
    const action = animations.actions["Run"]
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [])

  return (
    <primitive
      ref={ref}
      object={model.scene}
      scale={0.05}
      position-x={-1}
      position-y={-1}
    />
  )
})
