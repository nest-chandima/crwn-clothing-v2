import { useState } from "react";
import { CreateAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { SignupContainer, H2Title } from "./sign-up-form.style";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const dispatch = useDispatch();

    const { displayName, email, password, confirmPassword } = formFields;


    // console.log(formFields);
    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password is Not Match');
            return;
        }

        try {
            dispatch(signUpStart(email,password,displayName));
            resetFormField();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert("Email Already in Use!!!")
            } else {
                console.log("User Creation Encounted an Error");
            }

        }

    }

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value });
    }

    return ( 
        <SignupContainer>
            <H2Title > Don 't Have an Account</H2Title> 
            <span> Sign Up With Email and Password </span>

            <form onSubmit = { handleSubmit }>

                <FormInput label = 'Display Name'
                type = "text"
                name = "displayName"
                onChange = { handleChange }
                value = { displayName }
                required />

                <FormInput label = 'Email'
                type = "email"
                name = "email"
                onChange = { handleChange }
                value = { email }
                required />

                <FormInput label = 'Password'
                type = "password"
                name = "password"
                onChange = { handleChange }
                value = { password }
                required />


                <FormInput label = 'Confirm Password'
                type = "password"
                name = "confirmPassword"
                onChange = { handleChange }
                value = { confirmPassword }
                required / >

                <Button type = "submit" > Sign UP </Button> 
            </form> 
        </SignupContainer>
    )
}

export default SignUpForm;