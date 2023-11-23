import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRoutingModule } from './web-routing.module';
import { SettingComponent } from './setting/setting.component';
import { WebMainComponent } from './web-main.component';
import { SharedModule } from '../shared/shared.module';
import { PartylistComponent } from './partylist/partylist.component';
import { FirmMasterComponent } from './firm-master/firm-master.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BalancesheetComponent } from './balancesheet/balancesheet.component';
import { PlatformmasterComponent } from './platformmaster/platformmaster.component';
import { OrdermasterComponent } from './ordermaster/ordermaster.component';
import { InvoicemasterComponent } from './invoicemaster/invoicemaster.component';
import { BillComponent } from './bill/bill.component';
import { PersonalPassbookComponent } from './personal-passbook/personal-passbook.component';



@NgModule({
  declarations: [
    WebMainComponent,
    SettingComponent,
    DashboardComponent,
    PartylistComponent,
    FirmMasterComponent,
    BalancesheetComponent,
    PlatformmasterComponent,
    OrdermasterComponent,
    InvoicemasterComponent,
    BillComponent,
    PersonalPassbookComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ]
})
export class WebModule {
}
