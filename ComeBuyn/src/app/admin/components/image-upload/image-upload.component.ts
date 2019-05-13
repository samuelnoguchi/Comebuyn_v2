import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
    
  @Output() image = new EventEmitter<string>();
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  imagePresent: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  test = null;

  constructor(private db: AngularFireDatabase, private router: Router) { }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      
  }

  imageLoaded(){
    this.imagePresent = true;
  }

  cropImage(){
    this.image.emit(this.croppedImage);
    console.log(this.croppedImage);
    this.imageCropper.imageFileChanged = null;
  }

}