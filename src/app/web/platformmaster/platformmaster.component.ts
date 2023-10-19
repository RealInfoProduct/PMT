import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-platformmaster',
  templateUrl: './platformmaster.component.html',
  styleUrls: ['./platformmaster.component.scss']
})
export class PlatformmasterComponent implements OnInit {


  platform!: FormGroup

  constructor(private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.plateformmaster()
  }

  plateformmaster(){
    this.platform = this.formbuilder.group({
      platformname : ['']
    })
  }

  plateformData(){
console.log(this.platform.value);

  }
}
