import React, { FC, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.less'
import city from '@/utils/china.json'
// import * as terrain from "@/utils/agri-medium-dem.tif";
// import * as mountainImage from "@/utils/agri-medium-autumn.jpg";
import * as terrain from "@/utils/agri-small-dem.tif";
import * as mountainImage from "@/utils/agri-small-autumn.jpg";
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
    async function init() {

        var width = window.innerWidth
        var height = window.innerHeight

        const scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 800)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 16
        camera.lookAt(scene.position)
        var geometry = new THREE.BoxGeometry(10, 10, 10)
        // 创建线（Line）材质
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0.5,
            transparent: true

        })
        let mesh = new THREE.Mesh(geometry, material)
        var light = new THREE.AmbientLight(0x404040)
        var axisHelper = new THREE.AxisHelper(250);


        scene.add(mesh)
        scene.add(await setupTerrainModel())
        scene.add(canvasLight())
        scene.add(light)
        scene.add(axisHelper);

        // createText(camera)

        var renderer = new THREE.WebGLRenderer({
            antialias: true // 开启抗齿锯效果
        })
        renderer.setClearColor(0xffffff)
        renderer.setSize(width, height)
        if (document.querySelector('#home')) {
            (document.querySelector('#home') as HTMLDivElement).appendChild(renderer.domElement)
        }
        // document.body.appendChild(renderer.domElement)

        function render() {
            renderer.render(scene, camera)
        }
        render()

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener('change', () => {
            render()
        })
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
    function canvasTexture() {
        return new Promise((a, b) => {

            // 纹理贴图映射到一个矩形平面上
            var geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
            // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
            var textureLoader = new THREE.TextureLoader();

            var textureNormal = textureLoader.load(require('../../imgs/depth_z1.jpg'));
            // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
            textureLoader.load(require('../../imgs/terrain_z1.jpg'), function (texture: any) {
                var material = new THREE.MeshLambertMaterial({
                    // color: 0x0000ff,
                    // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
                    normalMap: textureNormal, //法线贴图
                    map: texture,//设置颜色贴图属性值,

                }); //材质对象Material
                let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                console.log(666, mesh);

                // scene.add(mesh); //网格模型添加到场景中
                a(mesh)
                //纹理贴图加载成功后，调用渲染函数执行渲染操作
                // render();
            })
        })


        // let a = new Image()
        // a.src = require('@/imgs/terrain_z1.jpg')
        // console.log(a.width);   

        // let canvas: HTMLCanvasElement = createCanvas()
        // let texture = new THREE.CanvasTexture(canvas);
        // let geometry = new THREE.PlaneGeometry(5, 5)

        // let material = new THREE.MeshPhongMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide
        // })
        // let mesh = new THREE.Mesh(geometry, material)
        // mesh.position.x = x
        // mesh.position.y = y + 1
        // mesh.position.z = z

        // mesh.rotateX(-Math.PI / 2)
        // return mesh
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
    function createText(camera: any) {
        const width = window.innerWidth
        const height = window.innerHeight
        let canvas: HTMLCanvasElement | null = document.querySelector('#name')

        // let canvas = document.createElement('canvas')
        if (!canvas) return
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return
        const offCanvas = document.createElement('canvas')
        offCanvas.width = width
        offCanvas.height = height
        const ctxOffCanvas = offCanvas.getContext('2d');
        if (!ctxOffCanvas) return
        ctxOffCanvas.font = '16.5px Arial';
        ctxOffCanvas.strokeStyle = '#FFFFFF';
        ctxOffCanvas.fillStyle = '#000000';

        // 遍历场景中的元素, 在元素上方添加方块: 未来添加具体标签
        const texts: any = [];
        city.features.forEach((elem, index) => {
            console.log(elem)
            if (!elem.properties || !elem.properties.centroid) return
            const y = -elem.properties.centroid[1]
            const x = elem.properties.centroid[0]
            const z = 4
            const vector = new THREE.Vector3(x, y, z)
            const position = vector.project(camera)
            const name = elem.properties.name
            const left = (vector.x + 1) / 2 * width
            const top = -(vector.y - 1) / 2 * height
            const text = {
                name,
                left,
                top,
                width: ctxOffCanvas.measureText(name).width,
                height: 16.5
            }
            let show = true
            for (let i = 0; i < texts.length; i++) {
                if (
                    (text.left + text.width) < texts[i].left ||
                    (text.top + text.height) < texts[i].top ||
                    (texts[i].left + texts[i].width) < text.left ||
                    (texts[i].top + texts[i].height) < text.top
                ) {
                    show = true
                } else {
                    show = false
                    break
                }
            }

            if (show) {
                texts.push(text)
                ctxOffCanvas.strokeText(name, left, top)
                ctxOffCanvas.fillText(name, left, top)
                console.log(7)
            }
        })
        ctx.drawImage(offCanvas, 0, 0)
        // document.body.appendChild(offCanvas)
    }


    return (
        <>
            <div id='home' ></div>
            {/* <canvas id='name' ></canvas> */}
        </>
    )

}

export default Home
