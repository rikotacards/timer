import React from 'react';
import './stackedBarChart.css'
import * as d3 from 'd3'
import { useAppDataContext } from '../Providers/contextHooks';

interface DataPoint {
  [key:string]: number | string
}
interface StackedBarChartProps  {
  data: DataPoint[]
  categoryIds: string[]
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({categoryIds, data}) => {
  const chartRef = React.useRef();
  const {categories} = useAppDataContext();

  // {date: july1, timer: 40, 45}
  React.useEffect(() => {
    console.log('incoming', data)
    
      const svg = d3.select(chartRef.current);
     const format = d3.format(".2f")
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const keys = categoryIds

     
      const getColor = (categoryId: string) => {
        console.log(categoryId)
        const color = categories.find((c) => c.categoryId === categoryId)?.color
        return color
      } 

      const getCategoryName = (categoryId: string) => {
        const name = categories.find((c) => c.categoryId === categoryId)?.categoryName
        return name
      }
      const getMax = (d) => {
        let sum = 0;
        for(const key in d){
          if(key === 'date'){
            sum = sum + 0;
            continue;
          }
          sum = d[key] + sum
        }
        console.log('sum', sum)
        return sum 
      }

      const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip-chart")
      .style("opacity", 1);

      const x = d3.scaleBand()
          .domain(data.map(d => `${d.date}`))
          .range([0, width])
          .padding(0.1);

      const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => getMax(d))])
          .nice()
          .range([height, 0]);
      
      
      // Stack the data
      const stack = d3.stack().keys(keys)(data)
   
      svg.selectAll("*").remove(); // Clear the SVG content before adding new elements

      const g = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

      g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, "s"));

      // pass in the color here
      const layer = g.selectAll(".layer")
          .data(stack)
          .enter().append("g")
          .attr("class", "layer")
          .attr('fill', d => getColor(d.key) || 'gray')


      layer.selectAll("rect")
          .data(d => d)
          .enter().append("rect")
          .attr("x", d => x(d.data.date))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth())
          .on("mouseover", (event, d) => {
            const dateData = data.find(item => item.date === d.data.date);
            const toolTipInfo = [];
            for(const key in dateData){
              if(key !== 'date'){
                toolTipInfo.push(`<div class='tooltip-chart-item'>${getCategoryName(key)}${format(dateData[key])} hours</div>`)
              }
            }
            console.log('DATE DATA', dateData)
            // const key = d3.select('.parent').datum().key;
            tooltip.transition()
                .duration(150)
                .style("opacity", 1);
            tooltip.html(`${dateData.date}<br> ${toolTipInfo}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
          
          
  }, [data]);
  
  return(

    <svg style={{width:'100%'}} ref={chartRef}  height={500}></svg>
  )
  
}