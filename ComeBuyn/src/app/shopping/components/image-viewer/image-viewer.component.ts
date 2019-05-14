import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  @Input() images;
  imageList =  new Array(3).fill(null);
  focusNumber:number;
  focusImage:string;

  constructor() {
    this.focusNumber = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.imageList = changes.images.currentValue;
    this.focusImage = this.imageList[0]
  }

  changeFocus(num:number){
    this.focusNumber = num;
    this.focusImage = this.imageList[this.focusNumber];
  }

}
