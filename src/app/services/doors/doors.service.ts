import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';
import { Condition, DoorsBattery } from './models';
import { Utils } from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DoorsService implements IExperiment {

  condition: Condition;
  doorsBattery: DoorsBattery;

  constructor() { }

  public setupExperiment(): void {
    console.log('[DoorsService] setupExperiment()');
    this.resetData();
    this.chooseCondition();
    this.setDoors();
  }

  public resetData() {
    this.condition = null;
    this.doorsBattery = null;
  }

  setDoors() {
    this.doorsBattery = new DoorsBattery();
  }

  chooseCondition() {

    // Get condition ids from local storage
    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem('isrc-doors-conds'));
    } catch (error) {
      console.log('Error parsing condition ids from json', error);
    }

    // If not present, set initial condition ids
    if (ids == null || ids.length === 0) {
      ids = this.setInitialConditions();
    }

    // Shuffle the condition ids
    ids = Utils.getShuffledCopy(ids);

    // Pick condition
    const conds = Condition.getAll();
    const id = ids.shift();
    this.condition = conds[id];

    // Update condition ids in local storage
    localStorage.setItem('isrc-doors-conds', JSON.stringify(ids));

    console.log('[DoorsService] Condition chosen', this.condition);

  }

  setInitialConditions(): number[] {
    // Save an array with 10 possible condition ids to local Storage
    let ids = Array(5).fill(0).concat(Array(5).fill(1));
    console.log("original ids: ", ids);
    ids = Utils.getShuffledCopy(ids);
    localStorage.setItem('isrc-doors-conds', JSON.stringify(ids));
    return ids;
  }

  public getExperimentData() {

    // TODO: fill data

    const data = {
      condition: this.condition,
      doors: this.doorsBattery
    };

    return data;
  }

}
