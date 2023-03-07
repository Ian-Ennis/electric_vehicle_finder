import React from 'react'
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Highchart({ selected }) {

    console.log('highchart state:', selected)

    const options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'MSRP'
        },
        series: [
          {
            data: 25,
          },
          {
            data: [1, 2, 1, 4, 3, 6]
          },
        ],
        yAxis: [{
            title: {
              text: 'Dollar amount'
            },
            showFirstLabel: true
          }],
      };

  return (
    <div>
      <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
    </div>
  );
}

export default Highchart;
