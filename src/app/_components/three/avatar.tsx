/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 -t ../assets/imchill.glb 
*/

import * as THREE from "three";
import React from "react";
import { useEffect, useRef, Ref } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName =
  | "IdleV4.2(maya_head)"
  | "IdleV4.2(maya_head)_Armature.001"
  | "IdleV4.2(maya_head)_Armature.002"
  | "IdleV4.2(maya_head)_Armature.003"
  | "Just_chilling_Clean_Armature";

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

export function Me(props: JSX.IntrinsicElements["group"]) {
  const group = React.useRef<THREE.Group>();
  const { scene, animations } = useGLTF("/imchill.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useFrame((state) => {
    if (!group.current) return;
    //probably need to modify this for mobile vs desktop
    if (state.clock.getElapsedTime() > 5 && state.clock.getElapsedTime() < 7) {
      group.current.position.setZ(7.5 * state.clock.getElapsedTime() - 47.25);
    } else if (
      state.clock.getElapsedTime() >= 7 &&
      state.clock.getElapsedTime() <= 8
    ) {
      actions["IdleV4.2(maya_head)"]?.fadeOut(0.5);
      actions.Just_chilling_Clean_Armature?.fadeIn(0.5);
    } else if (state.clock.getElapsedTime() > 8) {
      actions.Just_chilling_Clean_Armature?.play();
    }
  });
  useEffect(() => {
    actions["IdleV4.2(maya_head)"]?.fadeIn(0.1).play();
  }, [actions]);
  return (
    <group
      position={[0, -1, -10]}
      ref={group as Ref<THREE.Group>}
      {...props}
      dispose={null}
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

useGLTF.preload("/imchill.glb");
