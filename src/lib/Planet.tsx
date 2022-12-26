import Moon from "./Moon";

export default class Planet {
    x: number;
    y: number;
    theta: number;
    velocity: number;
    radiusFromStar: number;
    diameter: number;
    color: string;
    moons: Moon[];

    constructor(velocity: number, radiusFromStar: number, diameter: number, color: string, moons: Moon[]) {
        this.x = 0;
        this.y = 0;
        this.theta = 0;
        this.radiusFromStar = radiusFromStar;
        this.diameter = diameter;
        this.velocity = velocity;
        this.moons = moons;
        this.color = color;
    }
}