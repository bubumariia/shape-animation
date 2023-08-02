import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Sphere({ radius }) {
  const sphereRef = useRef(); // Creates a reference to the div where the Three.js renderer will be inserted

  useEffect(() => {
    // Uses the useEffect hook to set up the Three.js scene
    const scene = new THREE.Scene(); // Creates a new Three.js scene
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000); // Creates a new Three.js camera
    const renderer = new THREE.WebGLRenderer({ antialias: true }); // Creates a new Three.js renderer
    renderer.setClearColor(0x000000); // Sets the background color of the renderer
    renderer.setSize(500, 500); // Sets the size of the renderer

    const geometry = new THREE.SphereGeometry(radius, 32, 32); // Creates a Three.js geometry for a sphere with the given radius
    const material = new THREE.MeshStandardMaterial({
      // Creates a Three.js material with the given properties
      color: 0x22d8cc,
      metalness: 0.5,
      roughness: 0.1,
      emissive: 0x0,
      transparent: true,
      opacity: 0.8,
    });
    const sphere = new THREE.Mesh(geometry, material); // Creates a Three.js mesh with the given geometry and material
    scene.add(sphere); // Adds the mesh to the Three.js scene

    const light = new THREE.PointLight(0xffffff, 1, 100); // Creates a new Three.js point light
    light.position.set(0, 0, 5); // Sets the position of the light
    scene.add(light); // Adds the light to the Three.js scene

    camera.position.set(0, 0, 10); // Sets the position of the camera

    const animate = () => {
      // Defines an animation loop function
      requestAnimationFrame(animate); // Requests the next animation frame
      sphere.rotation.x += 0.05; // Rotates the sphere around the x-axis
      sphere.rotation.y += 0.1; // Rotates the sphere around the y-axis
      camera.position.x = 10 * Math.sin(Date.now() / 1000); // Moves the camera in a circular motion
      camera.position.z = 10 * Math.cos(Date.now() / 1000);
      camera.lookAt(scene.position); // Makes the camera look at the center of the scene
      renderer.render(scene, camera); // Renders the Three.js scene
    };

    animate(); // Starts the animation loop

    sphereRef.current.appendChild(renderer.domElement); // Adds the Three.js renderer to the div

    return () => {
      // Uses the useEffect cleanup function to remove the Three.js renderer when the component is unmounted
      sphereRef.current.removeChild(renderer.domElement);
    };
  }, [radius]);

  return (
    // Renders a div where the Three.js renderer will be inserted
    <div
      style={{
        width: "33%",
        height: "33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
      ref={sphereRef}
    />
  );
}

export default Sphere;
