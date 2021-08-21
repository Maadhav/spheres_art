import React from 'react'

export default class FilePicker extends React.Component {
    constructor(props) {
        super(props)

        this._handleUpload = this._handleUpload.bind(this)
    }

    _handleUpload(evt) {
        const file = evt.target.files[0]
        this.props.onChange(file)

        // free up the fileInput again
        this.fileInput.value = null
    }

    render() {
        return (
            <div style={this.props.style}>
                <input
                    type="file"
                    multiple={false}
                    style={{ display: 'none' }}
                    onChange={this._handleUpload}
                    accept={this.props.accept}
                    ref={ele => (this.fileInput = ele)}
                />
                {React.cloneElement(this.props.children, {
                    onClick: () => this.fileInput.click()
                })}
            </div>
        )
    }
}
