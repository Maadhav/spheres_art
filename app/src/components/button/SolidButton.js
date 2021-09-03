import React from 'react'
import './Button.css'

const SolidButton = ({title, onClick,style}) => {
    return (
        <button style={style} onClick={onClick} className="solid">
            {title}
        </button>
    )
}

export default SolidButton
