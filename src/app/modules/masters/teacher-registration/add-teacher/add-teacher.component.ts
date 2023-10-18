import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent {


  toppings = new FormControl('');
  toppingList: string[] = ['Pune', 'Satara', 'Kolhapur', 'Sangli', 'Nagar'];
}
