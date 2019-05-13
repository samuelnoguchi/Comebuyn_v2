import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  @Input() image: string;
  imageList: string[];
  focusNumber:number;

  constructor() {
    this.focusNumber = 0;

    this.imageList = [];
    this.imageList.push(this.image);
    this.imageList.push(this.image);
    this.imageList.push(this.image);
  }

  ngOnInit() {
  }

  changeFocus(num:number){
    this.focusNumber = num;
  }

}
