// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// import { getToken } from "../utils/auth";
// import { WebView } from "react-native-webview";
// import { Platform } from 'react-native';

// const RPayTestingScreen = ({ route }) => {
//   const { recipientId } = route.params;
//   const [amount, setAmount] = useState("");
//   const [paymentUrl, setPaymentUrl] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Use platform-specific API URL
//   const API_URL = Platform.OS === 'ios' 
//     ? 'http://localhost:5001' 
//     : 'http://10.0.2.2:5001';

//   // Check authentication on component mount
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = await getToken();
//         if (token) {
//           setIsAuthenticated(true);
//           console.log("User is authenticated with token");
//         } else {
//           console.log("No token found, user not authenticated");
//           Alert.alert("Authentication", "Please login first");
//         }
//       } catch (error) {
//         console.error("Auth check error:", error);
//       }
//     };
    
//     checkAuth();
//   }, []);

//   const handlePayment = async () => {
//     if (!amount || isNaN(parseFloat(amount))) {
//       return Alert.alert("Error", "Please enter a valid amount");
//     }
    
//     try {
//       const token = await getToken();
      
//       if (!token) {
//         console.log("Payment attempted without authentication");
//         return Alert.alert("Authentication Error", "Please login to continue");
//       }
      
//       // Log the request details (without showing the full token)
//       console.log("Payment request:", {
//         recipientId,
//         amount: parseFloat(amount),
//         hasToken: !!token
//       });
      
//       // Make the payment request
//       const response = await fetch(`${API_URL}/api/payments/pay`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           recipientId,
//           amount: parseFloat(amount)
//         }),
//       });

//       const data = await response.json();
//       console.log("Payment response:", data);
      
//       if (!data.success) {
//         return Alert.alert("Payment Error", data.error || "Payment failed");
//       }

//       // Navigate to Razorpay checkout if successful
//       setPaymentUrl(`https://api.razorpay.com/v1/checkout/embedded?order_id=${data.orderId}`);
//     } catch (error) {
//       console.error("Payment process error:", error);
//       Alert.alert("Error", "Something went wrong with the payment");
//     }
//   };

//   // Handle WebView navigation events (optional)
//   const handleWebViewNavigationStateChange = (newNavState) => {
//     // You can handle navigation state changes here
//     console.log("WebView navigating to:", newNavState.url);
    
//     // If the URL contains success or failure indicators, you can handle it
//     if (newNavState.url.includes('payment_success')) {
//       Alert.alert("Success", "Payment completed successfully!");
//       setPaymentUrl(null); // Return to payment form
//     } else if (newNavState.url.includes('payment_failure')) {
//       Alert.alert("Failed", "Payment was not completed");
//       setPaymentUrl(null); // Return to payment form
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {paymentUrl ? (
//         <WebView 
//           source={{ uri: paymentUrl }}
//           onNavigationStateChange={handleWebViewNavigationStateChange}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={true}
//           style={styles.webview}
//         />
//       ) : (
//         <>
//           <Text style={styles.title}>Enter Amount (INR):</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             value={amount}
//             onChangeText={setAmount}
//             placeholder="0.00"
//           />
//           <Button 
//             title="Pay Now" 
//             onPress={handlePayment}
//             disabled={!isAuthenticated} 
//           />
//           {!isAuthenticated && (
//             <Text style={styles.errorText}>
//               You need to login first to make payments
//             </Text>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff'
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: '500'
//   },
//   input: {
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//     borderRadius: 5
//   },
//   webview: {
//     flex: 1,
//     marginTop: -20 // Remove WebView margins
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 10,
//     textAlign: 'center'
//   }
// });

// export default RPayTestingScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from "react-native";
import { getToken } from "../utils/auth";
import { WebView } from "react-native-webview";
import { Platform } from 'react-native';

const RPayTestingScreen = ({ route, navigation }) => {
  const { recipientId, userId } = route.params;
  const [amount, setAmount] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failure', or null

  // Use platform-specific API URL
  const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001' 
    : 'http://10.0.2.2:5001';

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          setIsAuthenticated(true);
          console.log("User is authenticated with token");
        } else {
          console.log("No token found, user not authenticated");
          Alert.alert("Authentication", "Please login first");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };
    
    checkAuth();
  }, []);

  const handlePayment = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      return Alert.alert("Error", "Please enter a valid amount");
    }
    
    try {
      const token = await getToken();
      
      if (!token) {
        console.log("Payment attempted without authentication");
        return Alert.alert("Authentication Error", "Please login to continue");
      }
      
      // Log the request details (without showing the full token)
      console.log("Payment request:", {
        recipientId,
        amount: parseFloat(amount),
        hasToken: !!token
      });
      
      // Make the payment request
      const response = await fetch(`${API_URL}/api/payments/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId,
          amount: parseFloat(amount)
        }),
      });

      const data = await response.json();
			console.log("Payment API Response:", data);

			if (!data.success) {
				return Alert.alert("Payment Error", data.error || "Payment failed");
			}

			// Verify the order ID is present
			if (!data.orderId) {
				console.error("Order ID is missing in response!");
				return;
			}

			setPaymentUrl(`https://api.razorpay.com/v1/checkout/embedded?order_id=${data.orderId}`);

    } catch (error) {
      console.error("Payment process error:", error);
      Alert.alert("Error", "Something went wrong with the payment");
    }
  };

  // Handle WebView navigation events
//   const handleWebViewNavigationStateChange = (newNavState) => {
//     // You can handle navigation state changes here
//     console.log("WebView navigating to:", newNavState.url);
    
//     // If the URL contains success or failure indicators, handle it
//     if (newNavState.url.includes('payment_success')) {
//       // Set payment status to success instead of showing Alert
//       setPaymentStatus('success');
//       setPaymentUrl(null);
//     } else if (newNavState.url.includes('payment_failure')) {
//       setPaymentStatus('failure');
//       setPaymentUrl(null);
//     }
//   };
	const handleWebViewNavigationStateChange = (newNavState) => {
		console.log("WebView navigating to:", newNavState.url);

		if (newNavState.url.includes('payment_success')) {
			console.log("Payment successful detected in WebView");
			setPaymentStatus('success');
		} else if (newNavState.url.includes('payment_failure')) {
			console.log("Payment failure detected in WebView");
			setPaymentStatus('failure');
		}
	};

	useEffect(() => {
		if (paymentStatus === 'success') {
			console.log("Navigating to PaymentSuccessScreen");
			navigation.replace('PaymentSuccessScreen', { amount }); // Use replace to avoid going back to the WebView
		} else if (paymentStatus === 'failure') {
			console.log("Navigating to PaymentFailureScreen");
			navigation.replace('PaymentFailureScreen');
		}
	}, [paymentStatus, navigation, amount]);
	
	

  // Render payment success screen
  const renderPaymentSuccessScreen = () => {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successDetails}>
          Amount: ₹{parseFloat(amount).toFixed(2)}
        </Text>
        <Text style={styles.successDetails}>
          Transaction ID: {Math.random().toString(36).substr(2, 10).toUpperCase()}
        </Text>
        <Text style={styles.successTime}>
          {new Date().toLocaleString()}
        </Text>
        <Button 
          title="Back to Home" 
          onPress={() => {
            setPaymentStatus(null);
            // Option to navigate back or to home
            // navigation.navigate('Home');
          }} 
        />
      </View>
    );
  };

  // Render payment failure screen
  const renderPaymentFailureScreen = () => {
    return (
      <View style={styles.failureContainer}>
        <View style={styles.failureCircle}>
          <Text style={styles.xmark}>✕</Text>
        </View>
        <Text style={styles.failureTitle}>Payment Failed</Text>
        <Text style={styles.failureDetails}>
          Something went wrong with your payment.
        </Text>
        <Button 
          title="Try Again" 
          onPress={() => setPaymentStatus(null)} 
        />
      </View>
    );
  };

  // Render the appropriate screen based on payment status
  if (paymentStatus === 'success') {
    return renderPaymentSuccessScreen();
  } else if (paymentStatus === 'failure') {
    return renderPaymentFailureScreen();
  }

  return (
    <View style={styles.container}>
      {/* {paymentUrl ? (
        <WebView 
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={styles.webview}
        />
      ) : ( */}
			{paymentUrl && console.log("Opening WebView with URL:", paymentUrl)}
			<WebView 
				source={{ uri: paymentUrl }}
				onNavigationStateChange={handleWebViewNavigationStateChange}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				startInLoadingState={true}
				style={styles.webview}
			/>

        <>
          <Text style={styles.title}>Enter Amount (INR):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
          />
          <Button 
            title="Pay Now" 
            onPress={handlePayment}
						// onPress={() => {navigation.navigate('PaymentSuccessScreen', { amount, userId })}}
            disabled={!isAuthenticated} 
          />
          {!isAuthenticated && (
            <Text style={styles.errorText}>
              You need to login first to make payments
            </Text>
          )}
        </>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500'
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5
  },
  webview: {
    flex: 1,
    marginTop: -20 // Remove WebView margins
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  },
  // Success screen styles
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4BB543',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  checkmark: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4BB543'
  },
  successDetails: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555'
  },
  successTime: {
    fontSize: 14,
    marginBottom: 30,
    color: '#888'
  },
  // Failure screen styles
  failureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  failureCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF3333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  xmark: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  failureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF3333'
  },
  failureDetails: {
    fontSize: 16,
    marginBottom: 30,
    color: '#555'
  }
});

export default RPayTestingScreen;