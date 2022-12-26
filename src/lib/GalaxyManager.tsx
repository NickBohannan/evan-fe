import Moon from "./Moon";
import Planet from "./Planet";
import p5Types from "p5";

export default class GalaxyManager {
    static generateStarFieldCoords(p5: p5Types, maxWidth: number, maxHeight: number, starNum: number) {
        let starFieldCoords: number[][] = [];
        for (let i = 0; i < starNum; i++) {
            starFieldCoords[i] = [this.getRandomInt(maxWidth), this.getRandomInt(maxHeight)];
        }
        return starFieldCoords;
    };

    static generatePlanets(planetNum: number) {
        let planets: Planet[] = [];
        for (let i = 0; i < planetNum; i++) {
            planets.push(new Planet(Math.random() * .01, this.getRandomInt(200) + 50, 25, 'green', this.generateMoons(this.getRandomInt(4))));
        }
        return planets;
    }

    static generateMoons(moonNum: number) {
        let moons: Moon[] = [];
        for (let i = 0; i < moonNum; i++) {
            moons.push(new Moon(8));
        }
        return moons;
    }

    static getRandomInt(x: number) {
        return Math.floor(Math.random() * x);
    }
}