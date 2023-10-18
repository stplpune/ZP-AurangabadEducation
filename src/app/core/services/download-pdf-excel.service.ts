import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class DownloadPdfExcelService {

  constructor() { }

  downLoadPdf(keyData: any, apiKeys: any, objData: any) {
    let doc: any = new jsPDF();
    doc.autoTable(keyData, apiKeys, {
      startY: 25,
      rowPageBreak: 'avoid',
      margin: { horizontal: 1,top: 25 },

      didDrawPage: function (_data: any) {
        doc.setFontSize(13);
        doc.text(objData.topHedingName, 100, 8, "center");

        if (objData?.timePeriod != null) {
          doc.setFontSize(8);
          doc.text(objData.timePeriod, 11, 14, "left");
        }

        doc.setFontSize(8);
        doc.text(objData.createdDate, 200, 14, "right");

        doc.setLineWidth(0.2);
        doc.line(12, 15, 200, 15);

        doc.setLineWidth(0.2);
        doc.line(12, 286, 200, 286);

        doc.setFontSize(8);
        doc.text('Note:This is a system generated File.', 200, 290, "right");
      }
    });

    doc.save(objData.topHedingName);
  }

}
