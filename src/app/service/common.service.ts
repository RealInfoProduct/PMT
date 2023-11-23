import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  chalanData:any;
  invoiceData : any;


  constructor() { }

  //  For menu status and index manage 
  public menuStatusObservable$ = new BehaviorSubject<any>(false);

  setValue(value:any){
    this.menuStatusObservable$.next(value);
    localStorage.setItem('menuStatus',JSON.stringify(value))
  }

  public iconindex = new BehaviorSubject<any>('');
  iconActiveIconIndex$ = this.iconindex.asObservable();

  seticonActiveIndex(value:any){
    this.iconindex.next(value);
  }

  getInoviceData(){
    return this.invoiceData
  }
  setInoviceData(data:any){
    this.invoiceData = data

  }
}
