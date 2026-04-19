import { supabase } from "./client";

import { LoginResponse } from "@freshfarm/types";

/**
 * Supabase 認證服務
 *
 * 提供基於 Supabase 的認證功能，與現有的 HexSchool 認證並存。
 * 透過 NEXT_PUBLIC_USE_NEST_API 環境變數切換使用哪種認證方式。
 */

export interface SupabaseSignUpParams {
  email: string;
  password: string;
  name?: string;
}

export interface SupabaseSignInParams {
  email: string;
  password: string;
}

/**
 * 使用 Supabase 註冊新帳號
 */
export async function signUpWithSupabase({
  email,
  password,
  name,
}: SupabaseSignUpParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name || email.split("@")[0],
      },
    },
  });

  if (error) {
    throw new Error(`註冊失敗：${error.message}`);
  }

  return data;
}

/**
 * 使用 Supabase 登入
 * 回傳格式與 HexSchool LoginResponse 相容，方便無縫切換
 */
export async function signInWithSupabase({
  email,
  password,
}: SupabaseSignInParams): Promise<LoginResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`登入失敗：${error.message}`);
  }

  const { user, session } = data;

  return {
    uid: user.id,
    token: session.access_token,
    expired: session.expires_at ?? Math.floor(Date.now() / 1000 + 3600),
    message: "登入成功",
    status: true,
  };
}

/**
 * 使用 Supabase 登出
 */
export async function signOutWithSupabase() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("[Supabase] 登出失敗:", error.message);
  }
}

/**
 * 取得目前的 Supabase session
 */
export async function getSupabaseSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

/**
 * 監聽 Supabase 認證狀態變化
 */
export function onSupabaseAuthStateChange(
  callback: (event: string, session: unknown) => void
) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}