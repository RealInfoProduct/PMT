import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../web/dashboard/dashboard.component';
import { WebMainComponent } from './web-main.component';
import { PartylistComponent } from './partylist/partylist.component';
import { FirmMasterComponent } from './firm-master/firm-master.component';
import { BalancesheetComponent } from './balancesheet/balancesheet.component';

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
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
