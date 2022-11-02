import React from 'react'

export const AlertError = ({messaje, errorMessage}) => {
    return (
        <div className="alert alert-danger" role="alert">
            <strong>{messaje}</strong> {errorMessage}
        </div>
    )
}
