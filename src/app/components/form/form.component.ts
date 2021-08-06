import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Budget } from 'src/app/model/budget';
import { CalculatorService } from 'src/app/services/calculator.service';
import {v4 as idv4} from "uuid";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  description: string='';
  amount: number =0;
  type: string ='';
  totAmount =0;
  constructor(private calcService: CalculatorService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  handleAdd(){
    const addAmount : Budget ={
      id: idv4(),
      date: new Date(),
      description: this.description,
      amount: this.amount,
    };

    if(this.type==="income"){
      if(this.description===" " || this.description===""){
        this.toastr.error("Enter Description");
        return;
      }
      if(this.amount===0){
        this.toastr.error("Enter Amount");
        return;
      }
      
      this.totAmount =  this.calcService.addItem(addAmount,"income");
      this.toastr.success("Income Added");

    }else if(this.type==="expense"){
      if(this.description===" " || this.description===""){
        this.toastr.error("Enter Description");
        return;
      }
     
      if(this.amount===0){
        this.toastr.error("Enter Amount");
        return;
      }
     
      this.totAmount = this.calcService.addItem(addAmount,"expense");
      this.toastr.success("Expense Added");
  
    }
    else{
      this.toastr.warning("Select Income/Expense");
    }
    
    this.description='';
    this.amount=0;
  }

}
