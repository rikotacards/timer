import React from 'react';

import * as d3 from 'd3'
import './StackedBarChar.css'

interface DataPoint {
  [key:string]: number
}
interface StackedBarChartProps  {
  data: DataPoint[]
  categoryIds: string[]
}
export const StackedBarChart: React.FC<StackedBarChartProps> = ({categoryIds, data}) => {
  const chartRef = React.useRef();
  // {date: july1, timer: 40, 45}
  React.useEffect(() => {
    console.log('incoming', data)
    
      const svg = d3.select(chartRef.current);
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;
      const getMax = (d) => {
        let sum = 0;
        for(let key in d){
          if(key === 'date'){
            sum = sum + 0;
            continue;
          }
          sum = d[key] + sum
        }
        console.log('sum', sum )
        return sum
      }
      const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
      const x = d3.scaleBand()
          .domain(data.map(d => d.date))
          .range([0, width])
          .padding(0.1);

      const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => getMax(d))])
          .nice()
          .range([height, 0]);
      
      const color = d3.scaleOrdinal()
          .domain(categoryIds)
          .range([ '#ff0000', '#9F00FF', '#ff1493', '#619eff', '#faa501']);

      const stack = d3.stack()
          .keys(categoryIds);

      const series = stack(data);
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

      const layer = g.selectAll(".layer")
          .data(series)
          .enter().append("g")
          .attr("class", "layer")
          .attr("fill", d => color(d.key));

      layer.selectAll("rect")
          .data(d => d)
          .enter().append("rect")
          .attr("x", d => x(d.data.date))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth())
          .on("mouseover", (event, d) => {
            console.log('dddd', d)
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Date: ${d.data.date}<br>Value: ${d[1] - d[0]}`)
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

    <svg ref={chartRef} width={800} height={500}></svg>
  )
  
}