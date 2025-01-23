/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 -t ../assets/models/all_avaturn_animated.glb 
*/

import * as THREE from "three";
import { useEffect, useMemo, useState, useRef } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useScroll } from "@react-three/drei";
import { easing } from "maath";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName =
  | "aerial"
  | "backflip"
  | "ballerina"
  | "box"
  | "brag"
  | "callme"
  | "cartwheel"
  | "catwalk"
  | "cautious"
  | "celebrate"
  | "cheer"
  | "chill"
  | "concert"
  | "conduct"
  | "curtsy"
  | "dance"
  | "facepalm"
  | "fingergun"
  | "flex"
  | "getatme"
  | "gorilla"
  | "hey"
  | "kick"
  | "kickfroze"
  | "lean"
  | "muaythai"
  | "pose"
  | "pounce"
  | "punch"
  | "punk"
  | "push"
  | "pushup"
  | "ready"
  | "run"
  | "runpose"
  | "search"
  | "shadowbox"
  | "sit"
  | "smoke"
  | "sneaky"
  | "soccer"
  | "sprintfroze"
  | "superhero"
  | "tantrum"
  | "warmup"
  | "woah"
  | "yippee"
  | "yup";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    avaturn_body: THREE.SkinnedMesh;
    avaturn_hair_0: THREE.SkinnedMesh;
    avaturn_look_0: THREE.SkinnedMesh;
    avaturn_shoes_0: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    avaturn_body_material: THREE.MeshStandardMaterial;
    avaturn_hair_0_material: THREE.MeshStandardMaterial;
    avaturn_look_0_material: THREE.MeshStandardMaterial;
    avaturn_shoes_0_material: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export default function Me(props: JSX.IntrinsicElements["group"]) {
  const me = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { scene, animations } = useGLTF("/me.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions, names } = useAnimations(animations, me);
  const [action, setAction] = useState<
    THREE.AnimationAction | null | undefined
  >(null);
  const animationActions = names.reduce(
    (a, c) => {
      if (!actions[c]) a[c] = null;
      a[c] = actions[c];
      return a;
    },
    {} as Record<string, THREE.AnimationAction | null | undefined>,
  );
  useEffect(() => {
    if (!actions || !names || !action) return;

    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [action, actions, names]);

  useFrame((state, delta) => {
    const scrolled = scroll.offset * 100;
    if (!me.current) return;
    //probably need to modify this for mobile vs desktop
    if (scrolled < 10) {
      setAction(animationActions.chill);
    } else if (scrolled > 10 && scrolled < 20) {
      //moves me to 5.5
      me.current.position.setZ(((scrolled - 10) * 11) / 20);
      setAction(animationActions.gorilla);
    } else if (scrolled > 20 && scrolled < 25) {
      me.current.position.setZ(5.5);
    } else if (scrolled > 25 && scrolled < 40) {
      setAction(animationActions.chill);
    } else if (scrolled > 40 && scrolled < 50) {
      setAction(animationActions.backflip);
    } else if (scrolled > 50 && scrolled < 70) {
      setAction(animationActions.chill);
      me.current.position.set(0, -1, 5.5);
    } else if (scrolled > 70) {
      setAction(animationActions.cautious);
      me.current.position.setX(0.25 * (scrolled - 70));
      me.current.lookAt(new THREE.Vector3(100, 0, 0));
    }
  });

  if (!actions) return;
  return (
    <group
      position={[0, -1, -10]}
      ref={me}
      {...props}
      dispose={null}
      onPointerEnter={() => setAction(animationActions.yup)}
      onPointerLeave={() => setAction(animationActions.chill)}
    >
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.Hips} />
          <skinnedMesh
            name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials.avaturn_body_material}
            skeleton={nodes.avaturn_body.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials.avaturn_hair_0_material}
            skeleton={nodes.avaturn_hair_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials.avaturn_look_0_material}
            skeleton={nodes.avaturn_look_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials.avaturn_shoes_0_material}
            skeleton={nodes.avaturn_shoes_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/me.glb");
