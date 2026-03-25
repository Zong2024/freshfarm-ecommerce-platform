"use client";

import { UseFormReturn, useWatch } from "react-hook-form";

import {
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

import { taiwanRegions } from "@/lib/taiwan-regions";

import { CheckoutFormValues } from "@/types/checkout";

interface CheckoutFormProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export const CheckoutForm = ({ form }: CheckoutFormProps) => {
  const selectedCity = useWatch({
    control: form.control,
    name: "city",
  });

  const availableDistricts =
    taiwanRegions.find((r) => r.city === selectedCity)?.districts || [];

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-lg bg-gray-50 p-6">
        {/* 配送方式 */}
        <h4 className="text-primary-400 mb-4 text-2xl font-bold">配送方式</h4>
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
        <h4 className="text-primary-400 text-2xl font-bold">收件資訊</h4>

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
                  onValueChange={(val) => {
                    field.onChange(val);
                    form.setValue("district", "");
                    form.setValue("zipCode", "");
                  }}
                  onOpenChange={(open) => {
                    if (!open) {
                      field.onBlur();
                      form.trigger("city");
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="請選擇縣市" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taiwanRegions.map((region) => (
                      <SelectItem key={region.city} value={region.city}>
                        {region.city}
                      </SelectItem>
                    ))}
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
                  onValueChange={(val) => {
                    field.onChange(val);
                    const zip =
                      availableDistricts.find((d) => d.name === val)?.zip || "";
                    form.setValue("zipCode", zip);
                  }}
                  onOpenChange={(open) => {
                    if (!open) {
                      field.onBlur();
                      form.trigger("district");
                    }
                  }}
                  value={field.value}
                  disabled={!selectedCity}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="請選擇區域" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district.name} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
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
    </div>
  );
};
