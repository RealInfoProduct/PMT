import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../web/dashboard/dashboard.component';
import { WebMainComponent } from './web-main.component';
import { PartylistComponent } from './partylist/partylist.component';
import { FirmMasterComponent } from './firm-master/firm-master.component';
import { BalancesheetComponent } from './balancesheet/balancesheet.component';
import { PlatformmasterComponent } from './platformmaster/platformmaster.component';
import { OrdermasterComponent } from './ordermaster/ordermaster.component';
import { InvoicemasterComponent } from './invoicemaster/invoicemaster.component';
import { BillComponent } from './bill/bill.component';
import { PersonalPassbookComponent } from './personal-passbook/personal-passbook.component';

const routes: Routes = [{
  path: '',
  component: WebMainComponent,

  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'partylist',
      component: PartylistComponent,
    },
    {
      path: 'firmmaster',
      component: FirmMasterComponent,
    },
    {
      path: 'balancesheet',
      component: BalancesheetComponent,
    },
    {
      path: 'platform',
      component: PlatformmasterComponent,
    },
    {
      path: 'ordermaster',
      component: OrdermasterComponent,
    },
    {
      path: 'invoicemaster',
      component: InvoicemasterComponent,
    },
    {
      path: 'bill',
      component: BillComponent,
    },
    {
      path: 'personal-passbook',
      component: PersonalPassbookComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
