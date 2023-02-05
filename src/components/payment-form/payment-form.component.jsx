import { async } from "@firebase/util";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SelectCurruntUser } from "../../store/user/user.selector";
import {selectCartTotal} from "../../store/cart/cart.select";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFromContainer, FormContainer,PaymetButton } from "./payment-form.styles";

const PaymentForm = () =>{

    const stripe = useStripe();
    const elements = useElements();
    const curruntUser = useSelector(SelectCurruntUser);
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    const paymentHandler = async(e) => {
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({amount: (amount*100)})
        }).then((res) => res.json());


        const {paymentIntent: {client_secret}} = response;


        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method : {
                card : elements.getElement(CardElement),
                billing_details : {
                    name : curruntUser ? curruntUser.displayName : "Guest",
                    email : curruntUser ? curruntUser.email : "Guest Emaill Null"
                },
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error)
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert("Payment Success!"); 
            }
        }


    }
    return(

        <PaymentFromContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Creadit Card Payment </h2>
                <CardElement/>
                <PaymetButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}> Pay Now </PaymetButton>
            </FormContainer>
        </PaymentFromContainer>
    )
}

export default PaymentForm;