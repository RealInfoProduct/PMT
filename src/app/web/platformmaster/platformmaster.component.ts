import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PlatformList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/constant/message';

@Component({
  selector: 'app-platformmaster',
  templateUrl: './platformmaster.component.html',
  styleUrls: ['./platformmaster.component.scss']
})
export class PlatformmasterComponent implements OnInit {


  platform!: FormGroup
  platFormId :any
  isLoading :boolean = false
  platFormList : any



  constructor(private formbuilder : FormBuilder,
    private firebaseService :FirebaseService ,
    private messageService : MessageService,
    private confirmationService :ConfirmationService) { }

  ngOnInit(): void {
    this.plateformmaster()
    this.getAllPlatFormList()

  }

  plateformmaster(){
    this.platform = this.formbuilder.group({
      platformname : ['']
    })
  }


  getAllPlatFormList(){
    this.isLoading = true
    this.firebaseService.getPlatformList().subscribe((res: any) => {
      if (res) {
        this.platFormList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))        
        console.log(this.platFormList);
        
        this.isLoading = false
      }
    })
  }

  newPlatForm(){
    this.platform.reset()
    this.platFormId = ''
  }
  
  plateformData(){
    const payload : PlatformList = {
      id: '',
      loginId: localStorage.getItem('loginId'),
      platFormName: this.platform.value.platformname
    }

    console.log(payload);

    if (!this.platFormId) {
      this.isLoading = true
      this.firebaseService.addPlatformList(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.getAllPlatFormList()
        this.isLoading = false
      })
    } else {
      this.firebaseService.updatePlatformList(this.platFormId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.getAllPlatFormList()
        this.isLoading = false
      })
    }
  }


  editData(data:any){
    this.platFormId = data.id
    this.platform.controls['platformname'].setValue(data.platFormName)
  }

  deletePartylist(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deletePlatformList(item).then(res => {
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
