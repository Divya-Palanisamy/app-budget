import { Component, Input, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';

import { Budget } from "../../model/budget";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  itemsEarned: Budget[]=[];
  itemsSpent: Budget[]=[];
  isIncome: boolean = true;
  trash = faTrash;
  @Input()
  amount: number = 0;
  constructor(private calcService: CalculatorService, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.calcService.getItemsEarned().subscribe(
      (items)=>{
        this.itemsEarned = items;
      }
    )
    this.calcService.getItemsSpent().subscribe(
      (items)=>{
        this.itemsSpent = items;
      }
    )
    this.amount = this.calcService.getAmount();
    
  }


  deleteItem(item: Budget, type: boolean){
    this.calcService.deleteItem(item,type);
    if(type===false)
    this.amount += item.amount;
    else if(type===true)
    this.amount -= item.amount;

    this.toastr.success('Deleted an item');
  }


}
