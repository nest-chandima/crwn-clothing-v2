import SignUpForm from "../../components/sign-up-form/sign-up-form.componenet";
import SignInForm from "../../components/sign-in-form/sign-in-form.componenet";
import { AuthenticationContainer } from "./authentication.style";

const Athentication = () =>{
     

    return(
        <AuthenticationContainer>
            
            <SignInForm/>
            <SignUpForm/>


        </AuthenticationContainer>
    )
}
export default Athentication;