import React from 'react'
import './DocumentationLayout.scss'

const DocumentationLayout = ({ title, description, children }) => {
    return (
        <div className="documentation-layout">
            <div className="doc-header">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            
            <div className="doc-content">
                {children}
            </div>
        </div>
    )
}

export default DocumentationLayout 