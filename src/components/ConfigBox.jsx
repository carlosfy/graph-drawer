import React from 'react'

const ConfigBox = () => {
    return (
        <div id='configBox' className='box-component'>
            <h1>Configuration</h1>
            <br />
            <div className='input-div'>
                <div>Node radius: </div>
                <input type="number" />
            </div>
            <div className='input-div'>
                <div>Node color: </div>
                <input type="number" />
            </div>
            <div className='input-div'>
                <div>Edge color: </div>
                <input type="number" />
            </div>
            <div className='input-div'>
                <div>Show edges:  </div>
                <label className='switch' >
                    <input type="checkbox" />
                    <span className='slider round'></span>
                </label>
            </div>

        </div>
    )
}

export default ConfigBox
