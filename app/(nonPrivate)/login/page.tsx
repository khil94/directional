"use client";

import { API } from "@/app/api/lib/clientAPI";
import { useUserStore } from "@/store/user/userStore";
import { LoginBody } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const reason = useSearchParams().get("from");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const { login, logout } = useUserStore();

  useEffect(() => {
    if (reason === "logout") {
      (async () => {
        await logout();
      })();
    }
  }, [reason]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    const body: LoginBody = {
      email,
      password,
    };
    try {
      const resp = await API.login(body);
      login(resp);
      router.push("/posts");
      router.refresh();
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          로그인
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block font-semibold text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 p-3 text-lg font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
