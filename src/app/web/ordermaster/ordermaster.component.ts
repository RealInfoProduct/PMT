import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  orderform!: FormGroup
  orderdId: any
  isLoading: boolean = false
  orderList: any
  platFormList: any

  constructor(private formbuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.orderdata()
    this.getAllOrderList()
    const selectedDateValue = new Date(); // Your desired date value
    this.orderform.controls['date'].setValue(selectedDateValue)
  }

  orderdata() {
    this.orderform = this.formbuilder.group({
      details: ['', Validators.required],
      platform: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  getAllOrderList() {
    this.isLoading = true
    this.firebaseService.getOrderList().subscribe((res: any) => {
      if (res) {
        this.orderList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.isLoading = false
      }
    })

    this.firebaseService.getPlatformList().subscribe((res: any) => {
      if (res) {
        this.platFormList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.orderform.controls['platform'].setValue(this.platFormList[0])
        this.isLoading = false
      }
    })
  }

  neworderform(){
    this.orderform.reset()
    this.orderdId = ''
  }
  
  ordermasterdata() {
    const payload: OrderList = {
      id: '',
      loginId: localStorage.getItem('loginId'),
      platFormName: this.orderform.value.platform.platFormName,
      name: this.orderform.value.details,
      date: moment(this.orderform.value.date).format(),
      amount: this.orderform.value.amount
    }


    if (!this.orderdId) {
      this.isLoading = true
      this.firebaseService.addOrderList(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.orderform.controls['details'].reset()
        this.orderform.controls['platform'].reset()
        this.orderform.controls['amount'].reset()
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
        this.orderdId = ''
        this.orderform.reset()
        const selectedDateValue = new Date(); // Your desired date value
        this.orderform.controls['date'].setValue(selectedDateValue)
        this.getAllOrderList()
        this.isLoading = false
      })
    }
  }


  editData(data: any , index:any) {
    this.orderdId = data.id
    this.orderform.controls['date'].setValue(new Date(data.date))
    this.orderform.controls['details'].setValue(data.name)
    this.orderform.controls['platform'].setValue(this.platFormList.find((id: any) => id.platFormName === data.platFormName))
    this.orderform.controls['amount'].setValue(data.amount)
    this.orderList.splice(index, 1)
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
