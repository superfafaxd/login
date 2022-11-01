
import './styles2.css'
import { useAuthStore } from '../../hooks/store/useAuthStore';
import { useState } from 'react';
import { LoginLayout } from '../latout/LoginLayout';
import { AuthWithPhoneNumber } from './AuthWithPhoneNumber';
import { AuthWithEmailAndGoogle } from './AuthWithEmailAndGoogle';




export const LoginPage = () => {

 




    return (
        <LoginLayout>

         <AuthWithEmailAndGoogle /> 
          {/*   {
                (!hiddenFormNumber)
                    ? (<AuthWithEmailAndGoogle />)
                    : (<AuthWithPhoneNumber />)
            }
 */}
        </LoginLayout>
    )
}

