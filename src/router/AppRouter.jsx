import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginLayout } from "../auth/latout/LoginLayout";
import { AuthRoutes } from "../auth/pages/AuthRoutes";
import { AuthWithPhoneNumber } from "../auth/pages/AuthWithPhoneNumber";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { HomeRoutes } from "../Home/routes/HomeRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { CkeckingAuth } from "../ui/components/CkeckingAuth";


export const AppRouter = () => {
    //const status = 'not-authenticated';
    //const status = 'authenticated';
    const status = useCheckAuth();
    if(status === 'checking'){
        return  <CkeckingAuth />
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<AuthRoutes />} />
                            <Route path="/auth/register" element={ <LoginLayout> <RegisterPage /> </LoginLayout>} />
                            <Route path="/auth/register_with_number" element={<LoginLayout><AuthWithPhoneNumber /></LoginLayout>} />
                            <Route path="/*" element={<Navigate to='/auth/login' />} />

                        </>
                    )
                    :
                    (
                        <>
                            <Route path="/*" element={<HomeRoutes />} />
                            <Route path="/*" element={<Navigate to='/' />} />
                        </>

                    )
            }
        </Routes>
    )
}
