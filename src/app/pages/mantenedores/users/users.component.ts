import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchsService } from '../../../services/searchs.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: ``
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers : number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public mailUser: string = this.userService.user.email;
  public imgSubs?: Subscription;
  
  constructor(
                private userService : UserService, 
                private searchService: SearchsService,
                private modalImageService: ModalImageService
              ){}

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }


  ngOnInit(): void {
    this.reloadUsers()
    this.imgSubs = this.modalImageService.newImage.pipe(delay(100)).subscribe(img => {this.reloadUsers()})
  }

  reloadUsers(){
    this.loading = true ;
    this.userService.loadUsers( this.from )
    .subscribe( ({ total, users }) => {

      this.totalUsers = total ;
      this.users = users 
      this.usersTemp = users 
      this.loading = false
      
    })
  }

  changePage( valor: number ){
    this.from += valor
    if (this.from < 0 ) {
      this.from = 0;
    } else if ( this.from >= this.totalUsers ) {
      this.from -= valor
    }

    this.reloadUsers()
  }

  search ( term: string ){

    if (term.length === 0) {
      return this.users = this.usersTemp
    }

    return this.searchService.search('users',term)
      .subscribe( (results: any ) => {
        this.users = results
      })
  }

  deleteUser( user: User){

    if ( user.uid === this.userService.uid){
      return Swal.fire('Error','No puede borrarse a si mismo.','error')
    }

    return Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto no se podrá revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(user)
          .subscribe(resp => {
            Swal.fire('Eliminado',`${user.name} ha sido eliminado correctamente`,'success')
            this.reloadUsers()
          })

      }
    })
  }

  changeRole(user: User){
    this.userService.updateAndSaveUser(user)
      .subscribe(resp => {
        console.log(resp);
        
      })
  }

  openModal(user: User){
    console.log(user);
    this.modalImageService.openModal('users', user.uid!, user.img)
    
  }
}
