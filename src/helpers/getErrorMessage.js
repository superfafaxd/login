import React from 'react'
import { errorsCodes } from './errorCodes'

export const getErrorMessage = ( errorCode ) => {

    const validError = errorsCodes.map(a => (
        a.errorCode
    ))
    if(!validError.includes(errorCode)){
        console.log('no ta')
        return false
       // throw new Error('Error no encontrado')
    }
        
    return errorsCodes.filter(err => err.errorCode === errorCode)
}
