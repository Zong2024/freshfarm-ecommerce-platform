"use client";

import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { CustomToast } from "@/components/common/CustomToast";
import { Form } from "@/components/ui/form";

import { clearLocalCart } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { usePostOrderMutation } from "@/lib/store/services/orderApi";

import {
  CheckoutFormValues,
  PostOrderRequest,
  checkoutSchema,
} from "@/types/checkout";

import { CheckoutCartAccordion } from "./_components/CheckoutCartAccordion";
import { CheckoutForm } from "./_components/CheckoutForm";
import { CheckoutPay } from "./_components/CheckoutPay";

export default function Checkout() {
  const { cartItems } = useCart();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      receiverName: "",
      tel: "",
      email: "",
      address: "",
      city: "",
      district: "",
      shippingMethod: "cold",
      zipCode: "",
    },
    mode: "onBlur",
  });
  const [postOrder, { isLoading }] = usePostOrderMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: CheckoutFormValues) => {
    const { receiverName, tel, email, address, city, district, zipCode } = data;
    const orderRequest: PostOrderRequest = {
      data: {
        user: {
          name: receiverName,
          tel,
          email,
          address: `${city}${district}${address}${zipCode || ""}`,
        },
        message: "",
      },
    };
    try {
      console.log(data);
      await postOrder(orderRequest).unwrap();
      CustomToast("success", "訂單已提交");
      dispatch(clearLocalCart());
      form.reset();
      router.push(`/checkout/payment?total=${finalTotal}`);
    } catch (error) {
      CustomToast("warning", "訂單發生問題 稍後再試");
    }
  };

  const shippingMethod = useWatch({
    control: form.control,
    name: "shippingMethod",
  });

  const itemsTotal =
    cartItems?.reduce((acc, item) => acc + (item.total || 0), 0) || 0;
  const shippingFee =
    shippingMethod === "pickup" ? 0 : itemsTotal >= 1000 ? 0 : 150;
  const finalTotal = itemsTotal + shippingFee;

  return (
    <div className="container mx-auto px-3 py-12">
      <CheckoutCartAccordion />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <CheckoutForm form={form} />
            </div>
            <div className="md:col-span-5">
              <CheckoutPay
                itemsTotal={itemsTotal}
                shippingFee={shippingFee}
                finalTotal={finalTotal}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
