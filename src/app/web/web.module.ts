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



@NgModule({
  declarations: [
    WebMainComponent,
    SettingComponent,
    DashboardComponent,
    PartylistComponent,
    FirmMasterComponent,
    BalancesheetComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule
  ]
})
export class WebModule {
}
