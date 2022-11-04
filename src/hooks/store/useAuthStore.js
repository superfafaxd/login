import { async } from "@firebase/util";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    PhoneAuthProvider,
    signInWithCredential,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { FirebaseAuth } from "../../firebase/config"
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { checkingCredentials, login, logout, onSetError } from "../../store/auth/authSlice";


export const useAuthStore = () => {
    const dispatch = useDispatch();
    const googleProvider = new GoogleAuthProvider();

    const startSignInWithGoogle = async () => {
        try {
            dispatch(checkingCredentials())
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            const { displayName, email, photoURL, uid } = result.user;
            console.log({ displayName, email, photoURL, uid })
            console.log(result)
        } catch (error) {
            console.log('Error al Ingresar con Google');
            const errorCode = error.code
            console.log('Error Code ' + errorCode);
            const errorMessage = error.message;
            console.log(errorMessage)
            console.log(error)
        }
    }

    const setUpRecaptcha = (/* number */) => {
        FirebaseAuth.languageCode = 'es-MX';
        const recaptchaVerifier = new RecaptchaVerifier(
            'captcha',
            { 'size': 'invisible' },
            FirebaseAuth
        );

        //recaptchaVerifier.render();
        //recaptchaVerifier.clear()
        return recaptchaVerifier
    }


    const sendMessage = async (number, FirebaseAuth, recaptchaVerifier) => {
        return await signInWithPhoneNumber(FirebaseAuth, number, recaptchaVerifier);
    }

    const verify = async (confirmObj, codigoVerificacion) => {
        try {
            //  let credential  = await PhoneAuthProvider.credential(confirmObj, codigoVerificacion); 
            //  signInWithCredential(credential);
            // console.log(credential)
            const confirmationResult = await confirmObj.confirm(codigoVerificacion);
            dispatch(login(confirmationResult.user))
            console.log(confirmationResult)
            console.log(confirmationResult.user)
            console.log('feli por que se funciono');
        } catch (error) {
            console.log(error)
            const errorCode = error.code
            console.log('Error Code ' + errorCode);
            const errorMessage = error.message;
            console.log(errorMessage)
            dispatch(onSetError(errorMessage))
        }
    }


    const startRegisterWithEmailPassword = async ({ email, password, displayname }) => {
        try {
            //dispatch(checkingCredentials())
            const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL } = resp.user;
            console.log(uid, photoURL)
            console.log(resp)
            await updateProfile(FirebaseAuth.currentUser, { displayname })
        } catch (error) {
            const errorCode = error.code
            console.log('Error Code: ' + errorCode);
            const errorMessage = error.message;
            console.log('Error Message: ' + errorMessage)
            onError(errorCode)
            console.log("Error al registrar usuario " + error)
        }
    }

    const onError = (errorCode) => {
        const xd = getErrorMessage(errorCode)
        // console.log(xd[0].message )
        if (!xd) {
            dispatch(onSetError(errorCode))
        } else {
            dispatch(onSetError(xd[0].message))
        }
    }

    const startLoginWithEmailPassword = async ({ email, password }) => {
        try {
            //dispatch(checkingCredentials())
            const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL, displayName } = resp.user;
            console.log({ uid, photoURL, displayName })
        } catch (error) {
            //const errorMessage = error.message;
            // console.log(errorMessage)
            const errorCode = error.code;
            console.log('Error Code: ' + errorCode)
            const xd = getErrorMessage(errorCode)
            // console.log(xd[0].message )
            if (!xd) {
                dispatch(onSetError(errorCode))
            } else {
                dispatch(onSetError(xd[0].message))
            }
            console.log('Error en la autentificacion ' + error)

        }
    }

    const startLogout = async () => {
        try {
            dispatch(checkingCredentials())
            await FirebaseAuth.signOut();
            dispatch(logout({}));
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return {
        //signInWithPhoneNumber,
        setUpRecaptcha,
        verify,
        startLogout,
        startRegisterWithEmailPassword,
        startLoginWithEmailPassword,
        startSignInWithGoogle,
        sendMessage,
        onError,
    }
}

