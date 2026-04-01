import { useAppSelector } from "@/lib/redux/hooks";
import { backendUrl } from "@/public/assets";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RazorPayButton() {
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.auth.userdata);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-order`,
        {
          TotalPrice: 5,
        },
        { withCredentials: true },
      );
      console.log(data);
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: "INR",
        name: "Padma'Z",
        description: "Test Transaction",
        order_id: data.id,
        callback_url: `${backendUrl}/api/payment/verify`,
        prefill: {
          name: user.name,
          email: email,
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorPayPaymentDialogue = new Razorpay(options);
      razorPayPaymentDialogue.open();
      console.log(razorPayPaymentDialogue);
      if (res.status == 201) {
        setIsLoading(false);
        toast.success("Credits added successfully");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <button
        onClick={() =>
          alert("Payment feature doesn't work because of razorpay keys ")
        }
        className="cursor-pointer bg-cyan-300 p-2.5 rounded-lg"
        // onClick={handlePayment}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Buy Now"}
      </button>
    </>
  );
}
