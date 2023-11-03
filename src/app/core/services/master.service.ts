import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private apiService: ApiService) { }

  getAllDistrict(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDistrict?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllTaluka(langFlag?: string, districtId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllTaluka?flag_lang=' + langFlag +'&DistrictId=' + districtId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllBit(langFlag?: string, talukaId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetBit?TalukaId='+ talukaId +'&flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllCenter(langFlag?: string, talukaId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllCenter?flag_lang=' + langFlag + '&TalukaId=' + talukaId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllVillage(langFlag?: string, centerId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllVillageByCenterId?flag_lang=' + langFlag + '&CenterId=' + centerId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllVillageByTalukaId(langFlag?: string, talukaId?: number) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllVillageByTalukaId?flag_lang=' + langFlag + '&TalukaId=' + talukaId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllCategory(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetSchoolCategoryDescription?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSchoolType(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllSchoolType?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSchoolManagement(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetSchoolManagementDescription?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSchoolMedium(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllSchoolMedium?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSchool(langFlag? :string, distId?: number, talukaId?: number,centerId?: number, villageId?: number){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllSchool?flag_lang='+ langFlag+'?DistrictId='+distId+'&TalukaId='+talukaId+'&CenterId='+centerId+'&VillageId='+villageId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllGender(langFlag? :string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllGender?flag_lang='+ langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllDesignationLevel(langFlag?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDesignationLevel?flag_lang=' + langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllDepenDesignationByLevelId(langFlag?: string, desigLevelId?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDesignationByLevelId?flag_lang='+langFlag+'&DesignationLevelId=' + desigLevelId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllDesireDesignationsByLevelId(langFlag?: string, desigLevelId?: string) {
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDesiredDesignationLevel?flag_lang='+langFlag+'&DesignationLevelId=' + desigLevelId, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getUserType(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDesiredDesignationLevel?flag_lang='+langFlag+'&DesignationLevelId=' + '', false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });

  }

  getAllStandardDivision(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllStandardDivision?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllTeacherRole(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetTeacherRole?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllEducationalQualification(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllEducationalQualification?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllEducationalStream(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllEducationalStream?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllDegreeSpecialization(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllDegreeSpecialization?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllUniversity(langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllUniversity?flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getAllSchoolClasses(id: number, langFlag?: string){
    return new Observable((obj) => {
      this.apiService.setHttp('GET', 'ZP-education/Master/GetAllSchoolClasses?Id='+id+'&flag_lang='+langFlag, false, false, false, 'zp-Education');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res) } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }













}
