import { color } from 'd3-color';
import { image } from 'd3-fetch';
import React, { useRef, useEffect } from 'react'


const Panel = ({ configuration, changeConfig, handleImageUpload }) => {
    const nodeRadiusRef = useRef();
    const nodeColorRef = useRef();
    const nodeLabelColorRef = useRef();

    const edgeColorRef = useRef();
    const edgeStrokeRef = useRef();
    const edgeLabelColorRef = useRef();
    const edgeDefaultValueRef = useRef();

    const imageWidthRef = useRef();
    const imageHeightRef = useRef();





    useEffect(() => {
        nodeRadiusRef.current.value = configuration.nodeRadius
        nodeColorRef.current.value = configuration.nodeColor
        nodeLabelColorRef.current.value = configuration.nodeLabelColor

        edgeColorRef.current.value = configuration.edgeColor
        edgeStrokeRef.current.value = configuration.edgeStroke
        edgeLabelColorRef.current.value = configuration.edgeLabelColor
        edgeDefaultValueRef.current.value = configuration.edgeDefaultValue

        imageHeightRef.current.value = configuration.imageHeight
        imageWidthRef.current.value = configuration.imageWidth




    }, [configuration])




    return (
        <div id="Panel" className='outerContainer'>
            <div style={{ color: "black", textAlign: 'center' }}> <h1>Panel</h1></div>
            <div>

                <form action="" id='testdiv'>
                    <div >
                        <h3>Node </h3>
                        <div>

                            <p>Node Radius:{" "}
                                <input ref={nodeRadiusRef}
                                    type="text"
                                    className='input-class'
                                    onBlur={(e) => changeConfig({
                                        type: 'nodeRadius',
                                        value: e.target.value
                                    })
                                    }
                                    onKeyDown={
                                        (e) => {

                                            console.log('keyup');
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                e.preventDefault();
                                                changeConfig({
                                                    type: 'nodeRadius',
                                                    value: e.target.value
                                                })
                                            }
                                        }
                                    } /> </p>
                        </div>
                        <div>
                            <p>Node color:{" "}
                                <input ref={nodeColorRef}
                                    type="color"
                                    onChange={(e) => changeConfig({
                                        type: 'nodeColor',
                                        value: e.target.value
                                    })
                                    }
                                />
                            </p>
                        </div>
                        <div>
                            <p>Node label color:{" "}
                                <input ref={nodeLabelColorRef}
                                    type="color"
                                    onChange={(e) => changeConfig({
                                        type: 'nodeLabelColor',
                                        value: e.target.value
                                    })
                                    }
                                />
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3>Edge</h3>
                        <div>
                            <p>Edge Color:{" "}
                                <input ref={edgeColorRef}
                                    type="color"
                                    onChange={(e) => changeConfig({
                                        type: 'edgeColor',
                                        value: e.target.value
                                    })
                                    }
                                />
                            </p>
                        </div>
                        <div>
                            <p>Edge Label Color:{" "}
                                <input ref={edgeLabelColorRef}
                                    type="color"
                                    onChange={(e) => changeConfig({
                                        type: 'edgeLabelColor',
                                        value: e.target.value
                                    })
                                    }
                                />
                            </p>
                        </div>
                        <div>
                            <p>Edge Stroke:{" "}
                                <input ref={edgeStrokeRef}
                                    type="text"
                                    onBlur={(e) => changeConfig({
                                        type: 'edgeStroke',
                                        value: e.target.value
                                    })
                                    }
                                    onKeyDown={
                                        (e) => {

                                            console.log('keyup');
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                e.preventDefault();
                                                changeConfig({
                                                    type: 'edgeStroke',
                                                    value: e.target.value
                                                })
                                            }
                                        }
                                    } /> </p>
                        </div>
                        <div>
                            <p>Edge Default value :{" "}
                                <input ref={edgeDefaultValueRef}
                                    type="text"
                                    onBlur={(e) => changeConfig({
                                        type: 'edgeDefaultValue',
                                        value: e.target.value
                                    })
                                    }
                                    onKeyDown={
                                        (e) => {

                                            console.log('keyup');
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                e.preventDefault();
                                                changeConfig({
                                                    type: 'edgeDefaultValue',
                                                    value: e.target.value
                                                })
                                            }
                                        }
                                    } /> </p>
                        </div>
                    </div>
                    <div>
                        <h3>Image</h3>
                        <div>
                            <p>Image Width :{" "}
                                <input ref={imageWidthRef}
                                    type="text"
                                    onBlur={(e) => changeConfig({
                                        type: 'imageWidth',
                                        value: e.target.value
                                    })
                                    }
                                    onKeyDown={
                                        (e) => {

                                            console.log('keyup');
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                e.preventDefault();
                                                changeConfig({
                                                    type: 'imageWidth',
                                                    value: e.target.value
                                                })
                                            }
                                        }
                                    } /> </p>


                        </div>
                        <div>
                            <p>Image Height :{" "}
                                <input ref={imageHeightRef}
                                    type="text"
                                    onBlur={(e) => changeConfig({
                                        type: 'imageHeight',
                                        value: e.target.value
                                    })
                                    }
                                    onKeyDown={
                                        (e) => {

                                            console.log('keyup');
                                            if (e.key === 'Enter' || e.keyCode === 13) {
                                                e.preventDefault();
                                                changeConfig({
                                                    type: 'imageHeight',
                                                    value: e.target.value
                                                })
                                            }
                                        }
                                    } /> </p>


                        </div>
                        <div>

                            <input style={{ width: '200px' }} id="upload3" type="file" onChange={handleImageUpload} />
                            <select name="" id="">
                                <option value="white">white</option>
                                <option value="orange">orange</option>
                            </select>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Panel
