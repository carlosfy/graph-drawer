import React, { useEffect, useRef, useState, useCallback } from 'react'
import { select } from 'd3';

const Drawer = ({ state, dispatchar, configuration }) => {
    const radio = 15;
    const svgRef = useRef();
    const [inNode, setinNode] = useState(null)
    var containerEle = document.getElementById('container')
    const [mousePosition2, setMousePosition2] = useState({ x: 0, y: 0 })
    const handleMouseMove2 = useCallback(event => {
        const { clientX, clientY } = event;
        setMousePosition2({ x: clientX, y: clientY })
    }, [setMousePosition2])

    useEffect(() => {
        containerEle = document.getElementById('container')

        // changeDistances(containerEle)
        dispatchar({ type: 'change-container', element: containerEle })
    }
        , [])

    useEffect(() => {
        const svg = select(svgRef.current)


        svg.selectAll('.edge')
            .data(state.edges)
            .join('path')
            .attr('class', 'edge')
            .attr('stroke', d => configuration.edgeColor)
            .attr('stroke-width', d => configuration.edgeStroke)
            .attr('id', d => d.id)
            .attr('z-index', 2)
            .attr('d', function (d) {
                let originNode = state.nodes.filter(n => n.id == d.source)[0];
                let finalNode = state.nodes.filter(n => n.id == d.target)[0];
                let x1 = originNode.x;
                let y1 = originNode.y;
                let x2 = finalNode.x;
                let y2 = finalNode.y;
                let deltaX = x1 - x2;
                let deltaY = y1 - y2;

                let longueur = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (longueur) {
                    x1 = x1 - (deltaX * configuration.nodeRadius / longueur)
                    x2 = x2 + (deltaX * configuration.nodeRadius / longueur)
                    y1 = y1 - (deltaY * configuration.nodeRadius / longueur)
                    y2 = y2 + (deltaY * configuration.nodeRadius / longueur)
                }

                // console.log('originNode: ', originNode)
                return "M" + x1 + ',' + y1 + 'L' + x2 + ',' + y2;
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
            .attr('opacity', function (d) { if (configuration.showValueEdges) { return 1 } else { return 0 } })

            .attr('fill', d => configuration.edgeLabelColor)

        svg.selectAll('.node')
            .data(state.nodes)
            .join('circle')
            .attr('class', 'node')
            .attr('id', d => d.id)
            .attr('r', d => configuration.nodeRadius)
            .attr('z-index', 10)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)

            // .raise()
            .attr('fill', (d) => {
                if (d.id == state.sourceEdge) return 'green';
                if (d.id === inNode) return 'orange';
                return configuration.nodeColor//'#326fa8';
            })
            // .on('click', e => { console.log(e.target) })
            .on('mouseenter', (event, value) => { setinNode(old => value.id) })
            .on('mouseleave', (event, value) => setinNode(old => null))

        svg.selectAll('.node-label')
            .data(state.nodes)
            .join('text')
            .attr('class', 'node-label')
            .attr("x", d => d.x)
            .attr('y', d => d.y)
            .attr('fill', d => configuration.nodeLabelColor)
            .attr('font-size', 15)
            .attr('font-weight', 'bolder')
            .text(d => d.id)
            .attr('opacity', 1)


            .attr('dx', -4)
            .attr('dy', 4)
            .attr('id', d => d.id)
            // .on('mouseenter', (event, value) => { setinNode(old => value.id) })
            // .on('mouseleave', (event, value) => setinNode(old => null))
            .raise()


    }, [state.nodes, state.edges, inNode, state.sourceEdge, configuration])
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
            .attr('width', d => configuration.imageWidth)
            .attr('height', 500)
            .attr('href', d => state.sourceImage)
    }, [state.sourceImage, configuration.imageWidth, configuration.imageHeight])

    return (
        <div id='container' className='outerContainer' preserveAspectRatio="none" style={{ width: state.dimensions.width, height: state.dimensions.height, marginBottom: "2rem" }} >
            <svg id='svg' className='theSvg' ref={svgRef} style={{ width: "100%" }} onMouseMove={handleMouseMove2} onClick={(e) => { dispatchar({ type: 'event', event: e }); console.log('In drawer: ', e.target.className.baseVal) }}>
                <image className='theImage' href='./googleLogo.png' id='photo' x="0" y="0" height="100" width="100" />
            </svg>
            <div>
                <p>Hover: {inNode}</p>
            </div>
        </div>
    )
}

export default Drawer
