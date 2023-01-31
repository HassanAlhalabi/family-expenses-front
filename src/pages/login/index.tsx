import Footer from "../../components/footer"
import LoginForm from "../../components/login"
import AuthContainer from "../../containers/auth"

const Login = () => {
  return (
    <AuthContainer>
     <LoginForm />
     <Footer />
    </AuthContainer>
  )
}

export default Login
