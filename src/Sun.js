import Sphere from './Sphere';
import {Color, Vector3} from 'three';

export default class Sun extends Sphere {
    constructor() {
        super({
            radius: 1, widthSegments: 32, heightSegments: 32,
            color: new Color("orange"),
            position: new Vector3(0, 0, 0)
        });
    }
}