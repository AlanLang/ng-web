import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { SearchForm } from './SearchForm'
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  validateForm: FormGroup;
  isCollapse = true;
  showCollapse = false;
  @Input() isLoading:boolean = false;
  @Input() formOptions: SearchForm[] = [];
  @Input() showNum: number = 3;
  @Output () formCommit = new EventEmitter<any>();
  @Output () formReset = new EventEmitter<any>();
  
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
    this.formOptions.forEach((c, index) => {
      c.show = this.isCollapse ? (index < this.showNum) : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
    this.formReset.emit();
  }

  onSubmit(): void {
    this.formCommit.emit(this.validateForm);
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    this.formOptions.forEach((c, index) => {
      this.validateForm.addControl(c.name, new FormControl());
      c.show = index < this.showNum;
      if(!c.show){this.showCollapse = true;}
    });
  }

}
