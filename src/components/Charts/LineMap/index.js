import React, { useEffect, useRef, useState } from 'react'
import HighChart from 'highcharts'
import HighChartsReact from 'highcharts-react-official'
import highChartsMap from 'highcharts/modules/map'
import { cloneDeep } from 'lodash';

highChartsMap(HighChart);

const initOptions={
    chart: {
        height: '500',
      },
      title: {
        text: null,
      },
      mapNavigation: {
        enabled: true,
      },
      colorAxis: {
        min: 0,
        stops: [
          [0.2, '#FFC4AA'],
          [0.4, '#FF8A66'],
          [0.6, '#FF392B'],
          [0.8, '#B71525'],
          [1, '	#7A0826'],
        ],
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
      },
      series: [
        {
            mapData:{},
          name: 'Dân số',
          joinBy: ['hc-key', 'key'],
        },
      ],
}

export default function LineMap({mapData}) {
  
    const [options,setOptions] =useState({});
    const chartRef=useRef(null);
    const [configLoaded,setconfigLoaded] =useState(false);


    useEffect(()=>{
      if(mapData && Object.keys(mapData).length){
        const fakeData = mapData.features.map((feature,index)=>({
          key: feature.properties['hc-key'],
          value: index,
    
        }))
        setOptions({
            ...initOptions,
            series:[{
              ...initOptions.series[0],
              mapData: mapData,
              data:fakeData,
            }
                   
            ]
        })
      }
       
    },[mapData])
    useEffect(()=>{
        if(chartRef&&chartRef.current){
          chartRef.current.chart.series[0].update({
            mapData,
          });
          if(!configLoaded) setconfigLoaded(true);
        }
    },[mapData,configLoaded])
    if(!configLoaded) return null;

    return (
        
        <HighChartsReact 
        HighCharts={HighChart}
        options={cloneDeep(options)}
        constructorType='mapChart'
        ref={chartRef}
        />
    )
}
