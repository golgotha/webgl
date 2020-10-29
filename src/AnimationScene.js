import {Scene, WebGLRenderer, DirectionalLight, PerspectiveCamera, Color, Vector3, Vector2} from 'three';
import Cube from "./Cube";
import Sphere from './Sphere';
import Sun from './Sun';

export default class AnimationScene {

    constructor(container) {
        this.container = container;
    }

    create() {
        this.scene = new Scene();
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        console.log(this.container.offsetWidth)
        this.container.appendChild(this.renderer.domElement);

        this.camera = new PerspectiveCamera(50, this.container.offsetWidth / this.container.offsetHeight, .1, 1000);
        this.camera.position.y = 0;
        this.camera.position.x = 0;
        this.camera.position.z = 25;

        this.t = 0;

        this.light = new DirectionalLight();
        this.light.position.set(0, 0, 5);
        this.scene.add(this.light);
        this.scene.add(new Sun().create());

        const colors = ['green', 'yellow', 'red', 'blue', 'white'];
        this.planets = [];
        for (let i = 0; i < colors.length; i++) {
            const radius = 0.2 * i * colors.length + 2;
            const position = new Vector3(radius, 0, 0)
            const planet = new Sphere({
                radius: 0.2,
                widthSegments: 16,
                heightSegments: 16,
                color: new Color(colors[i]),
                position
            }).create();
            this.planets.push({planet, radius});
            this.scene.add(planet);
        }
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.update();
    }

    destroy() {
        cancelAnimationFrame(this.requestAnimationFrameId);
    }

    update = (time) => {
        this.requestAnimationFrameId = requestAnimationFrame(this.update);
        // this.camera.position.z = Math.max(2, this.camera.position.z - 0.05);
        // this.cube.rotation.x += .01;
        const now = Date.now();
        const elapsed = now - this.then;

        // if enough time has elapsed, draw the next frame
        if (elapsed > this.fpsInterval) {

            // Get ready for next frame by setting then=now, but also adjust for your
            // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
            this.then = now - (elapsed % this.fpsInterval);
            const velocity = this.fpsInterval / 1000;
            console.log('velocity', velocity, this.fpsInterval)
            // Put your drawing code here
            this.planets.forEach((e, i) => {
                const fi = 2 * Math.PI / velocity * (0.2 + i*0.2);
                e.planet.position.x =  e.radius * Math.cos(fi * elapsed);
                e.planet.position.y = e.radius * Math.sin(fi * elapsed);
            })
            this.renderer.render(this.scene, this.camera);
        }
    }

}