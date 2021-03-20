// import { axisRight } from 'd3-axis';
import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { scaleBand, scaleLinear } from 'd3-scale';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";

// import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ref => {
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimensions(entry.contentRect)
            })
        })
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget);
        }

    }, [ref])
    return dimensions
}

const Barchart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef)




    useEffect(() => {

        const svg = select(svgRef.current);

        if (!dimensions) return;


        const xScale = scaleBand()
            .domain(data.map((value, index) => index))
            .range([0, dimensions.width])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0, Math.max(...data)])
            .range([dimensions.height, 0]);

        const colorScale = scaleLinear()
            .domain([75, 100, 150])
            .range(['green', 'orange', 'red'])
            .clamp(true);

        const xAxis = axisBottom(xScale).ticks(data.length);
        const yAxis = axisRight(yScale);

        svg.select(".x-axis")
            .style('transform', `translateY(${dimensions.height}px)`)
            .call(xAxis);
        svg.select('.y-axis')
            .style('transform', `translateX(${dimensions.width}px)`)
            .call(yAxis);

        svg
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .style('transform', 'scale(1, -1)')
            .attr('x', (value, index) => xScale(index))
            .attr('y', (value) => -dimensions.height)
            .attr('width', xScale.bandwidth())
            .on('mouseenter', (event, value) => {

                const index = svg
                    .selectAll('.bar')
                    .nodes()
                    .indexOf(event.currentTarget);

                svg
                    .selectAll('.tooltip')
                    .data([value])
                    .join((enter) => enter.append('text').attr('y', yScale(value) - 4))
                    .attr('class', 'tooltip')
                    .text(index)
                    .attr('x', xScale(index) + xScale.bandwidth() / 2)
                    .attr('text-anchor', 'middle')
                    .transition()
                    .attr('y', yScale(value) - 8)
                    .attr('opacity', 1)
            })
            .on('mouseleave', () => svg.select('.tooltip').remove())
            .transition()
            .attr('fill', colorScale)
            .attr('height', (value) => dimensions.height - yScale(value))


    }, [data, dimensions])

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
            <svg ref={svgRef} >
                <g className='x-axis'></g>
                <g className='y-axis'></g>
            </svg>
        </div>


    )
}

export default Barchart;
