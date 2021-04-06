import React from 'react'

const OutputBlock = ({ adj, nodes, edges }) => {

    return (
        <div id="outputBlock" className='box-component'>
            <div > <h1>Outputs</h1></div>
            <div>
                <p><h3>Adjency matrix</h3></p>
                <textarea name="outputText" id="adj-output" cols="40" rows="10" value={adj.map(ele => "[" + ele + "]\n")} ></textarea>
            </div>
            <div>
                <p><h3>Nodes</h3></p>
                <textarea name="outputText" id="nodes-output" cols="40" rows="10" value={nodes.map(ele => `{id: ${ele.id}, x: ${ele.x}, y: ${ele.y}}\n`)} ></textarea>
            </div>
            <div>
                <p><h3>Edges</h3></p>
                <textarea name="outputText" id="edges-output" cols="40" rows="10" value={edges.map(ele => `{id: ${ele.id}, source: ${ele.source}, target: ${ele.target}, value: ${ele.value}}\n`)} ></textarea>
            </div>
        </div>
    )
}

export default OutputBlock

/*
[0,1,0,0,0,0,0,0]
,[1,0,0,0,0,0,0,0]
,[0,0,0,0,0,0,0,1]
,[0,0,1,0,0,0,0,0]
,[0,0,1,0,0,0,0,0]
,[0,0,0,0,0,0,0,0]
,[0,0,0,0,0,0,0,0]
,[0,0,0,1,0,1,0,0]
*/
