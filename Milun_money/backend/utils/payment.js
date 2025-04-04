import RazorpayCheckout from "react-native-razorpay";

export const handlePayment = async () => {
    try {
        // 🔹 Fetch Payment Details from Backend
        const response = await fetch("http://YOUR_BACKEND_URL/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amount: 100,  // Amount in INR
                customerId: "user_123",
                customerPhone: "9876543210",
                customerEmail: "user@example.com"
            })
        });

        const data = await response.json();

        // 🔹 Configure Razorpay Payment
        const options = {
            description: "Payment for Expense",
            image: "https://your-logo-url.com",
            currency: "INR",
            key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
            amount: data.order_amount * 100, // Convert to paise
            name: "Your App Name",
            prefill: {
                email: data.customer_details.customer_email,
                contact: data.customer_details.customer_phone,
                name: "User Name"
            },
            theme: { color: "#F37254" }
        };

        // 🔹 Open Razorpay Payment
        RazorpayCheckout.open(options)
            .then(paymentData => {
                alert(`Success: Payment ID - ${paymentData.razorpay_payment_id}`);
                // ✅ Send payment success details to the backend
            })
            .catch(error => {
                alert(`Error: ${error.description}`);
            });

    } catch (error) {
        console.error("Payment Error:", error);
        alert("Something went wrong!");
    }
};
