import React, { FC, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import './index.less'
import city from '@/utils/china.json'
import * as terrain from "@/imgs/7.6.tif";
import * as mountainImage from "@/imgs/g_land_03.png";
// import * as terrain from "@/utils/agri-small-dem.tif";
// import * as mountainImage from "@/imgs/terrain_z1.jpg";
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

        init();
    }, [])


    let start, camera: any, controls, scene: any, renderer: any, uniforms2, group, group2: any, fire;
    // 时间 
    let clock = new THREE.Clock();
    
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let INTERSECTED: any;   


    function init() {
        // 场景
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcfcfcf);
        // scene.fog = new THREE.FogExp2('#ffffff', 0.00055);
        // 渲染
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 相机
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 4000);
        camera.position.set(0, 1200, 0);
        // camera.position.set(292, 109, 268);//设置相机位置
        // camera.position.set(- 15, 7, 15);
        // camera.lookAt(scene.position);

        group = new THREE.Group()
        group2 = new THREE.Group()


        var textureLoader = new THREE.TextureLoader(); // 纹理loader

        let box = new THREE.PlaneGeometry(4096, 2048, 0, 0)
        var texture = textureLoader.load("https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/g_land.png");
        var textureNormal = textureLoader.load("https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/bgMapNormal.jpg");

        var seaTexture = textureLoader.load(require('@/imgs/下载.jpg'));


        var material = new THREE.MeshStandardMaterial({
            map: texture,
            normalScale: new THREE.Vector2(2.9, 2.9),
            //specularMap: textureSpecular,
            transparent: true,
            normalMap: textureNormal,
            opacity: 1,
            depthTest: false
        });

        var seaMaterial = new THREE.MeshStandardMaterial({
            // color: '#1E90FF',
            map: seaTexture,
            // map: texture,
            // normalScale: new THREE.Vector2(2.9, 2.9),
            //specularMap: textureSpecular,

            // normalMap: textureNormal,

            depthTest: false
        });
        var land = new THREE.Mesh(box, material);
        let sea = new THREE.Mesh(box, seaMaterial);






        var light = new THREE.AmbientLight(0xe1e1e1, .1);
        light.position.set(400, 200, -200);
        scene.add(light);
        // 坐标
        var axesHelper = new THREE.AxesHelper(1000);
        scene.add(axesHelper)

        var ambientLight = new THREE.AmbientLight(0xcccccc, .4);
        scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(0, 1200, 0);
        scene.add(directionalLight);

        var textureTree = new THREE.TextureLoader().load(require('@/imgs/rain.png'));
        var textureFrontier = new THREE.TextureLoader().load(require('@/imgs/noxus.png'));

        var textureCloud = new THREE.TextureLoader().load(require('@/imgs/cloud.png'));
        let cloudGroup = createCloud()
        let rainGroup = createRain(-870, -630, 0.09)
        let rainGroup1 = createRain(-400, -650, 0)
        scene.add(rainGroup);
        scene.add(rainGroup1);
        scene.add(cloudGroup);


        // 天空
        // var sky = new Sky();
        // sky.scale.setScalar(10000);
        // scene.add(sky);





        var parameters = {
            distance: 400,
            inclination: 0,
            azimuth: 0.25
        };


        var params = {
            color: '#ffffff',
            scale: 4,
            flowX: 1,
            flowY: 1
        };

        var waterGeometry = new THREE.PlaneBufferGeometry(8000, 4000);
        let water = new Water(waterGeometry, {

            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
            textureWidth: 1024,
            textureHeight: 1024,
            normalMap0: textureLoader.load(require('@/imgs/Water_1_M_Normal.jpg')),
            normalMap1: textureLoader.load(require('@/imgs/Water_2_M_Normal.jpg')),

        });



        var arr = [
            { w: 114, h: 114, x: -954, y: -15, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city1.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag1.png?a1", url: '0' },
            { w: 210, h: 210, x: -738, y: 242, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city2.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag2.png?a1", url: '2' },
            { w: 148, h: 148, x: -540, y: 620, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city3.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag3.png?a1", url: '1' },
            { w: 186, h: 186, x: -459, y: 336, z: 0.2, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city4.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag4.png?a1", url: '3' },
            { w: 161, h: 161, x: -322, y: 217, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city5.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag5.png?a1", url: '3' },
            { w: 163, h: 163, x: -247, y: -51, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city6.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag6.png?a1", url: '4' },
            { w: 96, h: 96, x: -96, y: 40, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city7.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag7.png?a1", url: '4' },
            { w: 198, h: 198, x: 314, y: -350, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city8.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag8.png?a1", url: '100' },
            { w: 225, h: 225, x: 855, y: 232, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city9.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag9.png?a1", url: '5' },
            { w: 298, h: 298, x: 815, y: 500, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city10.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag10.png", url: '100' },
            { w: 160, h: 160, x: 765, y: 685, z: 0.2, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city11.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag11.png", url: '100' },
            { w: 256, h: 256, x: 408, y: 734, z: 0.1, img: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_city12.png", tag: "https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/model_tag12.png", url: '100' }

        ];

        for (var i = 0; i < arr.length; i++) {
            var W = arr[i].w,
                H = arr[i].h,
                X = arr[i].x,
                Y = arr[i].y,
                Z = arr[i].z,
                img = arr[i].img;
            var texture3 = textureLoader.load(img);
            var box3 = new THREE.PlaneGeometry(W, H);
            var material3 = new THREE.MeshLambertMaterial({
                map: texture3,
                transparent: true,
                opacity: 1,
                color: 0xffffff,
                depthTest: false
                //blending: THREE.AdditiveBlending
                //alpha: 1.0,
                //blending: THREE.NormalBlending,
                //fog: false
            });
            var mesh3 = new THREE.Mesh(box3, material3);
            mesh3.name = 'btn_ico' + i;
            mesh3.img = arr[i].img;
            mesh3.tag = arr[i].tag;
            mesh3.url = arr[i].url;


            //mesh3.position.set(arr[3*i],arr[3*i+1],arr[3*i+2]);

            mesh3.position.set(X, Y, Z);

            mesh3.updateMatrix();
            mesh3.matrixAutoUpdate = false;
            group2.add(mesh3);

        };
        let frontierMaterial = new THREE.SpriteMaterial({
            // color: '#1E90FF',
            map: textureFrontier,
            transparent: true,
            opacity: 1,
            // map: texture,
            // normalScale: new THREE.Vector2(2.9, 2.9),
            //specularMap: textureSpecular,

            // normalMap: textureNormal,

            // depthTest: false
        });

        let frontier = new THREE.Sprite(frontierMaterial);
        frontier.scale.set(2000, 2000, 10);

        // 水 城市地图 湖底
        group.add(water, land, sea);
        group.rotation.x = -0.5 * Math.PI;
        water.position.z = -1
        sea.position.z = -2
        scene.add(group);

        // 城邦建筑物
        group2.renderOrder = 1;
        group2.rotation.x = -0.5 * Math.PI;
        scene.add(group2)

        // 边境
        // frontier.position.y = 10
        // scene.add(frontier)

        function createCity(img: string) {
            //先用画布将文字画出

            //使用Sprite显示文字
            let texture = new THREE.TextureLoader().load(require('@/imgs/capital.png'));
            let material = new THREE.SpriteMaterial({ map: texture });
            let textObj = new THREE.Sprite(material);
            textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
            textObj.position.set(0, 10, 98);
            return textObj;
        }

        function createSpriteText() {
            //先用画布将文字画出
            let canvas = document.createElement("canvas");
            let ctx: any = canvas.getContext("2d");
            ctx.fillStyle = "#ffff00";
            ctx.font = "Bold 100px Arial";
            ctx.lineWidth = 4;
            ctx.fillText("ABCDRE", 4, 104);
            let texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;

            //使用Sprite显示文字
            let material = new THREE.SpriteMaterial({ map: texture });
            let textObj = new THREE.Sprite(material);
            textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
            textObj.position.set(50, 0, 98);
            return textObj;
        }

        scene.add(createCity('https://yz.lol.qq.com/v1/map/images/pins/capital.png'))
        scene.add(createSpriteText())



        function rainAnmation(group: any) {
            group.children.forEach((sprite: any) => {
                // 雨滴的y坐标每次减1
                sprite.position.y -= 1;
                if (sprite.position.y < 0) {
                    // 如果雨滴落到地面，重置y，从新下落
                    sprite.position.y = 200;
                }
            });
        }
        function createRain(x: number = 0, z: number = 0, deg: number = 0) {
            // 加载雨滴理贴图

            let group = new THREE.Group();
            // 批量创建表示雨滴的精灵模型
            for (let i = 0; i < 600; i++) {
                var spriteMaterial = new THREE.SpriteMaterial({
                    map: textureTree,//设置精灵纹理贴图
                    transparent: true,
                    opacity: .3,
                });
                // 创建精灵模型对象
                var sprite = new THREE.Sprite(spriteMaterial);
                scene.add(sprite);
                // 控制精灵大小,
                sprite.scale.set(8, 8, 1); //// 只需要设置x、y两个分量就可以
                var k1 = Math.random() - 0.5;
                var k2 = Math.random() - 0.5;
                var k3 = Math.random();
                // var k2 = Math.random() - i*0.1  ;
                // var k3 = Math.random() - i*0.1  ;

                // 设置精灵模型位置，在整个空间上上随机分布
                sprite.position.set(700 * k1, 600 * k2, 200 * k3)
                sprite.rotation.z = -0.5 * Math.PI;

                group.add(sprite);
            }

            group.position.x = x
            group.position.z = z

            group.rotateY(deg * Math.PI)

            return group
        }
        function createCloud(x = 0, z = 0) {
            // 加载雨滴理贴图

            let group = new THREE.Group();
            // 批量创建表示雨滴的精灵模型
            for (let i = 0; i < 3; i++) {
                var spriteMaterial = new THREE.SpriteMaterial({
                    map: textureCloud,//设置精灵纹理贴图,
                    // opacity: 1,
                    // transparent: true

                });
                // 创建精灵模型对象
                var sprite = new THREE.Sprite(spriteMaterial);
                scene.add(sprite);
                // 控制精灵大小,
                sprite.scale.set(1000, 1000, 3); //// 只需要设置x、y两个分量就可以
                var k1 = Math.random() - 0.5;
                var k2 = Math.random() - 0.5;
                var k3 = Math.random() - 0.5;

                // 设置精灵模型位置，在整个空间上上随机分布
                sprite.position.set(1000 * k1, 600 + i, 1000 * k2)
                group.add(sprite);
            }

            group.renderOrder = 3

            return group
        }
        function onMouseMove(event: any) {
            event.preventDefault();

            mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(group2.children);
            if (intersects && intersects.length > 0) {


                if (INTERSECTED) {
                    // INTERSECTED[0].object.material.color.r = 1
                    INTERSECTED[0].object.material.color = {
                        r: 1,
                        g: 1,
                        b: 1,
                    }
                    INTERSECTED = null
                    let tag: HTMLDivElement | null = document.querySelector('.tag')
                    if (tag) {
                        console.log(intersects[0].object.material.color);
                        tag.style.display = `block`
                        tag.style.top = `${event.y}px`
                        tag.style.left = `${event.x}px`
                        tag.style.backgroundImage = `url(${intersects[0].object.tag})`
                    }
                }
                intersects[0].object.material.color = {
                    r: 1.2,
                    g: 1.2,
                    b: 1.2,
                }
                // intersects[0].object.material.color.r = 1.8
                // intersects[0].object.material.color.g = 1.8
                // intersects[0].object.material.color.b = 1.8
                INTERSECTED = intersects
            } else {
                if (INTERSECTED) {
                    INTERSECTED[0].object.material.color = {
                        r: 1,
                        g: 1,
                        b: 1,
                    }
                    // INTERSECTED[0].object.material.color.r = 1
                    // INTERSECTED[0].object.material.color.g = .2-.005
                    // INTERSECTED[0].object.material.color.b = .2-.005
                    let tag: HTMLDivElement | null = document.querySelector('.tag')
                    if (tag) {
                        tag.style.display = `none`
                    }
                }
            }
            // intersects[0].object.rotation

        }

        function cloudAnmation(group: any) {
            group.children.forEach((sprite: any) => {
                // 雨滴的y坐标每次减1
                // sprite.position.z -= 1; 
                sprite.position.x -= .1;
                if (sprite.position.x < -500) {
                    // 如果雨滴落到地面，重置y，从新下落
                    sprite.position.x = 500;
                }
            });
        }

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.target = new THREE.Vector3(0, 70, 0);

        animate()
        function animate() {
            // controls.up  date();
            requestAnimationFrame(animate);

            render()
        }
        function render() {
            var delta = clock.getDelta();

            // raycaster.setFromCamera(mouse, camera);
            // var intersects = raycaster.intersectObjects(group2.children);

            rainAnmation(rainGroup)
            rainAnmation(rainGroup1)
            cloudAnmation(cloudGroup)


            raycaster.setFromCamera(mouse, camera);

            // calculate objects intersecting the picking ray
            // var intersects = raycaster.intersectObjects(scene.children);


            // for (var i = 0; i < intersects.length; i++) {

            // intersects[i].object.material.color.set(0xff0000);

            // }

            renderer.render(scene, camera);

        }
        window.addEventListener('mousemove', onMouseMove, false);

        window.requestAnimationFrame(render);

    }

    return (
        <>
            <div id='home' ></div>
            <div className='tag'></div>
            {/* <canvas id='name' ></canvas> */}
        </>
    )

}

export default Home
