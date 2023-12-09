import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import "./CheckForm.css"
const CheckForm = ({ price, cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("")
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState(" ")
    useEffect(() => {
        if (price > 0) {
            axios.post("http://localhost:5000/create-payment-intent", { price }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error);
        } else {
            setCardError(" ")
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous"
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError)
        }

        setProcessing(false)

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            //save to databse
            const payment = {
                email: user?.email, transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                status: "service pending",
                menuItems: cart.map(item => item.menuItemId),
                cartItems: cart.map(item => item._id),
                itemNames: cart.map(item => item.name)
            }
            axios.post("http://localhost:5000/payments", payment, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })

        }

    };

    return (
        <div className="w-2/3 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary my-10 btn-sm" type="submit" disabled={!stripe || !clientSecret || !processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError?.message}</p>
            {
                transactionId && <p className="text-success font-bold">Successfull Payment.</p>
            }
        </div>
    );
};

export default CheckForm;