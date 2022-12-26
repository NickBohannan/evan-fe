import GalaxyManager from "./GalaxyManager";

export default class Moon {
    x: number;
    y: number;
    theta: number;
    radiusFromPlanet: number;
    velocity: number;
    diameter: number;

    constructor(diameter: number) {
        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.radiusFromPlanet = GalaxyManager.getRandomInt(20) + 20;
        this.velocity = Math.random() * .1;
        this.diameter = diameter;
    }
}