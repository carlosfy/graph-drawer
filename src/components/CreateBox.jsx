import React, { useRef, useEffect } from 'react'

const CreateBox = ({ configuration, changeConfig }) => {
    const selectRef = useRef()

    useEffect(() => {
        selectRef.current.value = configuration.edgeDefaultValue

    }, [configuration])

    return (
        <div id='createBox' className='box-component'>
            <h1>Create Add</h1>
            <h3>This mode allows you to create nodes and edges:</h3>
            <br />
            <ul>
                <li>To create a node just click on the svg (outside of the nodes)</li>
                <li>To create an edge click on a node to select the source and then click on another node to choose the target. Click on the background to cancel.</li>
            </ul>
            <div className='input-div'><p>Value for new edges: <select ref={selectRef} onChange={(e) => changeConfig({ type: 'edgeDefaultValue', value: e.target.value })} name="value-edges" id="select-value">
                <option value={-1}>Distance</option>
                {[...Array(30).keys()].map(ele => <option name={`${ele}`}>{ele}</option>)}
            </select></p></div>

        </div>
    )
}

export default CreateBox
