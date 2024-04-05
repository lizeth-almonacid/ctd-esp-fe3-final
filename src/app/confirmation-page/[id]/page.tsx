"use client";
import { Alert, Button, Layout } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FooterLayout from "../../components/Footer";
import { ThemeProvider } from "next-themes";
import HeaderLayout from "../../components/Header";
import { getTransactionById } from "../../servers/requestProducts";
import { usePathname } from "next/navigation";

export default function ConfirmationPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [code, setCode] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, router]);

  const pathname = usePathname();
  const transactionId = pathname.split("/").at(2);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionById(transactionId);
        setCode(response.data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };
    fetchData();
  }, [transactionId]);
  
console.log(code);

  const handleReturnHome = () => {
    router.push("/");
  };

  // function generateRandomCode(length: number): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let randomCode = '';
  
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     randomCode += characters.charAt(randomIndex);
  //   }
  
  //   return randomCode;
  // }
  
  // const randomCode = generateRandomCode(8);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md p-8 rounded-md shadow-md bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center mb-4">Confirmation Payment</h1>
            <p className="text-md text-center mb-6 text-2xl">
              Your purchase was successful. The game is now yours.
              Redeem it on the platform using the following
              {/* @ts-ignore */}
              code: <span className="font-bold">{code?.code}</span>. Enjoy your product!
            </p>
            {successMessage && (
              <div className="mb-4">
                <Alert
                  message="Success"
                  description={successMessage}
                  type="success"
                  showIcon
                />
              </div>
            )}
            <Button
              type="primary"
              className="w-full button2 hover:bg-green-600"
              onClick={handleReturnHome}
            >
              Back to Home
            </Button>
          </div>
        </div>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
