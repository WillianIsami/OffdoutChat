"use client"

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function SignUpPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password === confirmPassword) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        router.push("/");
      } else {
        // TODO: Handle errors
      }
    } else {
      console.log("Passwords don't matched");
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="px-5 py-10 border border-gray-400 flex flex-col gap-3 rounded" onSubmit={handleSubmit}>
        <h1 className="m-auto mb-5 text-2xl font-bold">Offdout Chat</h1>
        <input className="rounded border border-gray-300 p-1" type="text" name="username" placeholder="Username" required />
        <input className="rounded border border-gray-300 p-1" type="password" name="password" placeholder="Password" required />
        <input className="rounded border border-gray-300 p-1" type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <button className="bg-sky-400	rounded p-1 font-bold text-white" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
