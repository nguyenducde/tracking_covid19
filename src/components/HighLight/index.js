import { Card, Grid, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import HighCard from './HighCard';

export default function HighLight({report}) {
    console.log(report)
    const data=report&&report.length? report[report.length-1] :[];
    const sumary=[{
        title:'Số ca nhiễm',
        count:data.Confirmed,
        type:'confirmed'
    },
    {
        title:'Khỏi',
        count:data.Recovered,
        type:'recovered'
    },
    {
        title:'Tử vong',
        count:data.Deaths,
        type:'death'
    }
]
    return (
        <Grid container spacing={3}>
            {
              
            sumary.map(item=> (
                <Grid item sm={4} xs={12} >
                     <HighCard title={item.title} count={item.count} type={item.type} />
                </Grid>
           ))
            }
            
        </Grid>
    )
}
