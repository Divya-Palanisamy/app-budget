import { Injectable } from '@angular/core';
import {of} from 'rxjs';
import { Budget } from '../model/budget';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  itemsEarned: Budget[];
  itemsSpent: Budget[];
  totalAmount:number = 0;
  constructor() { 
  this.itemsEarned = [],
  this.itemsSpent = []
  this.totalAmount = 0;
  }

  getItemsSpent(){
    return of(this.itemsSpent);
  }
  getItemsEarned(){
    return of(this.itemsEarned);
  }
  getAmount(){
    return this.totalAmount;
  }


  addItem(item: Budget, type: string){
    if(type==="income"){
      this.itemsEarned.push(item);
      this.totalAmount += item.amount;
    }
    else if(type==="expense"){
      this.itemsSpent.push(item);
      this.totalAmount -= item.amount;
    }
    return this.totalAmount;
    
  }

  deleteItem(item: Budget, type: boolean){
    if(type){
      const index = this.itemsEarned.findIndex(
        (currentItem)=> currentItem.id==item.id,
      );
      this.itemsEarned.splice(index,1);
    }
    else{
      const index = this.itemsSpent.findIndex(
        (currentItem)=> currentItem.id==item.id,
      );
      this.itemsSpent.splice(index,1);
    }
  }
}
