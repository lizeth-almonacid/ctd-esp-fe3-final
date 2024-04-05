"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Inputs/InputField";
import { Alert } from "antd";
import { AuthModalProps, NewUserProps } from "@/app/types/types";
import { message } from "antd";
import RandomAvatar from "../Avatars";
import { getProviders, signIn } from "next-auth/react";

const RegistrationForm: React.FC<AuthModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [providers, setProviders] = useState(null);

  // useEffect(() => {
  //   // Obtener los proveedores disponibles
  //   getProviders().then((providers) => {
  //     setProviders(providers);
  //   });
  // }, []);

  const handleNext = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (step === 1) {
        if (!name || !lastname || !username || !email) {
          setError("Por favor complete todos los campos.");
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden.");
          return;
        }
        const values = { name, username, password, email, birthday, lastname };
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_USER_URL}/user/save`;
          const data = {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          };
          const res = await fetch(apiUrl, data).then((resp) => resp.json());
          console.log(res, "registro ok");
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
        const response = await signIn('credentials',{ username, password, redirect: false, redirectTo: "/best-games"})
        console.log(response);
        
        if (response?.ok) {
          setIsRegistered(true);
          onClose();
        }
      }
    } catch (error) {
      //@ts-expect-error
      console.error("Error en la solicitud:", error.message);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="card dark:bg-white bg-gray-100">
      <div className="card2 bg-white p-8 rounded text-center w-100 h-100 dark:bg-gray-900">
        <h1 className="heading text-gray-900 dark:text-white">Register</h1>
        {isRegistered ? (
          <>
            <RandomAvatar />
            <p className="text-green-600 mt-4 mb-4 dark:text-primary">
              ¡Successful registration!
            </p>
          </>
        ) : (
          <form className="grid grid-cols-2 gap-4">
            {step === 1 && (
              <>
                <InputField
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />

                <InputField
                  label="Lastname"
                  type="text"
                  value={lastname}
                  onChange={(e: any) => setLastName(e.target.value)}
                  placeholder="Your lastname"
                  required
                />

                <InputField
                  label="User's Name"
                  type="text"
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                  placeholder="Your User's Name"
                  required
                />
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <InputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />

                <InputField
                  label="Password confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />

                <InputField
                  label="Birthday"
                  type="date"
                  value={birthday}
                  onChange={(e: any) => setBirthday(e.target.value)}
                  placeholder="Your birthday"
                  required
                />
              </>
            )}

            <div className="col-span-2 space-x-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="button1 bg-green-600 hover:bg-green-500 dark:text-white dark:bg-primary dark:hover:bg-green-700 dark:text-black w-1/3 py-3 rounded-md transition-colors duration-300 focus:outline-none focus:ring focus:ring-primary-500"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                //@ts-ignore
                onClick={handleNext}
                className="button1 text-white w-1/3 dark:text-white"
              >
                {step === 1 ? "Next" : "Finish"}
              </button>
            </div>
          </form>
        )}
        {error && (
          <Alert type="success" className="text-red-500 mt-2" message={error} />
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
