import React from 'react'

const LinedButton = ({ title, onClick,style }) => {
    return (
        <button style={style} className="lined" onClick={onClick} >
            <span>{title}</span>
        </button>
    )
}

export default LinedButton
