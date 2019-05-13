import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
