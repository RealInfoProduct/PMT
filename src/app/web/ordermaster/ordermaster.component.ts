import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ordermaster',
  templateUrl: './ordermaster.component.html',
  styleUrls: ['./ordermaster.component.scss']
})
export class OrdermasterComponent implements OnInit {

  orderform! : FormGroup

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.orderdata()

  }

  orderdata(){
    this.orderform = this.formbuilder.group({
      details : [''],
      platform : [''],
      amount : [''],
      date : [''],
    })
  }


  ordermasterdata(){
console.log(this.orderform.value);

  }
}
