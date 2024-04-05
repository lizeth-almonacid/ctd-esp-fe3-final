"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Form, Alert, message } from "antd";
import { AuthModalProps } from "@/app/types/types";
import { signIn } from "next-auth/react";

const Login: React.FC<AuthModalProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }
   
    const response = await signIn('credentials',{ username, password, redirect: false, redirectTo: "/best-games"})
    console.log(response);
    
    // Si llegamos a este punto, el inicio de sesión fue exitoso
    if (response?.ok) {
      setLoginSuccess(true);
      onClose();
      // router.push("/");
    } else {
      message.error("Inicio de sesión fallido. Verifica tus credenciales.");
    }
  };

  return (
    <div className="card dark:bg-white bg-gray-100 ">
      <div className="card2 dark:bg-white bg-gray-100 ">
        <Form
          className="form dark:bg-gray-900 bg-gray-100"
          form={form}
          onFinish={handleLogin}
        >
          <p className="heading text-gray-900 dark:text-white">Login</p>
          <div className="field dark:bg-gray-900 ">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              autoComplete="off"
              required
            />
          </div>
          <div className="field dark:bg-gray-900">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn">
            <button
              className="button1 text-white sm:w-1/2 xl:w-1/3 md:w-1/3 dark:text-white"
              type="submit"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          </div>
          <button
            className="button3"
            onClick={() => (window.location.href = "password")}
          >
            Forgot Password
          </button>
        </Form>
        {error && <Alert message={error} type="error" className="mt-2" />}
        {loginSuccess && message.info("Inicio de sesión exitoso")}
      </div>
    </div>
  );
};

export default Login;
