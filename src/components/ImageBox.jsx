import React from 'react'

const ImageBox = ({ handleImageUpload }) => {
    return (
        <div className='box-component'>
            <h1>Image mode</h1>

            <p> In this mode you can move insert an image in the background and choose the position of it in the svg</p>
            <br />
            <p> For moving the picture just click on the picture while your are in "Image mode"</p>
            <br />
            <p>Upload your image: <input style={{ width: '200px' }} id="upload4" type="file" onChange={handleImageUpload} /></p>
        </div>
    )
}

export default ImageBox
