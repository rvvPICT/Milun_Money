import { CFPaymentService } from 'cashfree-pg-react-native';

const ENV_MODE = 'TEST';  // Change to 'PROD' in live mode

export const initiateCashfreePayment = (paymentSessionId) => {
    const paymentService = CFPaymentService.getInstance();
    const paymentParams = {
        paymentSessionId: paymentSessionId,
        environment: ENV_MODE
    };

    paymentService.doPayment(paymentParams)
        .then(response => {
            console.log("Payment Success:", response);
        })
        .catch(error => {
            console.log("Payment Failed:", error);
        });
};
