import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';


export interface Tag {
  name: string;
}


@Component({
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent {

  @Input() productTags: {} = {};
  @Output() tagsOutput = new EventEmitter<{}>();

  constructor() { 
    for(let tag of Object.keys(this.productTags)){
      console.log(tag);
    }
  }
  
  tagNum = 0;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // For display
  tagsList: Tag[] = [];

  tags = {};


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tagsList.push({name: value.trim()});
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }

    
  }

  remove(tag: Tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
    }
  }

}
