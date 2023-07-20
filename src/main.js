      // create a WebGLRenderer and set its width and height
      import * as THREE from 'three'
      import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js"

      const loader = new GLTFLoader();
      const scene = new THREE.Scene()
      //const geometry = new THREE.SphereGeometry(3,64,64)
      const material = new THREE.MeshStandardMaterial({
          color:"#00ff83",
      })
      //const mesh = new THREE.Mesh(geometry,material)
      //scene.add(mesh)

      const sizes = {
          width: window.innerWidth,
          height : window.innerHeight
      }

      const light = new THREE.PointLight(0xffffff,1,100)
      light.position.set(12,10,10)
      scene.add(light)

      const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
      camera.position.z = 10
      scene.add(camera)


      const canvas = document.querySelector(".webgl");
      const renderer = new THREE.WebGLRenderer({canvas})

      renderer.setSize(sizes.width,sizes.height)
      renderer.render(scene,camera);


      //update
      window.addEventListener("resize",() => {
          sizes.width = window.innerWidth
          sizes.height = window.innerHeight
          
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
          renderer.setSize(sizes.width,sizes.height)
      })
      loader.load( 'Goku2.gltf', 
        function ( gltf )
            {
                const sword = gltf.scene;  // sword 3D object is loaded
                sword.scale.set(2, 2, 2);
                sword.position.y = -2;
                scene.add(sword);
            }
      );  
      const loop = () =>{
          renderer.render(scene,camera)
          window.requestAnimationFrame(loop)
      }
      loop()