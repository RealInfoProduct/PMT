import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { BalanceList, FirmMasterList, InvoiceMaster, OrderList, Partylist, PersonalBalanceList, PlatformList, ProductList } from '../interface/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fService: Firestore,
  ) { }



  getRegistrationList() {
    let dataRef = collection(this.fService, `Registration`)
    return collectionData(dataRef, { idField: 'id' })
  }


  // ProductList

  addProductList(data: ProductList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'ProductList'), data)
  }

  getProductList() {
    let dataRef = collection(this.fService, `ProductList`)
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteProductList(data: ProductList) {
    let docRef = doc(collection(this.fService, `ProductList`), data.id);
    return deleteDoc(docRef)
  }

  updateProductList(data: ProductList, ProductList: any) {
    let dataRef = doc(this.fService, `ProductList/${data}`);
    return updateDoc(dataRef, ProductList)
  }

  // Partylist

  addPartylist(data: Partylist) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'Partylist'), data)
  }

  getPartylist() {
    let dataRef = collection(this.fService, `Partylist`)
    return collectionData(dataRef, { idField: 'id' })
  }


  updatePartylist(data: Partylist, Partylist: any) {
    let dataRef = doc(this.fService, `Partylist/${data}`);
    return updateDoc(dataRef, Partylist)
  }

  deletePartylist(data: Partylist) {
    let docRef = doc(collection(this.fService, `Partylist`), data.id);
    return deleteDoc(docRef)
  }

  // FirmMasterList

  addFirmMasterList(data: FirmMasterList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'FirmMasterList'), data)
  }

  getFirmMasterList() {
    let dataRef = collection(this.fService, `FirmMasterList`)
    return collectionData(dataRef, { idField: 'id' })
  }


  updateFirmMasterList(data: FirmMasterList, FirmMasterList: any) {
    let dataRef = doc(this.fService, `FirmMasterList/${data}`);
    return updateDoc(dataRef, FirmMasterList)
  }

  deleteFirmMasterList(data: FirmMasterList) {
    let docRef = doc(collection(this.fService, `FirmMasterList`), data.id);
    return deleteDoc(docRef)
  }

  // BalanceList

  addBalanceList(data: BalanceList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'BalanceList'), data)
  }

  getBalanceList() {
    let dataRef = collection(this.fService, `BalanceList`)
    return collectionData(dataRef, { idField: 'id' })
  }


  updateBalanceList(data: BalanceList, BalanceList: any) {
    let dataRef = doc(this.fService, `BalanceList/${data}`);
    return updateDoc(dataRef, BalanceList)
  }

  deleteBalanceList(data: BalanceList) {
    let docRef = doc(collection(this.fService, `BalanceList`), data.id);
    return deleteDoc(docRef)
  }

  // PlatformList

  addPlatformList(data: PlatformList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'PlatformList'), data)
  }

  getPlatformList() {
    let dataRef = collection(this.fService, `PlatformList`)
    return collectionData(dataRef, { idField: 'id' })
  }


  updatePlatformList(data: PlatformList, PlatformList: any) {
    let dataRef = doc(this.fService, `PlatformList/${data}`);
    return updateDoc(dataRef, PlatformList)
  }

  deletePlatformList(data: PlatformList) {
    let docRef = doc(collection(this.fService, `PlatformList`), data.id);
    return deleteDoc(docRef)
  }

  // OrderList

  addOrderList(data: OrderList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderList'), data)
  }

  getOrderList() {
    let dataRef = collection(this.fService, `OrderList`)
    return collectionData(dataRef, { idField: 'id' })
  }


  updateOrderList(data: OrderList, OrderList: any) {
    let dataRef = doc(this.fService, `OrderList/${data}`);
    return updateDoc(dataRef, OrderList)
  }

  deleteOrderList(data: OrderList) {
    let docRef = doc(collection(this.fService, `OrderList`), data.id);
    return deleteDoc(docRef)
  }

  // InvoiceMaster

  addInvoiceMaster(data: InvoiceMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'InvoiceMaster'), data)
  }

  getInvoiceMaster() {
    let dataRef = collection(this.fService, `InvoiceMaster`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updateInvoiceMaster(data: InvoiceMaster, InvoiceMaster: any) {
    let dataRef = doc(this.fService, `InvoiceMaster/${data}`);
    return updateDoc(dataRef, InvoiceMaster)
  }

  deleteInvoiceMaster(data: InvoiceMaster) {
    let docRef = doc(collection(this.fService, `InvoiceMaster`), data.id);
    return deleteDoc(docRef)
  }

  // PersonalBalanceList

  addPersonalBalanceList(data: PersonalBalanceList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'PersonalBalanceList'), data)
  }

  getPersonalBalanceList() {
    let dataRef = collection(this.fService, `PersonalBalanceList`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updatePersonalBalanceList(data: PersonalBalanceList, PersonalBalanceList: any) {
    let dataRef = doc(this.fService, `PersonalBalanceList/${data}`);
    return updateDoc(dataRef, PersonalBalanceList)
  }

  deletePersonalBalanceList(data: PersonalBalanceList) {
    let docRef = doc(collection(this.fService, `PersonalBalanceList`), data.id);
    return deleteDoc(docRef)
  }
}
