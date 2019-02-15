import { Utils } from '../common/utils';

export enum Animal {
    Crocodile = 'croc',
    Elephant = 'elephant',
    Hippo = 'hippo',
    Lion = 'lion',
    Toucan = 'toucan',
    Turtle = 'turtle',
    Whale = 'whale',
    Zebra = 'zebra'
}

export enum DoorState {
    Closed = 'closed',
    Open = 'open',
    OpenCrocodile = 'open-croc',
    OpenElephant = 'open-elephant',
    OpenHippo = 'open-hippo',
    OpenLion = 'open-lion',
    OpenToucan = 'open-toucan',
    OpenTurtle = 'open-turtle',
    OpenWhale = 'open-whale',
    OpenZebra = 'open-zebra'
}

export class DoorsBattery {
    doorsOpened: number;
    initialTimestamp: number;
    finalTimestamp: number;
    duration: number;

    constructor() {
        this.doorsOpened = 0;
    }

    openDoor() {
        this.doorsOpened++;
    }

    start() {
        this.initialTimestamp = Date.now();
    }

    stop() {
        this.finalTimestamp = Date.now();
        this.duration = this.finalTimestamp - this.initialTimestamp;
    }
}

export class AnimalDoorConverter {

    public static animalToDoor(animal: Animal): DoorState {
        switch (animal) {
            case Animal.Crocodile:
                return DoorState.OpenCrocodile;
            case Animal.Elephant:
                return DoorState.OpenElephant;
            case Animal.Hippo:
                return DoorState.OpenHippo;
            case Animal.Lion:
                return DoorState.OpenLion;
            case Animal.Toucan:
                return DoorState.OpenToucan;
            case Animal.Turtle:
                return DoorState.OpenTurtle;
            case Animal.Whale:
                return DoorState.OpenWhale;
            case Animal.Zebra:
                return DoorState.OpenZebra;
            default:
                return DoorState.Open;
        }
    }
}

export class Condition {
    id: string;
    animalsNumber: number;
    animals: Animal[];
    animalShowed: Animal;

    constructor(id: string, animalsNumber: number) {
        this.id = id;
        this.animalsNumber = animalsNumber;

        // Pick animalsNumber random animals
        const allAnimals = [
            Animal.Crocodile, Animal.Elephant, Animal.Hippo, Animal.Lion, Animal.Toucan,
            Animal.Turtle, Animal.Whale, Animal.Zebra]
            ;
        Utils.shuffleArray(allAnimals);
        this.animals = allAnimals.slice(0, animalsNumber);

        // Pick random animal to show
        Utils.shuffleArray(allAnimals);
        this.animalShowed = allAnimals[0];
    }

    static getAll(): Condition[] {
        return [
            new Condition('1-animals', 1),
            new Condition('4-animals', 4),
            new Condition('8-animals', 8)
        ];
    }

}

