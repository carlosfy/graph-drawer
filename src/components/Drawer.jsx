import React, { useEffect, useRef, useState, useCallback } from 'react'
import { select } from 'd3';

const Drawer = ({ state, dispatchar }) => {
    const svgRef = useRef();
    const [inNode, setinNode] = useState(null)
    var containerEle = document.getElementById('container')
    const [mousePosition2, setMousePosition2] = useState({ x: 0, y: 0 })
    const handleMouseMove2 = useCallback(event => {
        const { clientX, clientY } = event;
        setMousePosition2({ x: clientX, y: clientY })
    }, [setMousePosition2])



    useEffect(() => {
        const svg = select(svgRef.current)
        containerEle = document.getElementById('container')

        // changeDistances(containerEle)
        dispatchar({ type: 'change-container', element: containerEle })

        svg.selectAll('.edge')
            .data(state.edges)
            .join('path')
            .attr('class', 'edge')
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('id', d => d.id)
            .attr('fill', 'none')
            .attr('z-index', 2)
            .attr('d', function (d) {
                let originNode = state.nodes.filter(n => n.id == d.source)[0];
                let finalNode = state.nodes.filter(n => n.id == d.target)[0];
                // console.log('originNode: ', originNode)
                return "M" + originNode.x + ',' + originNode.y + 'L' + finalNode.x + ',' + finalNode.y;
            })

        svg.selectAll('.edge-label')
            .data(state.edges)
            .join('text')
            .attr('class', 'edge-label')
            .attr('x', d => {
                let originNode = state.nodes.filter(n => n.id == d.source)[0];
                let finalNode = state.nodes.filter(n => n.id == d.target)[0];
                return ((originNode.x + finalNode.x) / 2);
            })
            .attr('y', d => {
                let originNode = state.nodes.filter(n => n.id == d.source)[0];
                let finalNode = state.nodes.filter(n => n.id == d.target)[0];
                return ((originNode.y + finalNode.y) / 2);
            })
            .text(d => d.value)
            .attr('fill', 'blue')

        svg.selectAll('.node')
            .data(state.nodes)
            .join('circle')
            .attr('class', 'node')
            .attr('id', d => d.id)
            .attr('r', 10)
            .attr('z-index', 10)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)

            // .raise()
            .attr('fill', (d) => {
                if (d.id == state.sourceEdge) return 'green';
                if (d.id === inNode) return 'orange';
                return 'black';
            })
            // .on('click', e => { console.log(e.target) })
            .on('mouseenter', (event, value) => { setinNode(old => value.id) })
            .on('mouseleave', (event, value) => setinNode(old => null))

        svg.selectAll('.names')
            .data(state.nodes)
            .join('text')
            .attr('class', 'names')
            .attr("x", d => d.x)
            .attr('y', d => d.y)
            .attr('fill', 'red')
            .text(d => d.id)
            .attr('opacity', 1)
            .attr('dx', 0)
            .attr('dy', 0)
            .raise()


    }, [state.nodes, state.edges, inNode, state.sourceEdge])
    useEffect(() => {
        const svg = select(svgRef.current)
        svg.select('#photo')
            .attr('x', () => {
                if (state.imageState == 0) return state.imagePosition.x;
                return state.imagePosition.x + mousePosition2.x - state.firstClick.x;
            })
            .attr('y', () => {
                if (state.imageState == 0) return state.imagePosition.y;
                return state.imagePosition.y + mousePosition2.y - state.firstClick.y;
            })
    }, [mousePosition2])

    useEffect(() => {
        const svg = select(svgRef.current)
        svg.select('#photo')
            .attr('x', () => {
                if (state.imageState == 0) return state.imagePosition.x;
                return state.imagePosition.x + mousePosition2.x - state.firstClick.x;
            })
            .attr('y', () => {
                if (state.imageState == 0) return state.imagePosition.y;
                return state.imagePosition.y + mousePosition2.y - state.firstClick.y;
            })
            .attr('width', 500)
            .attr('height', 500)
            .attr('href', d => state.sourceImage)
    }, [state.sourceImage])

    return (
        <div id='container' style={{ width: state.dimensions.width, height: state.dimensions.height, marginBottom: "2rem" }} >
            <svg id='svg' className='theSvg' ref={svgRef} style={{ width: "100%" }} onMouseMove={handleMouseMove2} onClick={(e) => { dispatchar({ type: 'event', event: e }); console.log('In drawer: ', e.target.className.baseVal) }}>
                <image className='theImage' href='./googleLogo.png' id='photo' x="0" y="0" height="100" width="100" />
                <circle r='5' cx='20' cy='20' fill='red' >prueba de circulo</circle>
            </svg>
            <div>
                <p>Hover: {inNode}</p>
            </div>
        </div>
    )
}

export default Drawer
