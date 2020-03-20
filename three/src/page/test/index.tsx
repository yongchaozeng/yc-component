import React, { FC, useEffect } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import './index.less'

let THREE = require('three');
var classNames = require('classnames');


interface Test {

}



const Test: FC<Test> = (props) => {

    useEffect(() => {
        let a = new CreateThree()
    }, [])


    var textureLoader = new THREE.TextureLoader();

    class CreateThree {
        scene: any
        camera: any
        renderer: any
        constructor() {
            this.scene = null
            this.camera = null
            this.renderer = null
            this.init()
            this.animate()



        }
        init() {


            let scene, camera, renderer;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xcfcfcf);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 4000);
            camera.position.set(0, 1200, 0);

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;

            this.createMap()
            this.createLight()
            this.createCity()
            this.createLandmark()

            window.onresize = this.updateThree.bind(this)

            var controls = new OrbitControls(camera, renderer.domElement);
            controls.target = new THREE.Vector3(0, 70, 0);

        }

        createLandmark() {
            let arr: any[] = []
            arr.map((item, index) => {

            })
            this.scene.add(this.createLandmarkImg('https://yz.lol.qq.com/v1/map/images/pins/capital.png'))
            this.scene.add(this.createLandmarkText())
        }

        createLandmarkImg(img: string) {
            //先用画布将文字画出

            //使用Sprite显示文字
            let texture = new THREE.TextureLoader().load(require('@/imgs/capital.png'));
            let material = new THREE.SpriteMaterial({ map: texture });
            let textObj = new THREE.Sprite(material);
            textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
            textObj.position.set(0, 10, 98);
            return textObj;
        }
        createLandmarkText() {
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
        createCity() {

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
            let group2 = new THREE.Group()
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
            group2.renderOrder = 1;
            group2.rotation.x = -0.5 * Math.PI;
            this.scene.add(group2)
        }
        createLight() {
            var light = new THREE.AmbientLight(0xe1e1e1, .1);
            light.position.set(400, 200, -200);
            this.scene.add(light);
            // 坐标
            var axesHelper = new THREE.AxesHelper(1000);
            this.scene.add(axesHelper)

            var ambientLight = new THREE.AmbientLight(0xcccccc, .4);
            this.scene.add(ambientLight);

            var directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
            directionalLight.position.set(0, 1200, 0);
            this.scene.add(directionalLight);
        }
        createMap() {


            let group, land: any, water: any, sea: any;
            land = createLand()
            water = createWater()
            sea = createSea()
            group = new THREE.Group()
            group.add(water, land, sea);
            group.rotation.x = -0.5 * Math.PI;
            water.position.z = -1
            sea.position.z = -2
            this.scene.add(group);

            function createLand() {
                let box = new THREE.PlaneGeometry(4096, 2048, 0, 0)
                var texture = textureLoader.load("https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/g_land.png");
                var textureNormal = textureLoader.load("https://static.web.sdo.com/dn/pic/dn_18act/DnIp/map/bgMapNormal.jpg");

                var material = new THREE.MeshStandardMaterial({
                    map: texture,
                    normalScale: new THREE.Vector2(2.9, 2.9),
                    //specularMap: textureSpecular,
                    transparent: true,
                    normalMap: textureNormal,
                    opacity: 1,
                    depthTest: false
                });

                return new THREE.Mesh(box, material);
            }

            function createWater() {
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
                return water
            }
            function createSea() {
                let box = new THREE.PlaneGeometry(4096, 2048, 0, 0)
                var seaTexture = textureLoader.load(require('@/imgs/下载.jpg'));

                var seaMaterial = new THREE.MeshStandardMaterial({
                    // color: '#1E90FF',
                    map: seaTexture,
                    // map: texture,
                    // normalScale: new THREE.Vector2(2.9, 2.9),
                    //specularMap: textureSpecular,

                    // normalMap: textureNormal,

                    depthTest: false
                });
                return new THREE.Mesh(box, seaMaterial);
            }
        }


        animate() {

            requestAnimationFrame(this.animate.bind(this));
            this.render()
        }

        render() {
            this.renderer.render(this.scene, this.camera);
        }
        updateThree() {

            // 重置渲染器输出画布canvas尺寸
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
            this.camera.aspect = window.innerWidth / window.innerHeight;
            // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
            // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
            // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
            this.camera.updateProjectionMatrix();
        }
    }




    return (
        <div id='gl'></div>
    )

}

export default Test
