import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

function CheckoutForm() {
    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 5000; 

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
                amount: totalPrice * 100, 
                currency: "inr"
            });

            const paymentMethod = {
                payment_method: { card: elements.getElement(CardElement) }
            };

            const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, paymentMethod);

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                setSuccess("✅ Payment Successful!");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
                <h2 className="text-3xl font-bold text-black text-center mb-6">💳 Secure Payment</h2>
                <p className="text-center text-lg text-gray-700 font-semibold mb-4">
                    Total Amount: ₹{totalPrice*100}
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4 border border-gray-500 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <CardElement className="p-2 text-gray-800" />
                    </div>
                    <button 
                        type="submit" 
                        disabled={!stripe || loading}
                        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> 
                            : `Pay ₹ ${totalPrice * 100}`
                        }
                    </button>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-400 text-sm text-center">{success}</p>}
                </form>
            </div>
        </div>
    );
}

function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default Stripe;
