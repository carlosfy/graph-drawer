import React, { useRef, useEffect } from 'react'

const ConfigBox = ({ configuration, changeConfig }) => {
    const showValueEdgesRef = useRef();
    const nodeRadiusRef = useRef();
    const nodeColorRef = useRef();
    const edgeColorRef = useRef();

    useEffect(() => {
        showValueEdgesRef.current.checked = configuration.showValueEdges;
        nodeRadiusRef.current.value = configuration.nodeRadius;
        nodeColorRef.current.value = configuration.nodeColor;
        edgeColorRef.current.value = configuration.edgeColor;
    }, [configuration])

    return (
        <div id='configBox' className='box-component'>
            <h1>Configuration</h1>
            <br />
            <div className='input-container'>
                <div className='input-div'>
                    <div>Node radius: </div>
                    <input type="number"
                        ref={nodeRadiusRef}
                        onChange={
                            (e) => {
                                changeConfig({ type: 'nodeRadius', value: e.target.value })
                            }
                        } />
                </div>
                <div className='input-div'>
                    <div>Node color: </div>
                    <input type="color"
                        ref={nodeColorRef}
                        onChange={
                            (e) => {
                                changeConfig({ type: 'nodeColor', value: e.target.value })
                            }
                        } />
                </div>
                <div className='input-div'>
                    <div>Edge color: </div>
                    <input type="color"
                        ref={edgeColorRef}
                        onChange={
                            (e) => {
                                changeConfig({ type: 'edgeColor', value: e.target.value })
                            }
                        } />
                </div>
                <div className='input-div'>
                    <div>Show edges:  </div>
                    <label className='switch' >
                        <input ref={showValueEdgesRef} type="checkbox"

                            onChange={(e) => {
                                changeConfig({ type: 'showValueEdges', value: e.target.checked })
                            }} />
                        <span className='slider round'></span>
                    </label>
                </div>
            </div>

        </div>
    )
}

export default ConfigBox
