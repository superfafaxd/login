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
    }

]

/* 
Error en la autentificacion FirebaseError:
 Firebase: Access to this account has been temporarily disabled due to many failed login attempts. 
 You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).
*/

    //auth/network-request-failed //se jue el net
    //(auth/wrong-password). pass mal


