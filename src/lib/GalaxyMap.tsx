
import { useLayoutEffect } from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import GalaxyManager from "./GalaxyManager";
import Planet from "./Planet";
import Galaxy from "./Galaxy";
import GalaxyWebAPI from "./GalaxyWebAPI";

interface IComponentProps { }

export const GalaxyMap: React.FC<IComponentProps> = (props: IComponentProps) => {
    let system: StarSystem;
    let starField: number[][];
    let galaxy: any;

    useLayoutEffect(() => {
        GalaxyWebAPI.getInitialGalaxy('https://localhost:5001/GenerateGalaxy?starNumber=12').then(res => {
            galaxy = res;
        });
    });

    const setup = (p5: p5Types) => {
        system = new StarSystem(p5);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(0);
        p5.frameRate(30);
        starField = GalaxyManager.generateStarFieldCoords(p5, 200);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.fill(255);
        starField.forEach((coord) => p5.ellipse(coord[0], coord[1], 3, 3));
        p5.translate(p5.width / 2, p5.height / 2);

        system.drawStar();
        system.drawPlanets();
        system.drawMoons();
    };

    class StarSystem {
        x: number;
        y: number;
        center: number;
        radius: number;
        velocity: number;
        p5: p5Types;
        planets: Planet[];

        constructor(p5: p5Types) {
            this.x = 0;
            this.y = 0;
            this.center = 0;
            this.radius = 100;
            this.velocity = 0.01;
            this.p5 = p5;
            this.planets = GalaxyManager.generatePlanets(GalaxyManager.getRandomInt(6));
        };

        drawStar(): void {
            this.p5.fill(200, 0, 0);
            this.p5.ellipse(this.center, this.center, 60, 60);
        };

        drawPlanets(): void {
            this.planets.forEach(planet => {
                planet.theta += planet.velocity;
                planet.x = planet.radiusFromStar * this.p5.cos(planet.theta);
                planet.y = planet.radiusFromStar * this.p5.sin(planet.theta);
                this.p5.fill(planet.color);
                this.p5.ellipse(planet.x, planet.y, 30, 30);
            });
        };

        drawMoons(): void {
            this.p5.fill(130, 0, 255);
            this.planets.forEach(planet => {
                planet.moons.forEach(moon => {
                    moon.theta += moon.velocity;
                    moon.x = planet.x + (moon.radiusFromPlanet * this.p5.cos(-moon.theta - 5));
                    moon.y = planet.y + (moon.radiusFromPlanet * this.p5.sin(-moon.theta - 5));
                    this.p5.ellipse(moon.x, moon.y, moon.diameter, moon.diameter);
                });
            });
        };
    }

    return <Sketch setup={setup} draw={draw} />;
};