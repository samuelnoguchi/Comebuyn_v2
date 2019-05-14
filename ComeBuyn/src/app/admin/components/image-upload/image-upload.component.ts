import { Component, OnInit, Output, Input, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
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
    
  @Input() imageInput:string; // If an image has already been uploaded
  @Output() image = new EventEmitter<string>();
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  productImage: string = null;

  imagePresent: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private db: AngularFireDatabase, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.productImage = changes.imageInput.currentValue;
  }

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
    this.productImage = this.croppedImage;
    this.image.emit(this.productImage);
    this.imageCropper.imageFileChanged = null; //Reset uploader
    this.imagePresent = false;
  }

}