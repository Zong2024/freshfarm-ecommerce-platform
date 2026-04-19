import { redirect } from "next/navigation";

export default function UserPage() {
  // 當使用者進入 /user 時，自動跳轉至 /user/profile
  redirect("/user/profile");
}
