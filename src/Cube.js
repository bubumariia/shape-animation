import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Cube({ width }) {
  // Creates a reference to the div that will hold the cube
  const cubeRef = useRef();

  useEffect(() => {
    // Creates a new scene, camera, and renderer using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setSize(500, 500);

    // Creates a box geometry with the specified width, and a Phong material
    // with a specific color and lighting properties
    const geometry = new THREE.BoxGeometry(width * 2, width * 2, width * 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x22d8cc,
      shininess: 100,
      specular: 0xffffff,
      flatShading: true,
    });

    // Creates a new Mesh object using the geometry and material, and add it to the scene
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Creates a directional light and add it to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 5);
    scene.add(light);

    // Sets the camera's position
    camera.position.set(0, 0, 10);

    // Defines the animation loop function
    const animate = () => {
      requestAnimationFrame(animate); // requests the next animation frame
      cube.rotation.x += 0.01; // rotates the cube around the x-axis
      cube.rotation.y += 0.01; // rotates the cube around the y-axis
      renderer.render(scene, camera); // renders the scene with the camera
    };

    // Calls the animation loop function to start the animation
    animate();

    // Appends the renderer's canvas element to the cubeRef div
    cubeRef.current.appendChild(renderer.domElement);

    // Removes the renderer's canvas element when the component is unmounted
    return () => {
      cubeRef.current.removeChild(renderer.domElement);
    };
  }, [width]);

  // Returns a div with the cubeRef reference and some styling
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
      ref={cubeRef}
    />
  );
}

export default Cube;
