import SignUpForm from "../../components/sign-up-form/sign-up-form.componenet";
import SignInForm from "../../components/sign-in-form/sign-in-form.componenet";
import './authentication.style.scss'

const Athentication = () =>{
     

    return(
        <div className="authentication-container">
            
            <SignInForm/>
            <SignUpForm/>


        </div>
    )
}
export default Athentication;