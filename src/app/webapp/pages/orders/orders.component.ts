import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { IGetOrders } from '../../models/igetorders';
import { OrdersService } from '../../services/orders.service';
import { StorageService } from '../../services/storage.service';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: IGetOrders[];

  constructor(private router: Router,
  private ordersService: OrdersService,
  private storageService: StorageService) {
    this.orders = [];
  }

  async ngOnInit() {
    await this.getLists();
    // setTimeout(() => {this.downloadPDF();}, 2000);
  }

  public downloadPDF() {

    //const doc = new jsPDF();
    //doc.text('Hello world!', 10, 10);
    //doc.save('hello-world.pdf');
    //doc.output('dataurlnewwindow', {filename: 'miArchivo.pdf'});

    /*const DATA = document.getElementById("htmlData") || document.createElement('div');
    const doc = new jsPDF('l', 'mm', [1200, 1210]);
    doc.html(DATA, {
      callback: (doc) => {
        // doc.save('output.pdf')
        doc.output('dataurlnewwindow', {filename: 'miArchivo.pdf'});
      },
      margin: 100,
      autoPaging: 'text',
      x: 10,
      y: 10
    });*/


    /*const DATA = document.getElementById("htmlData") || document.createElement('div');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    console.log('DATA > ', DATA);
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });*/
  }

  async getLists() {
    const result = await Promise.all([
      lastValueFrom(this.ordersService.getAll({filterBy: 'byStatus', value: 1}))
    ]);
    this.orders = result[0];
    console.log(this.orders);
  }

  showRegisterForm() {
    this.router.navigate(['webapp/register-order-client']);
  }

  async updateStatus(id: number, estado: string) {
    await lastValueFrom(this.ordersService.updateStatus({id, estado}));
    this.getLists();
  }

  editOrder(id: number) {
    console.log(`Order id: ${id}`);
  }

  getBackground(state: string) {
    return {
      Pendiente: '#feca57',
      Entregado: '#1dd1a1',
      Cancelado: '#ee5253'
    }[state];
  }
}
