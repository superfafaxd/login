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
    GoogleAuthProvider,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    sendEmailVerification
} from "firebase/auth";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FirebaseAuth } from "../../firebase/config"
import { getErrorMessage } from "../../helpers/getErrorMessage";
import {
    checkingCredentials,
    login,
    logout,
    onSetError,
    //onUserVerifyEmail
} from "../../store/auth/authSlice";


export const useAuthStore = () => {
    const dispatch = useDispatch();
    
    const googleProvider = new GoogleAuthProvider();
    const startSignInWithGoogle = async () => {
        try { 
            
            dispatch(checkingCredentials())
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            console.log(result)
            const { displayName, email, photoURL, uid } = result.user;
            console.log({ displayName, email, photoURL, uid })

        } catch (error) {
            dispatch(logout())
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
            dispatch(checkingCredentials())
            const confirmationResult = await confirmObj.confirm(codigoVerificacion);
            //dispatch(login(confirmationResult.user)) //no se hace el login directo por que de eso se encarga el useCheckAuth 
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
        // try {
        // dispatch(checkingCredentials())
        //dispatch(onUserVerifyEmail(true))
        createUserWithEmailAndPassword(FirebaseAuth, email, password)
            .then((userCredential) => {
                // const user = userCred ential.user;
                // SendEmailForVerify(email)
                //verifyEmail(displayname)
                // dispatch(onUserVerifyEmail(true))
                const { uid, photoURL, emailVerified } = userCredential.user;
                console.log(uid, photoURL, emailVerified)
                console.log(userCredential)
                // dispatch(onUserVerifyEmail(emailVerified))

                if (emailVerified === false) {
                    dispatch(checkingCredentials())
                    verificar();

                }


                //  await updateProfile(FirebaseAuth.currentUser, { displayname })
            })
            .catch((error) => {
                const errorCode = error.code
                console.log('Error Code: ' + errorCode);
                const errorMessage = error.message;
                console.log('Error Message: ' + errorMessage)
                onError(errorCode)
                console.log("Error al registrar usuario " + error)
            })

        // } catch (error) {
        //     const errorCode = error.code
        //     console.log('Error Code: ' + errorCode);
        //     const errorMessage = error.message;
        //     console.log('Error Message: ' + errorMessage)
        //     onError(errorCode)
        //     console.log("Error al registrar usuario " + error)
        // }
    }
    const verificar = () => {
        const usr = FirebaseAuth.currentUser
        sendEmailVerification(usr, actionCodeSettings).then(() => {
            console.log('se ha enviado un Correo al email para verificar que seas el dueño papas')

            Swal.fire({
                title: 'Verifica tu correo',
                text: 'Para asegurarnos que seas el dueño de el correo te hemos enviado un correo de verificacion',
                icon: 'question',
                //showCancelButton: true,
                confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) { ///----------------------------
                    //window.location.reload()
                    //   setTimeout(() => {
                    //    console.log('reloas')
                    // window.location.reload()
                    //   }, 30000);

                }
            })

        })
            .catch((error) => {
                const errorCode = error.code
                console.log('Error Code: ' + errorCode);
                const errorMessage = error.message;
                console.log('Error Message: ' + errorMessage)
                onError(errorCode)
                console.log("Error al registrar usuario " + error)
            })
    }
    const actionCodeSettings = {
        url: 'http://127.0.0.1:5173/',
        handleCodeInApp: true
    };
    const SendEmailForVerify = (email) => {
        // const usr = FirebaseAuth.currentUser
        sendSignInLinkToEmail(FirebaseAuth, email, actionCodeSettings)
            .then(() => {
                console.log('Email enviado')
                localStorage.setItem('emailForSignIn', email);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log('Error Code: ' + errorCode)
                const errorMessage = error.message;
                console.log('Error Message: ' + errorMessage)
                return
            });
    }

    const verifyEmail = (displayname) => {
        //const usr = FirebaseAuth.currentUser
        if (isSignInWithEmailLink(FirebaseAuth)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                console.log('Ingresa correo para confirmar')
            }
            signInWithEmailLink(FirebaseAuth, email)
                .then((result) => {
                    console.log(result)
                    dispatch(onUserVerifyEmail(true))
                    updateProfile(FirebaseAuth.currentUser, { displayname })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log('Error Code: ' + errorCode)
                    const errorMessage = error.message;
                    console.log('Error Message: ' + errorMessage)
                })

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
            dispatch(checkingCredentials())
            const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL, displayName, emailVerified } = resp.user;
            console.log({ uid, photoURL, displayName, emailVerified })
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

    const recoveryPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'Ingresa tu correo',
            input: 'email',
            inputLabel: '',
            inputPlaceholder: 'Ingresa tu correo!'
        })

        if (email) {
            Swal.fire(`Se ha enviado un link para recuperar la contraseña al correo ${email}`)
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
        recoveryPassword,
    }
}

