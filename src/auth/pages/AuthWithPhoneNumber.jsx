import { useForm } from '../../hooks/useForm'
import './styles2.css'
import { useAuthStore } from '../../hooks/store/useAuthStore';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FirebaseAuth } from '../../firebase/config';
import { RecaptchaVerifier } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import {  setRecaptcha } from '../../store/auth/authSlice';


const loginFormFields = {
    numero: '+52 375 118 8753',
    codigoVerificacion: '123456'
}
export const AuthWithPhoneNumber = () => {
    const dispatch = useDispatch()
    
    const { recaptcha } = useSelector(state => state.auth);
    const { numero, codigoVerificacion, onInputChange } = useForm(loginFormFields);
    const { setUpRecaptcha, verify, sendMessage } = useAuthStore();
    const [hiddenFormConfirm, setHiddenFormConfirm] = useState(true)
    const [hiddenFormNumber, setHiddenFormNumber] = useState(false)
    const [confirmObj, setConfirmObj] = useState("");
    //let recaptchaVerifier = RecaptchaVerifier 
    //let recaptchaVerifier = [] 

    //-----------------------------------------------------------------------------

    const onSubmitSMS = async (event) => {
        event.preventDefault();
        if (numero === "" || numero === undefined) return
        try {
            //const response = await setUpRecaptcha(numero);
            //console.log(response)
            const recaptchaVerifier = await setUpRecaptcha(/* numero */);
            dispatch(setRecaptcha(recaptchaVerifier))
            console.log(recaptchaVerifier)
            const response = await sendMessage(numero, FirebaseAuth, recaptchaVerifier);
            setConfirmObj(response)
            setHiddenFormNumber(true)
            setHiddenFormConfirm(false)
        } catch (err) {
            console.log('error ptm ' + err)
            throw err
        }
        console.log(numero)
    }

    const reSendCode =async () => {
        await sendMessage(numero, FirebaseAuth, recaptcha);
  

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(codigoVerificacion)
        dispatch(setRecaptcha(""))
        verify(confirmObj, codigoVerificacion);

    }


    return (
        <div >
            <h3>Login</h3>
            <form onSubmit={onSubmitSMS} hidden={hiddenFormNumber}>

                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Numero"
                        name='numero'
                        value={numero}
                        onChange={onInputChange}
                    />
                </div>

                <div className="d-grid gap-2">
                    <input
                        type="submit"
                        className="btn btn-secondary"
                        name='btn-enviarSMS'
                        value='Enviar SMS'
                    />
                </div>
            </form>

            <form onSubmit={onSubmit} hidden={hiddenFormConfirm}>
                <div className="form-group mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Codigo de verificacion"
                        name='codigoVerificacion'
                        value={codigoVerificacion}
                        onChange={onInputChange}
                    //disabled={true}

                    />
                </div>

                <div className="d-grid gap-2">
                    <input
                        type="submit"
                        className="btn btn-secondary"
                        name='btn-enviar'
                        value='Confirmar Codigo'
                    //disabled={true}

                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={reSendCode} >Reenviar Codigo</button>

                {/* <div className="d-flex justify-content-end mt-3">
                    <span>Cambiar de numero</span>
                    <div className="me-2"></div>
                    
                </div> */}

            </form>
            <div id='captcha'></div>
        </div>

    )
}