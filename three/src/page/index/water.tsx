import React, { FC, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import GUI from 'three/examples/jsm/libs/dat.gui.module.js';
import './index.less'
import city from '@/utils/china.json'
// import { Water } from '@/utils/Water2';
// import * as terrain from "@/imgs/129.tif";
// import * as mountainImage from "@/utils/agri-medium-autumn.jpg";
import * as terrain from "@/utils/agri-small-dem.tif";
import * as mountainImage from "@/imgs/terrain_z1.jpg";
import * as GeoTIFF from "geotiff";

let classNames = require('classnames');
let THREE = require('three');

interface Home {

}

interface Coords {
    x: number,
    y: number,
    z: number,
}
const Home: FC<Home> = (props) => {
    useEffect(() => {

        init()

    }, [])

    async function init() {

        // import { GUI } from './jsm/libs/dat.gui.module.js';

        // import { OrbitControls } from './jsm/controls/OrbitControls.js';


        var scene: any, camera: any, renderer: any, water: any;

        init();
        animate();

        function init() {

            // scene

            scene = new THREE.Scene();

            // camera

            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 25, 0);
            camera.lookAt(scene.position);

            // ground

            var groundGeometry = new THREE.PlaneBufferGeometry(20, 20, 10, 10);
            var groundMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
            var ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = Math.PI * - 0.5;
            scene.add(ground);

            var textureLoader = new THREE.TextureLoader();
            textureLoader.load(require('@/imgs/FloorsCheckerboard_S_Diffuse.jpg'), function (map: any) {

                map.wrapS = THREE.RepeatWrapping;
                map.wrapT = THREE.RepeatWrapping;
                map.anisotropy = 16;
                map.repeat.set(4, 4);
                groundMaterial.map = map;
                groundMaterial.needsUpdate = true;

            });

            // water

            var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
            // var flowMap = textureLoader.load( 'textures/water/Water_1_M_Flow.jpg' );

            water = new Water(waterGeometry, {
                scale: 2,
                textureWidth: 1024,
                textureHeight: 1024,
                // flowMap: flowMap
            });

            water.position.y = 1;
            water.rotation.x = Math.PI * - 0.5;
            scene.add(water);

            // flow map helper

            var helperGeometry = new THREE.PlaneBufferGeometry(20, 20);
            var helperMaterial = new THREE.MeshBasicMaterial({});
            var helper = new THREE.Mesh(helperGeometry, helperMaterial);
            helper.position.y = 1.01;
            helper.rotation.x = Math.PI * - 0.5;
            helper.visible = false;
            scene.add(helper);

            // renderer

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            document.body.appendChild(renderer.domElement);

            //

            var gui = new GUI.GUI();
            gui.add(helper, 'visible').name('Show Flow Map');
            gui.open();

            //

            var controls = new OrbitControls(camera, renderer.domElement);

            //

            window.addEventListener('resize', onResize, false);

        }

        function onResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            requestAnimationFrame(animate);

            render();

        }

        function render() {

            renderer.render(scene, camera);

        }

    }




    return (
        <>
            <div id='home' ></div>
            {/* <canvas id='name' ></canvas> */}
        </>
    )

}

export default Home
