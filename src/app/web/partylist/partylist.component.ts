import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Partylist } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-partylist',
  templateUrl: './partylist.component.html',
  styleUrls: ['./partylist.component.scss']
})
export class PartylistComponent implements OnInit {
  value: string | undefined;

  partyForm! : FormGroup
  partyId :any
  partyList:any
  isLoading: boolean = false
  constructor(private formbuilder : FormBuilder ,
    private firebaseService :FirebaseService,
    private messageService :MessageService,
    private confirmationService :ConfirmationService) { }

  ngOnInit(): void {
   this.buildForm ()
   this.getAllPartyList()
  }

  buildForm(): void {
    this.partyForm = this.formbuilder.group({
      // partylist: [''],
      partyname: [''],
      partypan: [''],
      partyfirmaddress: [''],
      partygstin: [''],
      partymobile: ['']
    });
  }

  getAllPartyList(){
    this.isLoading = true
    this.firebaseService.getPartylist().subscribe((res: any) => {
      if (res) {
        this.partyList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))        
        this.isLoading = false
      }
    })
  }

  partyData(){
    const payload : Partylist = {
      id: '',
      // party_list: this.partyForm.value.partylist,
      party_name: this.partyForm.value.partyname,
      party_panNumber: this.partyForm.value.partypan,
      party_partygstin: this.partyForm.value.partygstin,
      party_address: this.partyForm.value.partyfirmaddress,
      party_mobile: this.partyForm.value.partymobile,
      loginId: localStorage.getItem('loginId')
    }

    console.log(payload);

    if (!this.partyId) {
      this.isLoading = true
      this.firebaseService.addPartylist(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.getAllPartyList()
        this.isLoading = false
      })
    } else {
      this.firebaseService.updatePartylist(this.partyId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.getAllPartyList()
        this.isLoading = false
      })
    }
  }

  editData(data:any){
    this.partyId = data.id
    this.partyForm.controls['partyname'].setValue(data.party_name),
    this.partyForm.controls['partypan'].setValue(data.party_panNumber),
    this.partyForm.controls['partygstin'].setValue(data.party_partygstin),
    this.partyForm.controls['partyfirmaddress'].setValue(data.party_address),
    this.partyForm.controls['partymobile'].setValue(data.party_mobile)

  }

  addParty(){
    this.partyForm.reset()
    this.partyId = ''
  }
  deletePartylist(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deletePartylist(item).then(res => {
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
