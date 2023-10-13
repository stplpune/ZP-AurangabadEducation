import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {
  codecareerPage!: string;

  constructor( 
    private router: Router, 
    private route: ActivatedRoute, 
    private datePipe: DatePipe,
    private snackBar: MatSnackBar) { }

    createCaptchaCarrerPage() {
      //clear the contents of captcha div first
      let id: any = document.getElementById('captcha');
      id.innerHTML = "";
  
      var charsArray = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var lengthOtp = 6;
      var captcha = [];
      for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 0); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
          captcha.push(charsArray[index]);
        else i--;
      }
      var canv = document.createElement("canvas");
      canv.id = "captcha1";
      canv.width = 120;
      canv.height = 30;
      //var ctx:any = canv.getContext("2d");
      var ctx: any = canv.getContext("2d");
      ctx.font = "24px Bookman Old Style";
      ctx.fillStyle = "#000000";
      ctx.fillText(captcha.join(""), 10, 26);
      // ctx.strokeText(captcha.join(""), 0, 30);
      //storing captcha so that can validate you can save it somewhere else according to your specific requirements
      this.codecareerPage = captcha.join("");
      let appendChild: any = document.getElementById("captcha");
      appendChild.appendChild(canv); // adds the canvas to the body element
    }

    checkvalidateCaptcha() {
      return this.codecareerPage;
    }

    matSnackBar(data: string, status: number) {
      let snackClassArr: any = ['snack-success', 'snack-danger', 'snack-warning'];
      this.snackBar.open(data, " ", {
        duration: 2000,
        panelClass: [snackClassArr[status]],
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
  
      })
    }
}
