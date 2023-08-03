'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const meta = {
  title: "Register",
};

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleSignIn = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-6 text-black">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="border border-gray-300 rounded px-3 py-2 w-full text-black"
              placeholder="Enter your name"
              onChange={handleSignIn}
              value={name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="border border-gray-300 rounded px-3 py-2 w-full text-black"
              placeholder="Enter your email"
              onChange={handleSignIn}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="border border-gray-300 rounded px-3 py-2 w-full text-black"
              placeholder="Enter your password"
              onChange={handleSignIn}
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Log in
            </button>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-700">
                Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
