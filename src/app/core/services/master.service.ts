import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiService: ApiService) { }
}
