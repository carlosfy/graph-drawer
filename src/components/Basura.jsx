import './App.css';
import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { select, line, curveCardinal, scaleLinear, axisBottom, axisRight, scaleBand } from 'd3';
import Barchart from './components/Barchart.jsx'

function App() {
    // const svgRef = useRef();
    const [data, setData] = useState([25, 30, 45, 60, 20, 200, 8]);

    // useEffect(() => {
    //   const svg = select(svgRef.current);

    //   const xScale = scaleBand().domain(data.map((d, i) => i)).range([0, 300]).padding(0.5);
    //   const yScale = scaleLinear().domain([0, Math.max(...data)]).range([150, 0])
    //   const colorScale = scaleLinear().domain([75, 100, 150]).range(['green', 'orange', 'red']).clamp(true)

    //   const xAxis = axisBottom(xScale).ticks(data.length);
    //   const yAxis = axisRight(yScale)
    //   svg.select(".x-axis").style('transform', 'translateY(150px)').call(xAxis);
    //   svg.select(".y-axis").style('transform', 'translateX(300px)').call(yAxis);

    //   svg
    //     .selectAll('.bar')
    //     .data(data).join('rect')
    //     .attr('class', 'bar')
    //     .style('transform', 'scale(1, -1)')
    //     .attr('x', (value, index) => xScale(index))
    //     .attr('y', (value) => -150)
    //     .attr('width', xScale.bandwidth())
    //     .on('mouseenter', (event, value) => {

    //       const index = svg
    //         .selectAll('.bar')
    //         .nodes().
    //         indexOf(event.target);

    //       svg.selectAll('.tooltip')
    //         .data([value])
    //         .join((enter) => enter.append('text').attr('y', yScale(value) - 4))
    //         .attr('class', 'tooltip')
    //         .text(value)
    //         .attr('text-anchor', 'middle')
    //         .attr("x", xScale(index) + xScale.bandwidth() / 2)
    //         .transition()
    //         .attr('y', yScale(value) - 8)
    //         .attr('opacity', 1)


    //     })
    //     .on('mouseleave', () => svg.select('.tooltip').remove())
    //     .transition()
    //     .attr('fill', colorScale)
    //     .attr('height', (value) => 150 - yScale(value));
    //////////////////////////   
    // svg
    // .selectAll(".bar")
    // .data(data)
    // .join("rect")
    // .attr("class", "bar")
    // .style("transform", "scale(1, -1)")
    // .attr("x", (value, index) => xScale(index))
    // .attr("y", -150)
    // .attr("width", xScale.bandwidth())
    // .on("mouseenter", (event, value) => {
    //   // events have changed in d3 v6:
    //   // https://observablehq.com/@d3/d3v6-migration-guide#events
    //   const index = svg.selectAll(".bar").nodes().indexOf(event.target);
    //   console.log(svg.selectAll(".bar"))
    //   svg
    //     .selectAll(".tooltip")
    //     .data([value])
    //     .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
    //     .attr("class", "tooltip")
    //     .text(index)
    //     .attr("x", xScale(index) + xScale.bandwidth() / 2)
    //     .attr("text-anchor", "middle")
    //     .transition()
    //     .attr("y", yScale(value) - 8)
    //     .attr("opacity", 1);
    // })
    // .on("mouseleave", () => svg.select(".tooltip").remove())
    // .transition()
    // .attr("fill", colorScale)
    // .attr("height", (value) => 150 - yScale(value));
    ///////////////////////////////////////
    // const myLine = line()
    //   .x((value, index) => xScale(index))
    //   .y(value => yScale(value))
    //   .curve(curveCardinal);

    // svg.selectAll('.line').data([data]).
    //   join('path')
    //   .attr('class', 'line')
    //   .attr("d", value => myLine(value))
    //   .attr("fill", 'none')
    //   .attr('stroke', 'blue')
    // svg.selectAll('circle').data(data).join(
    //   // enter => enter.append('circle').attr('class', 'new'),
    //   // update => update.attr('class', 'updated')
    //   'circle'
    // ).attr("r", value => value)
    //   .attr("cx", value => 2 * value)
    //   .attr('cy', value => value * 2)
    //   .attr('stroke', 'red');

    // }, [data])
    return (
        <React.Fragment>
            <Barchart data={data}></Barchart>
            <button onClick={() => setData(data.map(ele => ele + 5))}>Increase</button>
            <button onClick={() => setData(data.filter(ele => ele < 35))}>Filter</button>
            <button onClick={() => setData([...data, Math.round(Math.random() * 150)])}>Add</button>

        </React.Fragment>

    )
}



export default App;


// function App() {
//   const [mousePosition, setMousePosition] = useState(initialMousePosition);
//   const [counter, setCounter] = useState(0)
//   const handleMouseMove = useCallback(event => {
//     setCounter(counter => counter + 1);
//     const { clientX, clientY } = event;
//     setMousePosition({ x: clientX, y: clientY });

//   }, [setMousePosition])
//   return (
//     <>
//       <svg width={width} height={height} onMouseMove={handleMouseMove}>
//         <g transform={``}>
//           <image href="./googleLogo.png" x={mousePosition.x} y={mousePosition.y} height="100px" width="200px" />
//         </g>
//       </svg>
//       <p>{counter}</p>
//       <p>{mousePosition.x}</p>
//     </>
//   );
// }

