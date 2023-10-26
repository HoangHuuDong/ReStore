import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/BasketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51O52aDFzLAOrDVzX8XFVwJoaN8mfLQ1kNRXN9TWbiv0OGjiYvPj5WRFk3fEdvRUDyxnf5PmPsrKWDkg9gOoTKuSM00gnKVirrh')

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [dispatch])

    if (loading) return <LoadingComponent message="Loading checkout...." />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}