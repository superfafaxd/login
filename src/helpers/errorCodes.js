export const errorsCodes = [
    {
        errorCode: 'auth/invalid-phone-number',
        message: 'Invalid Number'
    },
     {
        errorCode: 'auth/invalid-verification-code',
        message: 'Codigo de verificacion Invalido'
    },
    {
        errorCode: 'auth/wrong-password',
        message: 'Email or password invalid'
    },
    {
        errorCode: 'auth/user-not-found',
        message: 'User Not Found'
    },
    {
        errorCode: 'auth/network-request-failed',
        message: 'Network failed'
    },
    {
        errorCode: 'auth/too-many-requests',
        message: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'
    },
    {
        errorCode: 'auth/email-already-in-use',
        message: 'The Email already in use'
    },
    {
        errorCode: 'auth/invalid-phone-number',
        message: 'Number to long'
    },
    ,
    {
        errorCode: 'auth/quota-exceeded',
        message: 'Exceeded quota'
    }
//Error Code: auth/missing-email
//Error Message: Firebase: Error (auth/missing-email).

//Error Code: auth/invalid-dynamic-link-domain
// Error Message: Firebase: Error (auth/invalid-dynamic-link-domain).

//Error Code: auth/invalid-continue-uri
//Error Message: Firebase: Missing domain in continue url (auth/invalid-continue-uri)

//Error Code: auth/unauthorized-continue-uri
// Error Message: Firebase: Domain not whitelisted by project (auth/unauthorized-continue-uri)

//Error Code: auth/argument-error
// Error Message: Firebase: Error (auth/argument-error).
]
/* 
auth/invalid-phone-number
Firebase: TOO_LONG (auth/invalid-phone-number).
*/

//auth/quota-exceeded
//Firebase: Exceeded quota. (auth/quota-exceeded).


/* 
   sendSignInLinkToEmail(FirebaseAuth, email, actionCodeSettings)
                    .then(() => {
                        console.log('Email enviado')
                        localStorage.setItem('emailForSignIn', email);

                        if (isSignInWithEmailLink(FirebaseAuth)) {
                            // let email = localStorage.getItem('emailForSignIn');
                            // if (!email) {
                            //     console.log('Ingresa correo para confirmar')
                            // }
                            signInWithEmailLink(FirebaseAuth, email)
                                .then((result) => {
                                    console.log('email verify?')
                                    console.log(result)
                                    dispatch(onUserVerifyEmail(false))
                                    updateProfile(FirebaseAuth.currentUser, { displayname })
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    console.log('Error Code: ' + errorCode)
                                    const errorMessage = error.message;
                                    console.log('Error Message: ' + errorMessage)
                                })

                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        console.log('Error Code: ' + errorCode)
                        const errorMessage = error.message;
                        console.log('Error Message: ' + errorMessage)
                        return
                    });

*/
