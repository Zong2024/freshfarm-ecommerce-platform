"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AddToCartFullButton } from "@/components/button/AddToCartFullButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CheckoutFormValues, checkoutSchema } from "@/types/checkout";

export default function Checkout() {
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
  return (
    <div className="container mx-auto px-3 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <section className="rounded-lg bg-gray-50 p-6">
                {/* 配送方式 */}
                <h4 className="text-primary-400 mb-4 text-2xl font-bold">
                  配送方式
                </h4>
                <FormField
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className=""
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cold" id="cold" />
                        <label htmlFor="cold">
                          低溫宅配 (運費NT$150，消費滿NT$1,000免運費)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <label htmlFor="pickup">到店取貨</label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </section>
              {/* 收件資訊 */}
              <section className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6">
                <h4 className="text-primary-400 text-2xl font-bold">
                  收件資訊
                </h4>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* 收件人姓名 */}
                  <FormField
                    control={form.control}
                    name="receiverName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>收件人姓名</FormLabel>
                        <FormControl>
                          <Input placeholder="王Ｏ明" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* 手機號碼 */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>手機號碼</FormLabel>
                        <FormControl>
                          <Input placeholder="0912345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 信箱 */}
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>電子郵件</FormLabel>
                        <FormControl>
                          <Input placeholder="aaa@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 地址 */}
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="請選擇縣市" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="taipei">台北</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="請選擇區域" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="大安區">大安區</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="詳細地址" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* 郵遞區號 */}
                <div>
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>郵遞區號</FormLabel>
                        <FormControl>
                          <Input placeholder="106" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            </form>
          </Form>
        </div>
        <div className="md:col-span-5">
          <section className="flex flex-col gap-4 rounded-lg bg-gray-50 p-6">
            <h4 className="text-primary-400 text-2xl font-bold">付款金額</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>商品金額</p>
                <p className="font-bold">NT$ 2,058</p>
              </div>
              <div className="flex justify-between">
                <p>運費</p>
                <p className="font-bold">NT$ 100</p>
              </div>
            </div>

            <div className="border-t border-gray-300" />

            <div className="flex items-center justify-between">
              <p>總金額</p>
              <p className="text-secondary-300 text-3xl font-bold">NT$ 2,008</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
