import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BalanceList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.scss']
})
export class BalancesheetComponent implements OnInit {

  balanceform!: FormGroup
  paymentMethod: any = [
    {
      paymentMethodName: "Credit"
    },
    {
      paymentMethodName: "Debit"
    },
  ]
  isLoading: boolean = false
  balanceList :any
  balanceCreditData :any
  balanceCreditTotal :number = 0
  balanceDebitData :any
  balanceDebitDataTotal :number = 0
  remainingBalance: number = 0
  balanceId :any



  constructor(private formbuilder: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService :ConfirmationService) { }

  ngOnInit(): void {
    this.balancesheetdata()
    this.getAllBalanceList()
    const selectedDateValue = new Date(); // Your desired date value
    this.balanceform.controls['date'].setValue(selectedDateValue)
  }

  balancesheetdata() {
    this.balanceform = this.formbuilder.group({
      name: ['' ,Validators.required],
      date: ['',Validators.required],
      PaymentMethod: ['Credit'],
      amount: ['',Validators.required],
    })
  }

  getAllBalanceList() {
    this.isLoading = true
    this.firebaseService.getBalanceList().subscribe((res: any) => {
      if (res) {
        this.remainingBalance = 0
        this.balanceDebitDataTotal = 0
        this.balanceCreditTotal = 0
        this.balanceList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.balanceList = this.balanceList.sort((a: any, b: any) => {
          let c: any = new Date(a.date);
          let d: any = new Date(b.date);
          return d - c;
        });
        this.balanceList.forEach((ele: any) => {
          if (ele.PaymentType === "Debit") {
            this.remainingBalance = this.remainingBalance - ele.amount;
            this.balanceDebitDataTotal = this.balanceDebitDataTotal + ele.amount
          } else {
            this.remainingBalance = this.remainingBalance + ele.amount;
            this.balanceCreditTotal = this.balanceCreditTotal + ele.amount

          }
          ele["balance"] = this.remainingBalance;
        });        
        this.balanceCreditData = this.balanceList.filter((id:any) => id.PaymentType === "Credit")
        this.balanceDebitData = this.balanceList.filter((id:any) => id.PaymentType !== "Credit")   
        this.isLoading = false
      }
    })
  }


  balancessheet() {

    if (this.balanceform.invalid) {
      this.balanceform.markAllAsTouched();
      this.messageService.add({
        severity: "error",
        summary: 'Error',
        detail: "Please enter mandatory fields",
        life: 5000,
      });
      return;
    } else {
    const payload: BalanceList = {
      id: this.balanceId ? this.balanceId : "",
      name: this.balanceform.value.name,
      date: moment(this.balanceform.value.date).format(),
      PaymentType: this.balanceform.value.PaymentMethod,
      amount: Number(this.balanceform.value.amount),
      loginId: localStorage.getItem('loginId'),
      createdAt : moment().format(),
    }
    console.log(payload);
    if (this.balanceId) {
      this.isLoading = true
      this.firebaseService.updateBalanceList(this.balanceId,payload).then((res: any) => {
          this.messageService.add({
            severity: msgType.success,
            summary: 'Sucess',
            detail: 'Data update Successfully..',
            life: 1500,
          });
          this.balanceform.controls['name'].reset()
          this.balanceform.controls['PaymentMethod'].reset()
          this.balanceform.controls['amount'].reset()
          this.isLoading = false
      })
    } else {
      this.isLoading = true
      this.firebaseService.addBalanceList(payload).then((res: any) => {
        if (res) {
          this.messageService.add({
            severity: msgType.success,
            summary: 'Sucess',
            detail: 'Data Add Successfully..',
            life: 1500,
          });
        }
      })
    }
  }
  }


  editData(item:any , index:any){
    this.balanceId = item.id
    this.balanceform.controls['date'].setValue(new Date(item.date))
    this.balanceform.controls['name'].setValue(item.name)
    this.balanceform.controls['amount'].setValue(item.amount)
    this.balanceform.controls['PaymentMethod'].setValue(item.PaymentType === "Debit" ? 'Debit' : "Credit")
    if (item.PaymentType === "Debit") {
      this.balanceDebitData.splice(index, 1)
      
    } else {
      this.balanceCreditData.splice(index, 1)
    }
  }

  deleteCreditData(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deleteBalanceList(item).then(res => {
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
