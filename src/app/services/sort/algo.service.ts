import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root'
})
export class AlgoService {

  size: number;
  maxSize:number;
  arr: Array<number>;
  done!:number;
  time: number;
  volume : number;
  synth = new Tone.Synth().toDestination();

  constructor() {
    this.maxSize = 50;
    let screenWidth = window.innerWidth;
    window.onresize = () => {
      screenWidth = window.innerWidth;
      this.resizeWindow(screenWidth);
    };

    this.resizeWindow(screenWidth);

    this.size = this.maxSize - 10;
    this.arr = Array.from({ length: this.size },() => Math.floor(Math.random() * this.size) + 1);

    this.time = 200 - 100;

    this.volume = 30;
    this.synth.volume.value = -this.volume;

  }

  // resizing array function used by slider
  resizeArray(s: any) {
    this.resetBg();
    this.size = Number(s);
    this.arr =  Array.from({ length: this.size },() => Math.floor(Math.random() * this.size) + 1);
  }

  resizeWindow(screenWidth:number){
    if(screenWidth > 425)
        this.maxSize = 50;
      if(screenWidth <= 425)
        this.maxSize = 25;
      if(screenWidth <= 375)
        this.maxSize = 20;
      if(screenWidth <= 320)
        this.maxSize = 17;
  }

  changeTime(t:any){
    this.time = 200 - Number(t);
  }

  changeVol(v:any){
    this.volume = 100 - Number(v);
    this.synth.volume.value = -this.volume;
  }

  resetBg(){
    const ele:any = document.querySelectorAll(".array-element");
    ele.forEach((e:any) => {
      e.style.background = "#d80757";
    });
  }

  generateMusicNotes(j:number){
    var data = ['C','D','E','F','G','A','B'];
    let note = Math.floor(Math.random() * data.length);

    if(j%2==0){
      this.synth.triggerAttackRelease(data[note]+'4',"16n");
    }else{
      this.synth.triggerAttackRelease(data[note]+'#'+String(note)+'4',"16n");
    }
  }

  // 1 . Bubble sort
  async bubbleSort() {

    let ddiv:any;
    this.resetBg();
    ddiv = document.querySelectorAll('.array-element');
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size - i-1; j++) {

        ddiv[j].style.background = 'white';
        ddiv[j+1].style.background = 'white';

        await this.waitforme(10);
        //sound
        this.generateMusicNotes(j);

        if (parseInt(ddiv[j].style.height) > parseInt(ddiv[j+1].style.height)) {
          let temp = ddiv[j].style.height;
          ddiv[j].style.height = ddiv[j+1].style.height;
          ddiv[j+1].style.height = temp;
        }

        ddiv[j].style.background = '#d80757';
        ddiv[j+1].style.background = '#d80757';
      }

      this.done = this.arr.length - i-1;
      ddiv[this.done].style.background = 'cyan';

    }
    // this.checkA = this.checkB = -1;
  }


  // 2. Selection Sort
  async selectionSort() {

    this.resetBg();
    const ele:any = document.querySelectorAll(".array-element");

    for(let i = 0; i < ele.length; i++){
        let min_index = i;
        // Change color of the position to swap with the next min
        ele[i].style.background = '#ea4d11';
        // this.checkA = i;
        for(let j = i+1; j < ele.length; j++){
            // Change color for the current comparision (in consideration for min_index)
            ele[j].style.background = 'white';

            await this.waitforme(10);
            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){
                if(min_index !== i){
                    // new min_index is found so change prev min_index color back to normal
                    ele[min_index].style.background = '#d80757';
                }
                min_index = j;
            }
            else{
                // if the currnent comparision is more than min_index change is back to normal
                ele[j].style.background = '#d80757';
            }
            //sound
            this.generateMusicNotes(j);
        }
        // await this.waitforme(10);
        this.swap(ele[min_index], ele[i]);
        // change the min element index back to normal as it is swapped
        ele[min_index].style.background = '#d80757';
        // change the sorted elements color to green
        ele[i].style.background = '#11eaea';
    }
  }


  async insertionSort(){
    this.resetBg();
    const ele:any = document.querySelectorAll(".array-element");
    // color
    ele[0].style.background = '#11eaea';
    for(let i = 1; i < ele.length; i++){
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = 'white';

        await this.waitforme(100);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            // color
            ele[j].style.background = 'white';
            ele[j + 1].style.height = ele[j].style.height;
            j--;
            //sound
            this.generateMusicNotes(j);

            await this.waitforme(100);

            // color
            for(let k = i; k >= 0; k--){
                ele[k].style.background = '#11eaea';
            }
        }
        ele[j + 1].style.height = key;
        // color
        ele[i].style.background = '#11eaea';
    }
  }

  mainMerge(){
    this.resetBg();
    let ele:any = document.querySelectorAll('.array-element');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    this.mergeSort(ele, l, r);
  }

  async merge(ele:any, low:any, mid:any, high:any){

    const n1 = mid - low + 1;
    const n2 = high - mid;
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
      //sound
      this.generateMusicNotes(i);
        await this.waitforme(10);
        // color
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
      //sound
      this.generateMusicNotes(i);
        await this.waitforme(10);
        // color
        ele[mid + 1 + i].style.background = 'yellow';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await this.waitforme(10);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        //sound
        this.generateMusicNotes(j);
        await this.waitforme(10);

        // To add color for which two r being compared for merging

        if(parseInt(left[i]) <= parseInt(right[j])){
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = '#11eaea';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }

            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = '#11eaea';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
      //sound
      this.generateMusicNotes(j);
        await this.waitforme(50);
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = '#11eaea';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
      //sound
      this.generateMusicNotes(j);
        await this.waitforme(50);
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = '#11eaea';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async mergeSort(ele:any, l:any, r:any){
    if(l >= r){
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await this.mergeSort(ele, l, m);
    await this.mergeSort(ele, m + 1, r);
    await this.merge(ele, l, m, r);
}


mainQuick(){
  this.resetBg();
  let ele:any = document.querySelectorAll('.array-element');
  let l = 0;
  let r = parseInt(ele.length) - 1;
  this.quickSort(ele, l, r);
}


async partitionLomuto(ele:any, l:any, r:any){
  let i = l - 1;
  // color pivot element
  ele[r].style.background = 'white';
  for(let j = l; j <= r - 1; j++){
      // color current element
      ele[j].style.background = 'yellow';
      // pauseChamp
      //sound
      this.generateMusicNotes(j);
      await this.waitforme(10);

      if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
          i++;
          this.swap(ele[i], ele[j]);
          // color
          ele[i].style.background = 'orange';
          if(i != j) ele[j].style.background = 'orange';
          // pauseChamp
          await this.waitforme(10);
      }
      else{
          // color if not less than pivot
          ele[j].style.background = '#7900ff';
      }
  }
  i++;
  // pauseChamp
  await this.waitforme(10);
  this.swap(ele[i], ele[r]); // pivot height one
  // color
  ele[r].style.background = '#7900ff';
  ele[i].style.background = 'cyan';

  // pauseChamp
  await this.waitforme(10);

  // color
  for(let k = 0; k < ele.length; k++){
      //sound
      this.generateMusicNotes(k);
      if(ele[k].style.background != 'cyan')
          ele[k].style.background = '#d80757';
  }

  return i;
}

async quickSort(ele:any, l:any, r:any){
  if(l < r){
      let pivot_index = await this.partitionLomuto(ele, l, r);
      await this.quickSort(ele, l, pivot_index - 1);
      await this.quickSort(ele, pivot_index + 1, r);
  }
  else{
      if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
          ele[r].style.background = 'cyan';
          ele[l].style.background = 'cyan';
      }
  }
}


  // wait function for animation or set set values.
  waitforme(time: number = this.time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, this.time);
    });
  }

  swap(el1:any, el2:any) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;

  }

}
