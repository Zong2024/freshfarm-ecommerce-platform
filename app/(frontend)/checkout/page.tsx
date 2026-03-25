"use client";

import { useCart } from "@/hooks/useCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { CheckoutFormValues, checkoutSchema } from "@/types/checkout";

import { CheckoutCartAccordion } from "./components/CheckoutCartAccordion";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutPay } from "./components/CheckoutPay";

export default function Checkout() {
  const { cartItems } = useCart();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      receiverName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      district: "",
      shippingMethod: "cold",
      zipCode: "",
    },
    mode: "onBlur",
  });
  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
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
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
