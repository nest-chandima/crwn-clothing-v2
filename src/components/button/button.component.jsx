import { BaseButton,InvertedButton, GoogleSignInButton } from "./button.style";

export const BUTTON_TYPE_CLASSES = {
    base : 'base',
    google : 'google-sign-in',
    inverted : 'inverted'
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>(
    {
        [BUTTON_TYPE_CLASSES.base] : BaseButton,
        [BUTTON_TYPE_CLASSES.inverted]  : InvertedButton,
        [BUTTON_TYPE_CLASSES.google] : GoogleSignInButton
    }[buttonType]
    );

const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return(
        <div>
            <CustomButton {...otherProps}>{children}</CustomButton>
        </div>
    );
}

export default Button;