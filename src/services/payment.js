import axios from "axios";

const flutterwaveUrl = "https://api.flutterwave.com/v3";

const composeRavePayload = (data) => {
    return {
        amount: data.amount,
        tx_ref: data.reference,
        redirect_url: data.callback_url || "#",
        customer: { email: data.email },
        currency: "NGN"
    };
};

export const generatePaymentCheckoutLink = async (data, secretKey) => {
    try {
        const payload = composeRavePayload(data);
        const url = `${flutterwaveUrl}/payments`;
        const response = await axios.post(url, payload, { headers: { Authorization: `Bearer ${secretKey}` } });
        return response.data.data.link;
    } catch (error) {
        throw new Error("Oops, something went wrong. Please try again later");
    }
};

export const verifyTransaction = async (reference, secretKey) => {
    try {
        const url = `${flutterwaveUrl}/transactions/${reference}/verify`;
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${secretKey}` } });
        return response.data;
    } catch (error) {
        throw new Error("Oops, something went wrong. Please try again later");
    }
};
