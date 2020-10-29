import {SphereGeometry, Mesh, MeshLambertMaterial, Vector3} from 'three';

export default class Sphere {

    constructor({radius, widthSegments, heightSegments, color, position}) {
        this.geometry = new SphereGeometry(radius, widthSegments, heightSegments);
        this.material = new MeshLambertMaterial({ color: color });
        this.position = position;
    }

    create() {
        this.sphere = new Mesh(this.geometry, this.material);
        this.sphere.position.copy(this.position);
        this.sphere.rotation.x = Math.random();
        this.sphere.rotation.y = Math.random();
        this.sphere.rotation.z = Math.random();
        return this.sphere;
    }

}