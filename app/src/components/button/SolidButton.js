import React from 'react'
import './Button.css'

const SolidButton = ({title, onClick}) => {
    return (
        <button onClick={onClick} className="solid">
            {title}
        </button>
    )
}

export default SolidButton
