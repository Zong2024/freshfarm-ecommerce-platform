import z from "zod";

export const checkoutSchema = z
  .object({
    shippingMethod: z.enum(["cold", "pickup"], {
      error: "請選擇配送方式",
    }),
    receiverName: z.string().trim().min(2, "姓名至少 2 個字"),
    phone: z
      .string()
      .trim()
      .regex(/^09\d{8}$/, "手機格式不正確"),
    email: z.string().trim().email("信箱格式不正確"),
    city: z.string().trim().min(1, "請選擇縣市"),
    district: z.string().trim().min(1, "請選擇區域"),
    address: z.string().trim().min(5, "請輸入詳細地址"),
    zipCode: z.string().trim().exactOptional(),
  })
  .readonly();

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
