import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface IComponentProps {
    //Your component props
}

export const GalaxyMap: React.FC<IComponentProps> = (props: IComponentProps) => {
    let theta: number = 0;
    let system: StarSystem;
    let starField: number[][];

    const setup = (p5: p5Types) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(0);
        p5.frameRate(30);
        starField = generateStarFieldCoords(p5, p5.windowWidth, p5.windowHeight, 200);
    };

    const draw = (p5: p5Types) => {
        system = new StarSystem(p5);
        p5.background(0);
        p5.fill(255);
        starField.forEach((coord) => p5.ellipse(coord[0], coord[1], 3, 3));
        p5.translate(p5.width / 2, p5.height / 2);
        system.sun();
        system.planet();
        system.moon();
    };

    const generateStarFieldCoords = (p5: p5Types, maxWidth: number, maxHeight: number, starNum: number) => {
        let starFieldCoords: number[][] = [];
        for (let i = 0; i < starNum; i++) {
            starFieldCoords[i] = [Math.floor(Math.random() * maxWidth), Math.floor(Math.random() * maxHeight)];
        }
        return starFieldCoords;
    };

    class StarSystem {
        x: number;
        y: number;
        center: number;
        radius: number;
        velocity: number;
        p5: p5Types;

        constructor(p5: p5Types) {
            this.x = 0;
            this.y = 0;
            this.center = 0;
            this.radius = 100;
            this.velocity = 0.01;
            this.p5 = p5;
        }

        sun(): void {
            this.p5.fill(200, 0, 0);
            this.p5.ellipse(this.center, this.center, 60, 60);
        }

        planet(): void {
            this.p5.fill(100, 0, 255);
            theta += this.velocity
            this.x = this.radius * this.p5.cos(theta)
            this.y = this.radius * this.p5.sin(theta)
            this.p5.ellipse(this.x, this.y, 30, 30)
        }

        moon(): void {
            this.p5.fill(130, 0, 255);
            this.x = this.x + (this.radius / 3 * this.p5.cos(-theta - 5));
            this.y = this.y + (this.radius / 3 * this.p5.sin(-theta - 5));
            this.p5.ellipse(this.x, this.y, 15, 15);
        }
    }

    return <Sketch setup={setup} draw={draw} />;
};