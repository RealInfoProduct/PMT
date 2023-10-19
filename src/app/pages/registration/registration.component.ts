import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { msgType } from 'src/assets/constant/message';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Storage} from "@angular/fire/storage";
import * as moment from 'moment';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  showPassword  : boolean = false
  constructor() { }

  ngOnInit(): void {
   
  }
}
