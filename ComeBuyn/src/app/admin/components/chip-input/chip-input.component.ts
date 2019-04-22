import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class ChipInputComponent implements OnChanges {

  @Input() productTags: {} = {};

  ngOnChanges(changes:SimpleChanges){
    if(this.productTags !=null ){
      for(let tagKey of Object.keys(this.productTags)){
        let tagName = this.productTags[tagKey];
        this.tagNum++;
        this.tagsList.push({name: tagName});
      }
    }
    this.tagsOutput.emit(this.tagsList);
  }


  @Output() tagsOutput = new EventEmitter<{}>();

  constructor() {}
  
  tagNum = 0;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // For display
  tagsList: Tag[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      let tagName = 'tag' + this.tagNum;
      this.tagsList.push({name: value.trim().toLowerCase()});
    }
    
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.tagsOutput.emit(this.tagsList);
    
  }

  remove(tag: Tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
      this.tagNum--;
    }
    this.tagsOutput.emit(this.tagsList);
  }

}
