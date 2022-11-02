import { useForm } from '../../hooks/useForm'
import './styles2.css'
import { useAuthStore } from '../../hooks/store/useAuthStore';
import { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
//import queryString from 'query-string';
import { FirebaseAuth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { setRecaptcha, onSetError } from '../../store/auth/authSlice';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { AlertError } from '../../ui/components/AlertError';

const loginFormFields = {
    //'+52 375 118 8753',
    codigoVerificacion: '123456',
    //searchText: q
}

export const AuthWithPhoneNumber = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const location = useLocation();
    //Numero en query parameter
    //const { q = '' } = queryString.parse(location.search);

   //const {searchTex, onInputChange: onInputChangeNumber} = useForm({searchText: q});
    //--------------------------------------------------------------------

    const { errorMessage } = useSelector(state => state.auth);

    const { recaptcha } = useSelector(state => state.auth);
    const { codigoVerificacion, onInputChange } = useForm(loginFormFields);
    const { setUpRecaptcha, verify, sendMessage } = useAuthStore();
    const [hiddenFormConfirm, setHiddenFormConfirm] = useState(true)
    const [hiddenFormNumber, setHiddenFormNumber] = useState(false)
    const [confirmObj, setConfirmObj] = useState("");
    const [number, setNumber] = useState("+52 375 118 8753");
    const [loadingSendMessage, setLoadingSendMessage] = useState(true)
    //-----------------------------------------------------------------------------


    const onSubmitSMS = async (event) => {
        event.preventDefault();
        if (number === "" || number === undefined) return
        try {
            //const response = await setUpRecaptcha(numero);
            //console.log(response)
            const recaptchaVerifier = await setUpRecaptcha(/* numero */);
            dispatch(setRecaptcha(recaptchaVerifier))
            console.log(recaptchaVerifier)
            setLoadingSendMessage(false) //muestra el loader en el boton al enviar el mensaje
            const response = await sendMessage(number, FirebaseAuth, recaptchaVerifier);
            setLoadingSendMessage(true) //oculta el loader en el boton al enviar el mensaje
            setConfirmObj(response)
            setHiddenFormNumber(true)
            setHiddenFormConfirm(false)
        } catch (error) {
            console.log('error ptm ' + error)
            const errorCode = error.code
            console.log('Error Code ' + errorCode);
            const errorMessage = error.message;
            console.log('Error Message' + errorMessage)
            setConfirmObj("")
            dispatch(setRecaptcha(""))
            dispatch(onSetError(errorMessage))
        }
        console.log(number)
    }

    const reSendCode = async () => {
        await sendMessage(number, FirebaseAuth, recaptcha);


    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (codigoVerificacion === "" || codigoVerificacion === undefined) return
        console.log(codigoVerificacion)
        dispatch(setRecaptcha(""))
        verify(confirmObj, codigoVerificacion);

    }

  

    return (
        <div >
            <h3>Login</h3>

            <form onSubmit={onSubmitSMS} hidden={hiddenFormNumber}>


                <div className="form-group mb-2">
                    <PhoneInput
                        international
                        // defaultCountry="US"
                        placeholder="Ingresa tu numero"
                        value={number}
                        onChange={setNumber} />
                    {/* <input
                        type="text"
                        className="form-control"
                        placeholder="Numero"
                        name='numero'
                        value={numero}
                        onChange={onInputChange}
                    /> */}
                </div>

                <div className="d-grid gap-2">
                    {/* <input
                        type="submit"
                        className="btn btn-secondary"
                        name='btn-enviarSMS'
                        value='Enviar SMS'
                    /> */}
                    <button
                        type="submit"
                        className="btn btn-secondary"
                        name='btn-enviarSMS'
                        value='Enviar SMS'
                    >
                        Enviar SMS
                        &nbsp;
                        <span hidden={loadingSendMessage} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                </div>

            </form >

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

            </form>

            <div id='captcha'></div>
            {
                (errorMessage != null) ? <AlertError mensaje="error" errorMessage={errorMessage} /> : <></>
            }
        </div >

    )
}