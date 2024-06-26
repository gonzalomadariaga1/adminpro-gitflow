import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {
  public user?: User;
  public menuItems: any[];

  constructor( private sidebarService: SidebarService, private userService: UserService){
    this.menuItems = sidebarService.menu;
    this.user = userService.user

  }

}
