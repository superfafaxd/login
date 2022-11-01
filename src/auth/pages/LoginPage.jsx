
import './styles2.css'
import { LoginLayout } from '../latout/LoginLayout';
import { AuthWithEmailAndGoogle } from './AuthWithEmailAndGoogle';
import { useCheckAuth } from '../../hooks/useCheckAuth';




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

