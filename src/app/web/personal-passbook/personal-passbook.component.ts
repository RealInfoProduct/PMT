import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BalanceList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-personal-passbook',
  templateUrl: './personal-passbook.component.html',
  styleUrls: ['./personal-passbook.component.scss']
})
export class PersonalPassbookComponent implements OnInit {

  balanceform!: FormGroup
  paymentMethod: any = [
    {
      paymentMethodName: "Home"
    },
    {
      paymentMethodName: "Office"
    },
  ]
  
  isLoading: boolean = false
  balanceList: any
  balanceHomeData: any
  balanceHomeTotal: number = 0
  balanceOfficeData: any
  balanceOfficeDataTotal: number = 0
  remainingBalance: number = 0
  balanceId: any

  constructor(private formbuilder: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.balancesheetdata()
    this.getAllBalanceList()
    const selectedDateValue = new Date(); // Your desired date value
    this.balanceform.controls['date'].setValue(selectedDateValue)
  }

  balancesheetdata() {
    this.balanceform = this.formbuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      PaymentMethod: ['Home'],
      amount: ['', Validators.required],
    })
  }

  getAllBalanceList() {
    this.isLoading = true
    this.firebaseService.getPersonalBalanceList().subscribe((res: any) => {
      if (res) {
        this.remainingBalance = 0
        this.balanceOfficeDataTotal = 0
        this.balanceHomeTotal = 0
        this.balanceList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.balanceList = this.balanceList.sort((a: any, b: any) => {
          let c: any = new Date(a.date);
          let d: any = new Date(b.date);
          return d - c;
        });
        this.balanceList.forEach((ele: any) => {
          if (ele.PaymentType === "Office") {
            this.remainingBalance = this.remainingBalance - ele.amount;
            this.balanceOfficeDataTotal = this.balanceOfficeDataTotal + ele.amount
          } else {
            this.remainingBalance = this.remainingBalance + ele.amount;
            this.balanceHomeTotal = this.balanceHomeTotal + ele.amount

          }
          ele["balance"] = this.remainingBalance;
        });
        this.balanceHomeData = this.balanceList.filter((id: any) => id.PaymentType === "Home")
        this.balanceOfficeData = this.balanceList.filter((id: any) => id.PaymentType !== "Home")
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
        PaymentType: this.balanceform.value.PaymentMethod ?this.balanceform.value.PaymentMethod : "Home",
        amount: Number(this.balanceform.value.amount),
        loginId: localStorage.getItem('loginId'),
        createdAt: moment().format(),
      }

      if (this.balanceId) {
        this.isLoading = true
        this.firebaseService.updatePersonalBalanceList(this.balanceId, payload).then((res: any) => {
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
          this.balanceId = ''
        })
      } else {
        this.isLoading = true
        this.firebaseService.addPersonalBalanceList(payload).then((res: any) => {
          if (res) {
            this.messageService.add({
              severity: msgType.success,
              summary: 'Sucess',
              detail: 'Data Add Successfully..',
              life: 1500,
            });
            this.balanceform.controls['name'].reset()
            this.balanceform.controls['PaymentMethod'].reset()
            this.balanceform.controls['amount'].reset()
          }
        })
      }
    }
  }

  editData(item: any, index: any) {
    this.balanceId = item.id
    this.balanceform.controls['date'].setValue(new Date(item.date))
    this.balanceform.controls['name'].setValue(item.name)
    this.balanceform.controls['amount'].setValue(item.amount)
    this.balanceform.controls['PaymentMethod'].setValue(item.PaymentType === "Office" ? 'Office' : "Home")
    if (item.PaymentType === "Office") {
      this.balanceOfficeData.splice(index, 1)

    } else {
      this.balanceHomeData.splice(index, 1)
    }
  }

  deleteHomeData(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deletePersonalBalanceList(item).then(res => {
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
