import { async } from "@firebase/util";
import { useState } from "react";
import { SignAuthUserWithEmailAndPassword, createUserDocumentFromAuth,signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.style.scss'

const defaultFormFields = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}


const SignInForm = () =>{

    
    const signInWithGoogle = async()  =>{
        await signInWithGooglePopup();
        
        
    } 
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    const {email, password} = formFields;
    
    // console.log(formFields);
    const resetFormField = () =>{
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        try {
            const {user}  = await SignAuthUserWithEmailAndPassword(email, password);


            resetFormField();
        } catch (error) {
           
            switch(error.code){
                case  'auth/wrong-password':
                    alert('Wrong Password for Email');
                    break;
                case 'auth/user-not-found':
                    alert('No User Accosiated with this Email');
                    break;
                default : 
                    console.log(error.code);
            }
        }

    }

    const handleChange = (event) =>{

        const {name, value} = event.target;

        setFormFields({...formFields, [name] : value});
    }

    return(
        <div className="sign-up-container">
            <h2>Already Have an Account</h2>
            <span>Sign In With Email and Password</span>

            <form onSubmit={handleSubmit}>
                
                <FormInput label='Email' type="email" name="email" onChange={handleChange} value={email} required />
                
                <FormInput label='Password' type="password"   name="password" onChange={handleChange} value={password} required/>


                <div className="buttons-container">
                    <Button  type="submit">Sign In </Button>
                    <br />
                    <Button type="button" buttonType = 'google' onClick={signInWithGoogle}> Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;