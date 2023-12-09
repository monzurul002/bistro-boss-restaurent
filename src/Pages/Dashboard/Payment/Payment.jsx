import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckForm from "./CheckForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
const Payment = () => {
    const [cart] = useCart()

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))

    return (
        <div>
            <SectionTitle heading="Make Payment" subHeading="Please Provide">

            </SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckForm price={price} cart={cart} />
            </Elements>
        </div>
    );
};

export default Payment;