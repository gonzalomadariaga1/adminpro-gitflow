import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public user? : User;

  constructor(private userService : UserService, private router: Router){
    this.user = userService.user
  }

  logout(){
    this.userService.logout();
  }

  search(term: string){

    if( term.length === 0 ){
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/search/${term}`)
    
  }
}
