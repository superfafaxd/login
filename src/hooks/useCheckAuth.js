import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { FirebaseAuth } from "../firebase/config";
import { login, logout, onUserVerifyEmail } from "../store/auth/authSlice";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //validacion para que cuando se envie el email no se ejecute
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL, number, emailVerified, providerData } = user;
            const provider = providerData[0].providerId
            console.log(provider)

            if (providerData[0].providerId != 'phone') {
                if (emailVerified) {
                    dispatch(login({ uid, email, displayName, photoURL, number, emailVerified, user, provider }));
                }
                else {
                    Swal.fire({
                        title: 'Verifica tu correo',
                        text: 'Para asegurarnos que seas el dueño de el correo te hemos enviado un correo de verificacion',
                        icon: 'question',
                        //showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        //cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(login({ uid, email, displayName, photoURL, number, emailVerified, user, provider }));
                        }
                    })
                }
            } else {
                // TODO: mostrar en homePage mensaje de email no verificado
                dispatch(login({ uid, email, displayName, photoURL, number, emailVerified, user, provider }));
            }
        })
    }, []);

    return status;





}
