import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  statistics: any;
  collectedMoney: any[];
  graphOptions: any;

  constructor(private utilsService: UtilsService) {
    // default value
    this.statistics = {
      total_clientes: 0,
      total_pedidos: 0,
      total_entregados: 0,
      total_vendido: 0
    }
    this.collectedMoney = [];
  }

  ngOnInit(): void {
    this.getStatistics();
    this.getCollectedMoney();
  }

  async getStatistics() {
    this.statistics = await lastValueFrom(this.utilsService.getStatistics());
    if (!this.statistics.total_vendido) {
      this.statistics.total_vendido = 0;
    }
  }

  async getCollectedMoney() {
    this.collectedMoney = await lastValueFrom(this.utilsService.getCollectedMoney());
    const dataSeries: any[] = [];
    this.collectedMoney.forEach((item) => {
      dataSeries.push([`${item.dia}`, item.total]);
    });
    this.graphOptions = {
      series: [
        {
          name: 'Ventas del mes de abril',
          data: dataSeries,
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#000000',
            align: 'center',
            format: '${point.y:,.0f}', // one decimal
            y: 0, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
          }
        }
      ],
      chart: {
        type: 'column',
      },
      title: {
        text: 'Ventas del mes de abril',
      },
      xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Ventas'
          }
      },
    };
  }
}
