import React from 'react'

const CreateBox = () => {
    return (
        <div id='createBox' className='box-component'>
            <h1>Create Add</h1>
            <h4>This mode allows you to create nodes and edges:</h4>
            <p>This mode allows you to create nodes and edges:</p>
            <br />
            <ul>
                <li>To create a node just click on the svg (outside of the nodes)</li>
                <li>To create an edge click on a node to select the source and then click on another node to choose the target. Click on the background to cancel.</li>
            </ul>
            <p>Value for new edges: </p>
        </div>
    )
}

export default CreateBox
