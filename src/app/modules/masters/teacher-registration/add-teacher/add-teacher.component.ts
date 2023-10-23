import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {
  teacherRegForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.formField();
  }

  formField(){
    this.teacherRegForm = this.fb.group({
      teacherName: [''],
      m_TeacherName: [''],
      teacherId: [''],
      genderId: [''],
      mobileNo: [''],
      emailId: [''],
      birthDate: [''],
      uploadImage: ['']
    })
  }

  toppings = new FormControl('');
  toppingList: string[] = ['Pune', 'Satara', 'Kolhapur', 'Sangli', 'Nagar'];
}
