import { Component, OnInit } from '@angular/core';
import { AlgoService } from 'src/app/services/sort/algo.service';
import * as Tone from 'tone';

@Component({
  selector: 'app-algo-visual',
  templateUrl: './algo-visual.component.html',
  styleUrls: ['./algo-visual.component.scss'],
})
export class AlgoVisualComponent implements OnInit {

  disable: boolean = false;
  clicked: number = 0;
  algo: string = "";
  constructor(public sv: AlgoService) {

  }

  ngOnInit(): void {}

  // todo : mediaquery to be added.

  async sortAlgo(n: number) {
    this.disable = true;
    switch (n) {
      case 1:
        this.clicked = 1;
        this.algo = "Bubble Sort";
        await this.sv.bubbleSort();
        break;
      case 2:
        this.clicked = 2;
        this.algo = "Selection Sort";
        await this.sv.selectionSort();
        break;
      case 3:
        this.clicked = 3;
        this.algo = "Insertion Sort";
        await this.sv.insertionSort();
        break;
      case 4:
        this.clicked = 4;
        this.algo = "Merge Sort";
        await this.sv.mainMerge();
        break;
      case 5:
        this.clicked = 5;
        this.algo = "Quick Sort";
        await this.sv.mainQuick();
        break;
    }
    this.disable = false;
    this.clicked = 0;
    this.algo = "";
  }
}
