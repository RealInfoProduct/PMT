import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { msgType } from 'src/assets/constant/message';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword:boolean = false
  isLoading = false
  userList:any;
  employeeList:any;
  allCompanyEmployees  : any = [];
  matchedEmployee : any;
  CompanyLogin : boolean = false

  constructor(private router:Router,
    private formBuilder:FormBuilder,
    private authService :AuthService,
    private messageService: MessageService,
    private firebaseService : FirebaseService) { }

              
  ngOnInit(): void {
    this.buildForm()
  }

  buildForm():void{
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }



  submit() { 
    this.authService.signIn(this.loginForm.value.email , this.loginForm.value.password).subscribe((res:any)=> {
      if (res) {
        this.firebaseService.getRegistrationList().subscribe((res:any) => {
          if (res) {
            const loginIdFind = res.find((id:any) => id.email === this.loginForm.value.email)
            localStorage.setItem('loginId', loginIdFind.id ) 
            if (loginIdFind.status === 'active') {
              this.router.navigate(['/web/dashboard'])
            } else {
              this.messageService.add({
                severity: msgType.error,
                summary: 'Error',
                detail:"user can not active",
                life: 1500,
              });
            }
          }
          
        })

      }
    } , (error) => {
      this.messageService.add({
        severity: msgType.error,
        summary: 'Error',
        detail: error.error.error.message,
        life: 1500,
      });
    })


  }

}
