import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
    
  @Output() image = new EventEmitter<string>();

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private db: AngularFireDatabase, private router: Router) { }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.image.emit(this.croppedImage);
  }
}