import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductList } from 'src/app/interface/AuthResponse';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { msgType } from 'src/assets/constant/message';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  productList: any
  isEdit: any
  isLoading: boolean = false
  productForm!: FormGroup
  productId: any
  productOptions = [
    { label: 'Product 1', value: 'Product 1', image: '../../../assets/productphotos/product1.jfif' },
    { label: 'Product 2', value: 'Product 2', image: '../../../assets/productphotos/product2.jfif' },
    { label: 'Product 3', value: 'Product 3', image: '../../../assets/productphotos/product3.jpeg' },
    { label: 'Product 4', value: 'Product 4', image: '../../../assets/productphotos/product4.jpg' },
    { label: 'Product 5', value: 'Product 5', image: '../../../assets/productphotos/product5.jpg' },
    { label: 'Product 6', value: 'Product 6', image: '../../../assets/productphotos/product6.jpeg' },
    { label: 'Product 7', value: 'Product 7', image: '../../../assets/productphotos/product7.jfif' },
    { label: 'Product 8', value: 'Product 8', image: '../../../assets/productphotos/product8.jpg' },
    { label: 'Product 9', value: 'Product 9', image: '../../../assets/productphotos/product9.jpg' },
    { label: 'Product 10', value: 'Product 10', image: '../../../assets/productphotos/product10.jpg' },
    { label: 'Product 11', value: 'Product 11', image: '../../../assets/productphotos/product11.jpg' },
    { label: 'Product 12', value: 'Product 12', image: '../../../assets/productphotos/product12.jpg' },
    { label: 'Product 13', value: 'Product 13', image: '../../../assets/productphotos/product13.jpg' },
    { label: 'Product 14', value: 'Product 14', image: '../../../assets/productphotos/product14.jpg' },
    { label: 'Product 15', value: 'Product 15', image: '../../../assets/productphotos/product15.jpg' },
    { label: 'Product 16', value: 'Product 16', image: '../../../assets/productphotos/product16.jpg' },
    { label: 'Product 17', value: 'Product 17', image: '../../../assets/productphotos/product17.jpg' },
    { label: 'Product 18', value: 'Product 18', image: '../../../assets/productphotos/product18.jpg' },
    { label: 'Product 19', value: 'Product 19', image: '../../../assets/productphotos/product19.jpg' },
    { label: 'Product 20', value: 'Product 20', image: '../../../assets/productphotos/product20.jpg' },
    { label: 'Product 21', value: 'Product 21', image: '../../../assets/productphotos/product21.jpg' },
    { label: 'Product 22', value: 'Product 22', image: '../../../assets/productphotos/product22.jpg' },
    { label: 'Product 23', value: 'Product 23', image: '../../../assets/productphotos/product23.jpg' },
    { label: 'Product 24', value: 'Product 24', image: '../../../assets/productphotos/product24.jpg' },
    { label: 'Product 25', value: 'Product 25', image: '../../../assets/productphotos/product25.jpg' },
    { label: 'Product 26', value: 'Product 26', image: '../../../assets/productphotos/product26.jpg' },
    { label: 'Product 27', value: 'Product 27', image: '../../../assets/productphotos/product27.jpg' },
    { label: 'Product 28', value: 'Product 28', image: '../../../assets/productphotos/product28.jpg' },
    { label: 'Product 29', value: 'Product 29', image: '../../../assets/productphotos/product29.jpg' },
    { label: 'Product 30', value: 'Product 30', image: '../../../assets/productphotos/product30.jpg' },
    { label: 'Product 31', value: 'Product 31', image: '../../../assets/productphotos/product31.jpg' },
    { label: 'Product 32', value: 'Product 32', image: '../../../assets/productphotos/product32.jpg' },
    { label: 'Product 33', value: 'Product 33', image: '../../../assets/productphotos/product33.JPG' },
    { label: 'Product 34', value: 'Product 34', image: '../../../assets/productphotos/product34.jpg' },
    { label: 'Product 35', value: 'Product 35', image: '../../../assets/productphotos/product35.jpg' },
    { label: 'Product 36', value: 'Product 36', image: '../../../assets/productphotos/product36.jfif' },
    { label: 'Product 37', value: 'Product 37', image: '../../../assets/productphotos/product37.jfif' },
    { label: 'Product 38', value: 'Product 38', image: '../../../assets/productphotos/product38.jfif' },
    { label: 'Product 39', value: 'Product 39', image: '../../../assets/productphotos/product39.jpg' },
    { label: 'Product 40', value: 'Product 40', image: '../../../assets/productphotos/product40.jfif' },
    { label: 'Product 41', value: 'Product 41', image: '../../../assets/productphotos/product41.JPG' },
    { label: 'Product 42', value: 'Product 42', image: '../../../assets/productphotos/product42.jfif' },
    { label: 'Product 43', value: 'Product 43', image: '../../../assets/productphotos/product43.jpg' },
    { label: 'Product 44', value: 'Product 44', image: '../../../assets/productphotos/product44.jpg' },
    { label: 'Product 45', value: 'Product 45', image: '../../../assets/productphotos/product45.jpg' },
    { label: 'Product 46', value: 'Product 46', image: '../../../assets/productphotos/product46.jfif' },
    { label: 'Product 47', value: 'Product 47', image: '../../../assets/productphotos/product47.jpg' },
    { label: 'Product 48', value: 'Product 48', image: '../../../assets/productphotos/product48.jpg' },
    { label: 'Product 49', value: 'Product 49', image: '../../../assets/productphotos/product49.jpg' },
    { label: 'Product 50', value: 'Product 50', image: '../../../assets/productphotos/product50.jpg' },
    { label: 'Product 51', value: 'Product 51', image: '../../../assets/productphotos/product51.jpg' },
    { label: 'Product 52', value: 'Product 52', image: '../../../assets/productphotos/product52.jpg' },
    { label: 'Product 53', value: 'Product 53', image: '../../../assets/productphotos/product53.jpg' },
    { label: 'Product 54', value: 'Product 54', image: '../../../assets/productphotos/product54.jpg' },
    { label: 'Product 55', value: 'Product 55', image: '../../../assets/productphotos/product55.jpg' },
    { label: 'Product 56', value: 'Product 56', image: '../../../assets/productphotos/product56.jpg' },
    { label: 'Product 57', value: 'Product 57', image: '../../../assets/productphotos/product57.jpg' },
    { label: 'Product 58', value: 'Product 58', image: '../../../assets/productphotos/product58.jpg' },
    { label: 'Product 59', value: 'Product 59', image: '../../../assets/productphotos/product59.jpg' },
    { label: 'Product 60', value: 'Product 60', image: '../../../assets/productphotos/product60.jpg' },
    { label: 'Product 61', value: 'Product 61', image: '../../../assets/productphotos/product61.jpg' },
    { label: 'Product 62', value: 'Product 62', image: '../../../assets/productphotos/product62.jpg' },
    { label: 'Product 63', value: 'Product 63', image: '../../../assets/productphotos/product63.jpg' },
    { label: 'Product 64', value: 'Product 64', image: '../../../assets/productphotos/product64.jpg' },
  ];
  productEditData: any;

  constructor(private firebaseService: FirebaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formbuilder: FormBuilder,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.buildForm()
    this.getAllProductList()
  }

  buildForm(): void {
    this.productForm = this.formbuilder.group({
      productPic: [''],
      productName: [''],
      productPrice: [''],
      productQuantity: [''],
      productDesc: [''],
    });
  }

  addProject() {
    this.isEdit = false
    this.productForm.reset()
  }

  submit() {
    if (!this.isEdit) {
      var productPic: any = this.productOptions.find((id: any) => id.label === this.productForm.value.productPic)
    }
    const payload: ProductList = {
      id: this.productId ? this.productId : '',
      productPic: this.isEdit ? this.productEditData.productPic : productPic.image,
      productName: this.productForm.value.productName,
      productPrice: this.productForm.value.productPrice,
      productQuantity: this.productForm.value.productQuantity,
      productDesc: this.productForm.value.productDesc,
      loginId: localStorage.getItem('loginId')
    }
    if (!this.productId) {
      this.isLoading = true
      this.firebaseService.addProductList(payload).then((res: any) => {
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Add Successfully..',
          life: 1500,
        });
        this.getAllProductList()
        this.isLoading = false
      })
    } else {
      this.firebaseService.updateProductList(this.productId, payload).then((res: any) => {
        this.isLoading = true
        this.messageService.add({
          severity: msgType.success,
          summary: 'Sucess',
          detail: 'Data Update Successfully..',
          life: 1500,
        });
        this.isLoading = false
      })
    }

  }

  editProduct(item: any) {
    this.isEdit = true
    this.productId = item.id
    this.productEditData = item
    this.productForm.patchValue(item)
  }

  deleteProject(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record ?',
      header: 'Delete Priority',
      accept: async () => {
        this.isLoading = true
        this.firebaseService.deleteProductList(item).then(res => {
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

  getAllProductList() {
    this.isLoading = true
    this.firebaseService.getProductList().subscribe((res: any) => {
      if (res) {
        this.productList = res.filter((id: any) => id.loginId === localStorage.getItem('loginId'))
        this.isLoading = false
      }
    })
  }

  fileChange(event: any) {
    this.productForm.controls['productPic'].setValue(event.target.files[0]);
  }

  @ViewChild('contentToCapture') contentToCapture!: ElementRef;

  generatePDF2() {
    this.isLoading = true
    const elementToCapture = this.contentToCapture.nativeElement;

    html2canvas(elementToCapture).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');

      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Add an image to the PDF
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0); // Adjust position and dimensions as needed

      // Save or display the PDF
      const pdfOutput = doc.output('blob'); // 'blob' output type for saving
      const url = URL.createObjectURL(pdfOutput);

      // // Set the URL to a safe resource URL
      // this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      // Optionally, you can open the PDF in a new tab
      window.open(url, '_blank');
      this.isLoading = false

    });
  }

}