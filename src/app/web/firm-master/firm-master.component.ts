import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FirmMasterList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-firm-master',
  templateUrl: './firm-master.component.html',
  styleUrls: ['./firm-master.component.scss']
})
export class FirmMasterComponent implements OnInit {
  value: string | undefined;

  firmMasterList!: FormGroup
  firmId: any
  firmList: any
  Sellerparty = [
    {
      name: 'Sell'
    },
    {
      name: 'Buy'
    }
  ]
  isLoading: boolean = false;
  constructor(private formbuilder: FormBuilder,
    private messageService: MessageService,
    private firebaseService: FirebaseService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.buildForm()
    this.getAllFirmList()
  }

  buildForm(): void {
    this.firmMasterList = this.formbuilder.group({
      header: [''],
      mobileno: [''],
      subheader: [''],
      personalmobileno: [''],
      address: [''],
      bankname: [''],
      GSTNo: [''],
      BankIFSC: [''],
      GSTpercentage: [''],
      bankaccountno: [''],
      panno: [''],
    });
  }

  getAllFirmList() {
    this.isLoading = true
    this.firebaseService.getFirmMasterList().subscribe((res: any) => {
      if (res) {
        this.firmList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.isLoading = false
      }
    })
  }

  partyData() {
    const payload: FirmMasterList = {
      id: '',
      firm_header: this.firmMasterList.value.header,
      firm_mobileno: this.firmMasterList.value.mobileno,
      firm_subheader: this.firmMasterList.value.subheader,
      firm_personalmobileno: this.firmMasterList.value.personalmobileno,
      firm_address: this.firmMasterList.value.address,
      firm_bankname: this.firmMasterList.value.bankname,
      firm_GSTNo: this.firmMasterList.value.GSTNo,
      firm_BankIFSC: this.firmMasterList.value.BankIFSC,
      firm_GSTpercentage: this.firmMasterList.value.GSTpercentage,
      firm_bankaccountno: this.firmMasterList.value.bankaccountno,
      firm_pannor: this.firmMasterList.value.panno,
      loginId: localStorage.getItem('loginId'),
      invoiceNumber: 0
    }
    if (!this.firmId) {
      this.isLoading = true
      this.firebaseService.addFirmMasterList(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.getAllFirmList()
        this.isLoading = false
      })
    } else {
      this.firebaseService.updateFirmMasterList(this.firmId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.getAllFirmList()
        this.isLoading = false
      })
    }
  }

  editData(data: any) {
    this.firmId = data.id
    this.firmMasterList.controls['header'].setValue(data.firm_header),
      this.firmMasterList.controls['mobileno'].setValue(data.firm_mobileno),
      this.firmMasterList.controls['subheader'].setValue(data.firm_subheader),
      this.firmMasterList.controls['personalmobileno'].setValue(data.firm_personalmobileno),
      this.firmMasterList.controls['address'].setValue(data.firm_address),
      this.firmMasterList.controls['bankname'].setValue(data.firm_bankname),
      this.firmMasterList.controls['GSTNo'].setValue(data.firm_GSTNo),
      this.firmMasterList.controls['BankIFSC'].setValue(data.firm_BankIFSC),
      this.firmMasterList.controls['GSTpercentage'].setValue(data.firm_GSTpercentage),
      this.firmMasterList.controls['bankaccountno'].setValue(data.firm_bankaccountno),
      this.firmMasterList.controls['panno'].setValue(data.firm_pannor)
  }


  deleteFirmMasterList(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deleteFirmMasterList(item).then(res => {
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

  addFirm() {
    this.firmMasterList.reset()
  }
}
