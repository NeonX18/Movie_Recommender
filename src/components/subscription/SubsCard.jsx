import React from "react";
// import axios from "axios";
// import Razorpay from "razorpay";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SubsCard = ({ title, price, res }) => {
  const axiosPrivate = useAxiosPrivate();

  const checkouthandler = async () => {
    console.log(price);

    const {
      data: { Key },
    } = await axiosPrivate.get("/payment/getkey").then((res) => {
      console.log(res);
      if (res.status !== 200)
        alert("Something Went Wrong!!! Please Try again.");
      return res;
    });

    console.log(Key);

    const {
      data: {id}
    }= await axiosPrivate.post("/payment/create/order-id", {
        amount: price * 100,
        currency: "INR",
        receipt: "rcpt",
      });

    console.log(id);

    var options = {
      key: Key, // Enter the Key ID generated from the Dashboard
      amount: price * 100,
      currency: "INR",
      name: "KGPLAY",
      description: "KGPLAY",
      order_id: id,
      handler: (response) => {
        alert("PAYMENT ID - " + response.razorpay_payment_id);
        console.log("PAYMENT ID - " + response.razorpay_payment_id);
        alert("ORDER ID - " + response.razorpay_order_id);
        console.log("ORDER ID - " + response.razorpay_order_id);
        alert("SIGNATURE - " + response.razorpay_signature);
        console.log("SIGNATURE - " + response.razorpay_signature);

        axiosPrivate.post("/payment/verify", {
          amount: price * 100,
          PaymentID: response.razorpay_payment_id,
          OrderID: response.razorpay_order_id,
          Signature: response.razorpay_signature,
        });

        // }.then(function(response) {
        //   alert(JSON.stringify(response.data));
        // }).catch(function(error) {
        //   console.error(error);
        // })
      },
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: +919900000000,
      },
      // "config": {
      //   "display": {
      //     "blocks": {
      //       "utib": { // name for Axis block
      //         "name": "Pay using Axis Bank",
      //         "instruments": [
      //           {
      //             "method": "card",
      //             "issuers": ["UTIB"]
      //           },
      //           {
      //             "method": "netbanking",
      //             "banks": ["UTIB"]
      //           },
      //           {
      //             "method": "upi",
      //           }
      //         ]
      //       },
      //       "other": { // name for other block
      //         "name": "Other Payment modes",
      //         "instruments": [
      //           {
      //             "method": "card",
      //             "issuers": ["ICIC"]
      //           },
      //           {
      //             "method": "netbanking",
      //           },
      //           {
      //             "method": "upi", // Add UPI method here
      //           }
      //         ]
      //       }
      //     },
      theme: {
        color: "#D40205",
      },
      //   }
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment__id);
    });
    var payment__id = rzp1.open();
    console.log(payment__id);
    
  };

  return (
    <div className="flex flex-col justify-between text-primary-black p-8 transition-shadow duration-300 bg-white border-2 rounded shadow-sm sm:items-center hover:shadow-lg hover:cursor-pointer group">
      <div className="text-center">
        <div className="text-lg font-semibold group-hover:text-primary-red transition">
          {title}
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="mr-1 text-5xl font-bold group-hover:text-primary-red transition">
            {price}
          </div>
          <div>/ mo</div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="font-semibold">{res}</div>
        </div>
        <div className="w-full mt-8 px-2">
          <button
            className="bg-black text-white w-full py-3 px-5 rounded-lg group-hover:bg-primary-red duration-300"
            onClick={checkouthandler}
          >
            Buy {title}
          </button>
        </div>
        <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
          HD (720p), Full HD (1080p) availability subject to your internet
          service and device capabilities.
        </p>
      </div>
    </div>
  );
};

export default SubsCard;
