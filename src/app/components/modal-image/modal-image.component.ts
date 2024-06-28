import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: ``
})
export class ModalImageComponent {

  public imageUpdate? : File
  public imageTemp: any = '';

  constructor(public modalImageService : ModalImageService, public fileUploadService : FileUploadService ){}

  closeModal(){
    this.imageTemp = null 
    this.modalImageService.closeModal();
  }

  changeImage( file: File){
    
    this.imageUpdate = file;

    if(!file){ 
      this.imageTemp = '';
      return
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result
      
      
    }
  }

  uploadImage(){
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updateImage( this.imageUpdate!, type! , id! )
      .then( img => {
        Swal.fire('Guardado','Imagen actualizada con éxito.','success')
        this.modalImageService.newImage.emit(img)
        this.closeModal()
      })
      .catch( err => {
        Swal.fire('Error',err.error.msg ,'error')
      })
  }
  
}
