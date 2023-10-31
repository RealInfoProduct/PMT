import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { InvoiceMaster } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';


@Component({
  selector: 'app-invoicemaster',
  templateUrl: './invoicemaster.component.html',
  styleUrls: ['./invoicemaster.component.scss']
})
export class InvoicemasterComponent implements OnInit {
  buildform!: FormGroup
  isLoading :boolean = false
  platList :any
  firmList :any
  invoiceId :any
  invoiceList:any
  currentInvoiceId :any
  currentInvoice: number= 0
  constructor(private fb: FormBuilder ,
     private firebaseService :FirebaseService ,
     private messageService : MessageService) { }

  ngOnInit(): void {
    this.builddata()
    this.getAllOrderList()
    const selectedDateValue = new Date(); // Your desired date value
    this.buildform.controls['date'].setValue(selectedDateValue)
  }

  builddata() {
    this.buildform = this.fb.group({
      firm: [''],
      party: [''],
      amount: [''],
      details: [''],
      date: [''],
    })
  }

  buildsubmit() {

    const payload : InvoiceMaster = {
      id: '',
      firm: this.buildform.value.firm.firm_header,
      party: this.buildform.value.party.party_name,
      details: this.buildform.value.details,
      date: moment(this.buildform.value.date).format(),
      amount: this.buildform.value.amount,
      invoiceNumber: this.currentInvoice,
      loginId: localStorage.getItem('loginId')
    }
    console.log(payload);

    this.firebaseService.updateFirmMasterList(this.currentInvoiceId.id ,this.currentInvoiceId).then((res:any) => {
      if (res) {
         
      }
    })

    if (!this.invoiceId) {
      this.isLoading = true
      this.firebaseService.addInvoiceMaster(payload).then((res: any) => {
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
      this.firebaseService.updateInvoiceMaster(this.invoiceId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.invoiceId = ''
        this.buildform.reset()
        const selectedDateValue = new Date(); // Your desired date value
        this.buildform.controls['date'].setValue(selectedDateValue)
        this.getAllOrderList()
        this.isLoading = false
      })
    }

  }
  
  selectFirmInvoicrFind(event:any){
    if (event.value.invoiceNumber === 0 ) {
      this.currentInvoice = 1
      event.value["invoiceNumber"] =  this.currentInvoice
      this.currentInvoiceId =  event.value
    } else {
      this.currentInvoice = event.value.invoiceNumber + 1
      event.value["invoiceNumber"] =  this.currentInvoice
      this.currentInvoiceId =  event.value
    }    
  }

  
  getAllOrderList() {
    this.isLoading = true
    this.firebaseService.getFirmMasterList().subscribe((res: any) => {
      if (res) {
        this.firmList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.isLoading = false
      }
    })

    this.firebaseService.getPartylist().subscribe((res: any) => {
      if (res) {
        this.platList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.isLoading = false
      }
    })
    this.firebaseService.getInvoiceMaster().subscribe((res: any) => {
      if (res) {
        this.invoiceList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        console.log(this.invoiceList ,"invoiceList----------------");
        
        this.isLoading = false
      }
    })
  }
}
