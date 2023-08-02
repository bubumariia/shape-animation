import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Cylinder({ height, radius }) {
  // Creates a reference to the HTML element that will hold the cylinder
  const cylinderRef = useRef();

  // Uses the useEffect hook to run Three.js code once the component mounts
  useEffect(() => {
    // Creates a new Three.js scene
    const scene = new THREE.Scene();
    // Creates a camera with a 75 degree field of view, 1 aspect ratio, a near plane of 0.1, and a far plane of 1000
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    // Creates a new Three.js renderer with alpha transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    // Sets the size of the renderer to 500 x 500 pixels
    renderer.setSize(500, 500);

    // Creates a new Three.js geometry for a cylinder with the specified radius and height, and 32 segments around the circumference
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    // Creates a new Three.js material with a greenish-blue color, high shininess, and white specular highlights
    const material = new THREE.MeshPhongMaterial({
      color: 0x22d8cc,
      shininess: 100,
      specular: 0xffffff,
    });
    // Creates a new Three.js mesh with the geometry and material we just created
    const cylinder = new THREE.Mesh(geometry, material);
    // Makes the material double-sided, transparent with an opacity of 0.7
    cylinder.material.side = THREE.DoubleSide;
    cylinder.material.transparent = true;
    cylinder.material.opacity = 0.7;
    // Positions the cylinder so that it sits on the ground, and scale it vertically to make it appear more like a tube than a cylinder
    cylinder.position.y = height / 2;
    cylinder.scale.set(1, 0.5, 1);
    // Enables casting and receiving of shadows for the cylinder
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    // Adds the cylinder to the scene
    scene.add(cylinder);

    // Creates a new Three.js directional light with white color and a strength of 1, and position it above and to the right of the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1);
    // Adds the light to the scene
    scene.add(light);

    // Creates a new Three.js ambient light with white color and a strength of 0.2
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    // Adds the ambient light to the scene
    scene.add(ambientLight);

    // Sets the camera's initial position so that it is looking at the center of the scene
    camera.position.z = 5;

    // Defines an animation loop function that will update the cylinder's rotation and render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      cylinder.rotation.x += 0.01;
      cylinder.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    // Starts the animation loop
    animate();

    // Adds the renderer's canvas element to the HTML element that will hold the cylinder
    cylinderRef.current.appendChild(renderer.domElement);

    // Uses a cleanup function to remove the renderer's canvas element when the component unmounts
    return () => {
      cylinderRef.current.removeChild(renderer.domElement);
    };
  }, [height, radius]);

  return (
    <div
      style={{
        width: "33%",
        height: "33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
      ref={cylinderRef}
    />
  );
}

export default Cylinder;
