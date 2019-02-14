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

