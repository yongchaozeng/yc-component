import React, { FC, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';

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

        init()
        createCanvas()
    }, [])
    async function getImg() {
        return new Promise((a, b) => {
            let img: HTMLImageElement = new Image()
            img.src = require('@/imgs/terrain_z1.jpg')
            img.onload = function () {
                // 打印
                console.log('width:' + img.width + ',height:' + img.height)

                a(img)
            }

        })
    }
    async function init() {
        let img = await getImg()




        let z = 0

        var width = window.innerWidth
        var height = window.innerHeight
        
        const scene = new THREE.Scene();
        var fov = 85;//拍摄距离
        var near = 1;//最小范围
        var far = 1200;//最大范围
        var camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
        camera.position.x = 0
        camera.position.y = 600
        camera.position.z = z
        camera.lookAt(scene.position)
        // var geometry = new THREE.PlaneGeometry(10, 10)
        // // 创建线（Line）材质
        // var textureLoader = new THREE.TextureLoader();

        // var textureNormal =  textureLoader.load(require('../../imgs/terrain_z1.jpg'),()=>{

        // });

        // var material = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00,
        //     opacity: 0.5,
        //     transparent: true,
        //     map: textureNormal,//设置颜色贴图属性值,

        // })
        // let mesh = new THREE.Mesh(geometry, material)
        // mesh.rotateX(-Math.PI/2)
        var light = new THREE.AmbientLight(0x404040)
        var axisHelper = new THREE.AxisHelper(250);
        var textureTree = new THREE.TextureLoader().load(require('@/imgs/rain.png'));
        var textureCloud = new THREE.TextureLoader().load(require('@/imgs/cloud.png'));
        // var textureTree = new THREE.TextureLoader().load(require('@/imgs/rain.png'));


        // var waterGeometry = new THREE.PlaneBufferGeometry(1000, 1000);
        // let water:any
        // // water = new Water(waterGeometry, {
        // //     scale: 2,
        // //     textureWidth: 1024,
        // //     textureHeight: 1024,
        // //     // flowMap: flowMap
        // // });
        // let waterNormals = new THREE.TextureLoader().load('@/img/waternormals.jpg', function (texture: any) {
        //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        // })
        // water = new Water(
        //     waterGeometry,
        //     {
        //         textureWidth: 512,
        //         textureHeight: 512,
        //         // alpha: 1.0,
        //         // sunDirection: light.position.clone().normalize(),
        //         // sunColor: 0xffffff,
        //         // waterColor: 0x001e0f,
        //         // distortionScale: 13.7,
        //         // fog: scene.fog !== undefined
        //     }
        // );

        // water.rotation.x = - Math.PI / 2;
        // water.position.y = -10;

        // scene.add(water);

        // scene.add(mesh)

        var geometry = new THREE.BoxGeometry(2048, 0, 2048); //创建一个立方体几何对象Geometry
        // 点渲染模式
        var material = new THREE.PointsMaterial({
            color: 0xff0000,
            size: 5.0 //点对象像素尺寸
        }); //材质对象
        var points = new THREE.Points(geometry, material); //点模型对象

        scene.add(await canvasTexture(img))
        // scene.add(await setupTerrainModel())
        let rainGroup = createRain(-200, -450)
        let rainGroup2 = createRain(410, -330)
        let rainGroup3 = createRain(-400, -300)
        let cloudGroup = createCloud()

        scene.add(canvasLight())
        scene.add(light)
        scene.add(axisHelper);
        scene.add(rainGroup);
        scene.add(rainGroup2);
        scene.add(rainGroup3);
        scene.add(cloudGroup);
        scene.add(points);
        scene.fog = new THREE.FogExp2('#ffffff', 0.00105);
        scene.fog = new THREE.Fog('#ffffff', 1, 3000);
        // createText(camera)

        var renderer = new THREE.WebGLRenderer({
            antialias: true // 开启抗齿锯效果
        })
        renderer.setClearColor(0xffffff)
        renderer.setSize(width, height)
        let box: any = document.querySelector('#home')
        if (box) {
            box.appendChild(renderer.domElement)
            box.addEventListener('mousedown', haha, false);
            box.addEventListener('mouseup', xx, false);
        }
        function haha() {
            box.addEventListener('mousemove', mousewheel, false);
        }
        function xx() {
            box.removeEventListener('mousemove', mousewheel, false);
        }
        // document.body.appendChild(renderer.domElement)


        // window.onresize = function () {
        //     // 重置渲染器输出画布canvas尺寸
        //     renderer.setSize(window.innerWidth, window.innerHeight);
        //     // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        //     camera.aspect = window.innerWidth / window.innerHeight;
        //     // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        //     // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        //     // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        //     camera.updateProjectionMatrix();
        // };
        function mousewheel(e: any): void {
            console.log(controls);


            // e.preventDefault();
            // //e.stopPropagation();

            // if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            //     if (e.wheelDelta > 0) { //当滑轮向上滚动时
            //         fov -= (near < fov ? 1 : 0);

            //     }
            //     if (e.wheelDelta < 0) { //当滑轮向下滚动时
            //         fov += (fov < far ? 1 : 0);
            //         // fov += (fov < far ? 1 : 0);


            //     }
            // } else if (e.detail) {  //Firefox滑轮事件
            //     if (e.detail > 0) { //当滑轮向上滚动时
            //         fov -= 1;

            //     }


            //     if (e.detail < 0) { //当滑轮向下滚动时
            //         fov += 1;


            //     }
            // }
            // // console.log(z);
            // if (fov > 75) {
            //     fov = 75
            // }
            // if (camera.fov > fov) {
            //     z += 6
            // } else if (camera.fov < fov) {
            //     z -= 6
            // }
            // console.log(z);

            // camera.fov = fov;
            // // console.log(z);

            // camera.position.z = z
            // camera.updateProjectionMatrix();
            // renderer.render(scene, camera);
            //updateinfo();
        }
        function render() {

            rainAnmation(rainGroup)
            rainAnmation(rainGroup2)
            rainAnmation(rainGroup3)
            cloudAnmation(cloudGroup)
            renderer.render(scene, camera)
            requestAnimationFrame(render);
            controls.update()

        }
        
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
        function createRain(x: number = 0, z: number = 0) {
            // 加载雨滴理贴图

            let group = new THREE.Group();
            // 批量创建表示雨滴的精灵模型
            for (let i = 0; i < 400; i++) {
                var spriteMaterial = new THREE.SpriteMaterial({
                    map: textureTree,//设置精灵纹理贴图
                });
                // 创建精灵模型对象
                var sprite = new THREE.Sprite(spriteMaterial);
                scene.add(sprite);
                // 控制精灵大小,
                sprite.scale.set(2, 2, 1); //// 只需要设置x、y两个分量就可以
                var k1 = Math.random() - 0.5;
                var k2 = Math.random() - 0.5;
                var k3 = Math.random() - 0.5;

                // 设置精灵模型位置，在整个空间上上随机分布
                sprite.position.set(100 * k1, 600 * k3, 300 * k2)
                group.add(sprite);
            }
            group.position.x = x
            group.position.y = 10
            group.position.z = z
            return group
        }
        function createCloud(x: number = 0, z: number = 0) {
            // 加载雨滴理贴图

            let group = new THREE.Group();
            // 批量创建表示雨滴的精灵模型
            for (let i = 0; i < 3; i++) {
                var spriteMaterial = new THREE.SpriteMaterial({
                    map: textureCloud,//设置精灵纹理贴图,
                    opacity: 0.1,
                    transparent: true

                });
                // 创建精灵模型对象
                var sprite = new THREE.Sprite(spriteMaterial);
                scene.add(sprite);
                // 控制精灵大小,
                sprite.scale.set(1500, 1500, 10); //// 只需要设置x、y两个分量就可以
                var k1 = Math.random() - 0.5;
                var k2 = Math.random() - 0.5;
                var k3 = Math.random() - 0.5;

                // 设置精灵模型位置，在整个空间上上随机分布
                sprite.position.set(1000 * k1, 1, 1000 * k2)
                group.add(sprite);
            }
            group.position.x = x
            group.position.y = 10
            group.position.z = z
            return group
        }
        var controls: any = new OrbitControls(camera, renderer.domElement);

        // controls.enablePan = false
        // controls.enableZoom  = false
        // controls.enableRotate = false
        // controls.screenSpacePanning = true
        // controls.maxDistance = 530
        // controls.minDistance = 200
        // controls.maxAzimuthAngle = 0
        // controls.minAzimuthAngle = 0
        // controls.maxPolarAngle = Math.PI/32
        // controls.minPolarAngle = 0



        controls.update();
        render()


        // controls.addEventListener('change', () => {
        // render()
        // })
    }

    function setupTerrainModel() {
        const readGeoTif = async () => {

            const rawTiff = await GeoTIFF.fromUrl(terrain);
            const tifImage = await rawTiff.getImage();
            const image = {
                width: tifImage.getWidth(),
                height: tifImage.getHeight()
            };


            /* 
            The third and fourth parameter are image segments and we are subtracting one from each,
             otherwise our 3D model goes crazy.
             https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js#L57
             */
            const geometry = new THREE.PlaneGeometry(
                image.width,
                image.height,
                image.width - 1,
                image.height - 1
            );
            const data = await tifImage.readRasters({ interleave: true });

            console.time("parseGeom");
            console.log();

            geometry.vertices.forEach((geom: any, index: number) => {
                geom.z = ((data[index] / 20) * -1) + 120;
            });
            console.timeEnd("parseGeom");

            const texture = new THREE.TextureLoader().load(mountainImage);
            const material = new THREE.MeshLambertMaterial({
                wireframe: false,
                side: THREE.DoubleSide,
                map: texture
            });

            const mountain = new THREE.Mesh(geometry, material);
            mountain.position.y = 0;
            mountain.rotation.x = Math.PI / 2;
            mountain.rotation.z = -2000;

            // scene.add(mountain);
            return mountain
            // this.scene.add(this.addText(100, 200, 100));

            // const loader = document.getElementById("loader");
            // loader.style.opacity = "-1";

            // // After a proper animation on opacity, hide element to make canvas clickable again
            // setTimeout(
            //     (() => {
            //         loader.style.display = "none";
            //     }),
            //     1500
            // );
        };


        return readGeoTif();
    }

    function canvasLight() {
        var point = new THREE.PointLight(0xffffff);
        point.position.set(0, 500, 0)
        return point

    }
    function canvasTexture(img: any) {
        return new Promise((a, b) => {

            // 纹理贴图映射到一个矩形平面上
            var geometry = new THREE.PlaneGeometry(img.width, img.height); //矩形平面
            // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
            var textureLoader = new THREE.TextureLoader();

            var textureNormal = textureLoader.load(require('../../imgs/threejs54EarthNormal.png'));
            // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
            textureLoader.load(require('../../imgs/terrain_z1.jpg'), function (texture: any) {
                var material = new THREE.MeshLambertMaterial({
                    // color: 0x0000ff,
                    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                    map: texture,//设置颜色贴图属性值,
                    normalMap: textureNormal, //法线贴图

                    normalScale: new THREE.Vector2(6, 6),

                }); //材质对象Material
                let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                mesh.rotateX(-Math.PI / 2)
                // scene.add(mesh); //网格模型添加到场景中
                a(mesh)
                //纹理贴图加载成功后，调用渲染函数执行渲染操作
                // render();
            })
        })



    }

    function createCanvas(): HTMLCanvasElement {
        var canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 128;
        var c = canvas.getContext('2d');
        if (c) {
            // 矩形区域填充背景
            // c.fillStyle = "#ff00ff";
            // c.fillRect(0, 0, 512, 128);
            // c.beginPath();
            // 文字
            // c.beginPath();
            // c.translate(256, 64);
            c.fillStyle = "#000000"; //文本填充颜色
            c.font = "bold 48px 宋体"; //字体样式设置
            c.textBaseline = "middle"; //文本与fillText定义的纵坐标
            c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
            c.fillText("自行车", 0, 0);
        }
        return canvas
        // document.body.appendChild(canvas)


    }


    return (
        <>
            <div id='home' ></div>
            {/* <canvas id='name' ></canvas> */}
        </>
    )

}

export default Home
