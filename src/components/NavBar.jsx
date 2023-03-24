import { useAuthStore } from "../hooks/store/useAuthStore";


export const NavBar = () => {
  const { startLogout } = useAuthStore();
  const onSubmit = () => {
    startLogout();
    console.log('Logout exitoso')
  }
  return (
    <div>
      <h3>NavBar</h3>
      <button onClick={onSubmit} >logout</button>
    </div>
  )
}
