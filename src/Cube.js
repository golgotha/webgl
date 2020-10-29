import {BoxGeometry, Mesh, MeshLambertMaterial, Vector3} from 'three';

export default class Cube {

    constructor({width, height, depth, color, position}) {
        this.geometry = new BoxGeometry(width,height,depth);
        this.material = new MeshLambertMaterial({ color: color });

        this.position = position;
    }

    create() {
        this.box = new Mesh(this.geometry, this.material);
        this.box.position.copy(this.position);
        this.box.rotation.x = Math.random();
        this.box.rotation.y = Math.random();
        this.box.rotation.z = Math.random();
        return this.box;
    }

}