import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CommonService } from 'src/app/service/common.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  invoiceData :any
  platList :any
  firmList :any
  constructor( private commonService : CommonService , private firebaseService :FirebaseService) { }

  ngOnInit(): void {
    this.invoiceData =  this.commonService.getInoviceData()
    this.firebaseService.getFirmMasterList().subscribe((res: any) => {
      if (res) {
        this.firmList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
      }
    })

    this.firebaseService.getPartylist().subscribe((res: any) => {
      if (res) {
        this.platList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.invoiceData["partyData"] = this.platList?.find((id:any) => id.id === this.invoiceData?.party)
        this.invoiceData["firmData"] = this.firmList?.find((id:any) => id.id === this.invoiceData?.firm)
        console.log(this.invoiceData ,"invoiceData=================");
        
      }
    })

  }

  generatePDF() {
    const element = document.getElementById('pdfContent');
  
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      
      // Calculate the width and height of the PDF page to fit the content
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
      pdf.save('generated-pdf.pdf');
    });
  }
  
  

}
