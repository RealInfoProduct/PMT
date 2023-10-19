import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';


@Component({
  selector: 'app-thm-menubar',
  templateUrl: './thm-menubar.component.html',
  styleUrls: ['./thm-menubar.component.scss']
})
export class ThmMenubarComponent implements OnInit {
  
  menuList:any = [
    {
      icon:'ri-home-5-line ri-lg',
      name:'Product',
      url:'/web/dashboard',
      children : [
        {
          name:'Product',
          url:'/web/dashboard',
        },
      ],
    },
    {
      icon:'ri-cpu-line ri-lg',
      name:'Party List',
      url:'/web/partylist',
      children : [
        {
          name:'Party List',
          url:'/web/partylist',
        },
      ],
    },
    {
      icon:'ri-file-user-fill',
      name:'Firm Master',
      url:'/web/firmmaster',
      children : [
        {
          name:' Firm Form',
          url:'/web/firmmaster',
        },
      ],
    },
    {
      icon:'ri-bank-fill',
      name:'Balance Sheet ',
      url:'/web/balancesheet',
      children : [
        {
          name:' Balance Sheet ',
          url:'/web/balancesheet',
        },
      ],
    },
    {
      icon:'ri-global-line',
      name:'Plat Form  ',
      url:'/web/platform',
      children : [
        {
          name:' Plat Form  ',
          url:'/web/platform',
        },
      ],
    },
    {
      icon:'ri-file-list-3-fill',
      name:'Order Master  ',
      url:'/web/ordermaster',
      children : [
        {
          name:' Order Master  ',
          url:'/web/ordermaster',
        },
      ],
    },
    {
      icon:'ri-logout-box-r-line ri-lg',
      name:'Logout',
      url:'#',
      children : [
        {
          name:'Logout',
          url:'/login'
        },
      ],
    }
  ];

  menuIconList:any = []
  subMenuList:any = []

  menuListArr:any = []
  newMenuList:any = []
  activeLinkIndex:number = 0
  iconActiveIndex:number = 0
  isStatus : boolean  = true
  employeeId :any
  constructor( private service: CommonService ,private router: Router) {}
  
  ngOnInit(): void {
        this.service.iconActiveIconIndex$.subscribe((res) =>{
          const index = res?.index
          const name = res?.name
          this.isStatus = true
          this.menuIconList = this.menuList;
          this.iconActive(index,name)
        })
 
  
  }
 

  iconActive(index:any,item:any){
    this.iconActiveIndex = index
    const subMenu = this.menuIconList.find((id:any)=>id.name == item)
    this.subMenuList = subMenu?.children
    localStorage.setItem('iconActiveIndex' , JSON.stringify({index:this.iconActiveIndex , name:item}))
    if(this.isStatus){
      const menuStatusList:any = localStorage.getItem("menuStatus")
      const menuStatus  = JSON.parse(menuStatusList)
      this.service.setValue(menuStatus)
      this.isStatus = false
    }else{  
      this.service.setValue({status:false})
    }
  }

  logout(item:any){
    if(item.name === "Logout"){
      localStorage.clear()
      this.router.navigate(['/login'])
    }
  }

  }

