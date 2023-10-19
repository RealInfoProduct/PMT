import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-ordermaster',
  templateUrl: './ordermaster.component.html',
  styleUrls: ['./ordermaster.component.scss']
})
export class OrdermasterComponent implements OnInit {

  orderform! : FormGroup
  orderdId :any
  isLoading :boolean = false
  orderList : any
  platFormList: any



  constructor(private formbuilder : FormBuilder,
    private firebaseService :FirebaseService ,
    private messageService : MessageService,
    private confirmationService :ConfirmationService) { }

  ngOnInit(): void {
    this.orderdata()
    this.getAllOrderList()
  }

  orderdata(){
    this.orderform = this.formbuilder.group({
      details : [''],
      platform : [''],
      amount : [''],
      date : [''],
    })
  }

  getAllOrderList(){
    this.isLoading = true
    this.firebaseService.getOrderList().subscribe((res: any) => {
      if (res) {
        this.orderList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))        
        console.log(this.orderList);
        this.isLoading = false
      }
    })

   this.firebaseService.getPlatformList().subscribe((res: any) => {
      if (res) {
        this.platFormList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))        
        this.isLoading = false
      }
    })
  }

  newOrder(){
    this.orderform.reset()
    this.orderdId = ''
  }
  
  ordermasterdata(){
    const payload : OrderList = {
      id: '',
      loginId: localStorage.getItem('loginId'),
      platFormName: this.orderform.value.platform.platFormName,
      name: this.orderform.value.details,
      date: moment(this.orderform.value.date).format(),
      amount: this.orderform.value.amount
    }

    console.log(payload);

    if (!this.orderdId) {
      this.isLoading = true
      this.firebaseService.addOrderList(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.getAllOrderList()
        this.isLoading = false
      })
    } else {
      this.firebaseService.updateOrderList(this.orderdId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.getAllOrderList()
        this.isLoading = false
      })
    }
  }


  editData(data:any){
    this.orderdId = data.id
  }

  deleteOrderlist(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deleteOrderList(item).then(res => {
          this.messageService.add({
            severity: msgType.success,
            summary: 'Sucess',
            detail: 'Data Delete Successfully..',
            life: 1500,
          });
          this.isLoading = false
        })
      }
    })
  }
}
