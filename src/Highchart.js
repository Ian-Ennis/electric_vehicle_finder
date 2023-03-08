import React from 'react'
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Highchart({ selected }) {

  let selectedNames = [];
  let selectedCapacities = [];

  selected.forEach((car) => {
    selectedNames.push(car.model);
    selectedCapacities.push(car.battery_capacity_kwh);
  });

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Battery Capacities",
    },
    subtitle: {
      text: "Source: developer.nrel.gov",
    },
    xAxis: {
      categories: selectedNames,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Kilowatt Hours (kWh)",
      },
    },
    // tooltip: {
    //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //   pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //     '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
    //   footerFormat: '</table>',
    //   shared: true,
    //   useHTML: true
    // },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        data: selectedCapacities,
      },
    ],
  };

  return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
  );
}

export default Highchart;
