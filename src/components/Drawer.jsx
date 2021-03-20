import React, { useEffect, useState } from 'react'
import { select } from 'd3';

const Drawer = ({ sourceImage, nodes, edges, dimensions, add, svgReference, handleClick, changeDistances, selected }) => {
    const [inNode, setinNode] = useState(null)
    var containerEle = document.getElementById('container')
    // var image = document.getElementById("upload").files[0];
    function handleImageUpload() {

        var image = document.getElementById("upload").files[0];

        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("photo").src = e.target.result;
        }
        // console.log(reader.readAsDataURL(image))
        reader.readAsDataURL(image);

    }



    useEffect(() => {
        const svg = select(svgReference.current)
        containerEle = document.getElementById('container')
        // var image = document.getElementById("upload").files[0];
        // image = document.getElementById("upload").files[0];

        changeDistances(containerEle)





        svg.selectAll('.edge')
            .data(edges)
            .join('path')
            .attr('class', 'edge')
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('id', d => d.id)
            .attr('fill', 'none')
            .attr('z-index', 2)
            .attr('d', function (d) {
                return "M" + nodes[d.source].x + ',' + nodes[d.source].y + 'L' + nodes[d.target].x + ',' + nodes[d.target].y;
            })

        svg.select('#photo')
            .attr('x', 100)
            .attr('width', 500)
            .attr('height', 500)
            .attr('href', d => sourceImage)

        svg.selectAll('.node')
            .data(nodes)
            .join('circle')
            .attr('class', 'node')
            .attr('id', d => d.id)
            .attr('r', 7)
            .attr('z-index', 10)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            // .raise()
            .attr('fill', (d) => {
                if (d.id == selected) return 'green';
                if (d.id === inNode) return 'orange';
                return 'black';
            })
            // .on('click', e => { console.log(e.target) })
            .on('mouseenter', (event, value) => { setinNode(old => value.id) })
            .on('mouseleave', (event, value) => setinNode(old => null))
        // .attr('href', () => {
        //     var image = document.getElementById("upload").files[0];

        //     var reader = new FileReader();

        //     reader.onload = function (e) {
        //         return e.target.result;
        //     }
        //     // console.log(reader.readAsDataURL(image))
        //     reader.readAsDataURL(image);

        // })

    }, [nodes, edges, dimensions, inNode, selected, sourceImage])

    return (
        <div id='container' style={{ width: dimensions.width, height: dimensions.height, marginBottom: "2rem" }} >
            <svg id='svg' className='theSvg' ref={svgReference} style={{ width: "100%" }} onClick={(e) => { handleClick(e); console.log('In drawer: ', e.target.className.baseVal) }}>
                <image className='theImage' href='./googleLogo.png' id='photo' x="0" y="0" height="100" width="100" />
                <circle r='5' cx='20' cy='20' fill='black'></circle>
            </svg>
            <div>
                <p>Hover: {inNode}</p>
                <input id="upload" type="file" onChange={handleImageUpload} />
                <img id="display-image" src="" />
            </div>
        </div>
    )
}

export default Drawer
