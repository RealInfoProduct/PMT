import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceMaster } from 'src/app/interface/AuthResponse';
import { CommonService } from 'src/app/service/common.service';
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
     private messageService : MessageService,
     private commonService : CommonService,
     private confirmationService :ConfirmationService,
     private router :Router) { }

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
      firm: this.buildform.value.firm.id,
      party: this.buildform.value.party.id,
      details: this.buildform.value.details,
      date: moment(this.buildform.value.date).format(),
      amount: this.buildform.value.amount,
      invoiceNumber: this.currentInvoice,
      loginId: localStorage.getItem('loginId')
    }
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


  deleteInvoiceList(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deleteInvoiceMaster(item).then(res => {
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

  editData(data: any ){
    this.invoiceId = data.id
    const firmNameFind = this.firmList.find((id:any) => id.firm_header === data.firm)
    this.buildform.controls['firm'].setValue(firmNameFind)
    const partyname = this.platList.find((id:any) => id.party_name === data.party)
    this.buildform.controls['party'].setValue(partyname)
    this.buildform.controls['amount'].setValue(data.amount) 
    this.buildform.controls['details'].setValue(data.details)
    this.buildform.controls['invoiceNumber'].setValue(data.invoiceNumber)
    
  }

  addinvoice(){
    this.buildform.reset()
    this.invoiceId = ''
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
        this.invoiceList.forEach((element:any) => {
            element["partyName"] = this.platList?.find((id:any) => id.id === element.party).party_name
            element["firmName"] = this.firmList?.find((id:any) => id.id === element.firm).firm_subheader
        });        
        this.isLoading = false
      }
    })
  }

  printData(item :any){
    this.commonService.setInoviceData(item)
    this.router.navigate(['web/bill'])

  }
}
