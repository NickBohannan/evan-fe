export default class Galaxy {
    public stars: Star[];

    constructor() {
        this.stars = [];
    }
}

interface Star {
    Diameter: number
    Y: number
    Planets: Planet[]
    X: number
    Name: string
}

interface Planet {
    HasCivilization: boolean
    Distance: number
    Name: string
    Type: string
    Diameter: number
    Civilization: any
    IsHabitable: boolean
}