import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  constructor( 
    private router: Router, 
    private route: ActivatedRoute, 
    private datePipe: DatePipe) { }
}
