import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-excel-file',
  templateUrl: './upload-excel-file.component.html',
  styleUrls: ['./upload-excel-file.component.scss']
})
export class UploadExcelFileComponent {

  fileName: string = '';
  @Output() sendData: EventEmitter<any> = new EventEmitter();

  public handleFile(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    this.fileName = selectedFile.name;
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target?.result
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      // console.log('workbook > ', workbook);
      const data = XLSX.utils.sheet_to_json(workbook.Sheets['productos']);
      // console.log('data > ', data);
      this.sendData.emit(data);
    }
  }

}
