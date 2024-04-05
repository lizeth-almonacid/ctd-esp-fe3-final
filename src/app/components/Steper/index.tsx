import React from "react";
import { useFormik } from "formik";
// @ts-ignore
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { PaymentFormProps, PaymentFormValues } from "@/app/types/types";
import * as Yup from "yup";

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const initialValues: PaymentFormValues = {
    cardNumber: "",
    cardHolder: "Usuario",
    expirationDate: "12/24",
    cvc: "123",
  };
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, "Invalid card number")
      .required("Required"),
    cardHolder: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Invalid card holder name")
      .required("Required"),
    expirationDate: Yup.string()
      .matches(/^\d{2}\/\d{2}$/, "Invalid expiration date")
      .required("Required"),
    cvc: Yup.string()
      .matches(/^\d{3}$/, "Invalid CVC")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema, 
  });

  return (
    <div className="flex flex-col sm:flex-row md:flex-row w-full ">
      <div className="rounded-md w-full sm:w-full p-4 dark:bg-gray-900 mb-4 sm:mb-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 sm:w-full">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength={16}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                formik.handleChange({ target: { name: "cardNumber", value } });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber}
              placeholder="Card Number"
              className={`field input-field dark:bg-gray-900 m-2 rounded-2xl border-gray-300 ${
                formik.errors.cardNumber && formik.touched.cardNumber
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.cardNumber && formik.touched.cardNumber && (
              <div className="text-red-500">{formik.errors.cardNumber}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardHolder}
              placeholder="Card Holder"
              className={`field input-field dark:bg-gray-900 m-2 rounded-2xl border-gray-300 ${
                formik.errors.cardHolder && formik.touched.cardHolder
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.cardHolder && formik.touched.cardHolder && (
              <div className="text-red-500">{formik.errors.cardHolder}</div>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .replace(/^(\d{2})(\d{0,2})$/, "$1/$2") 
                  .replace(/(\d{2})\/(\d{2}).*/, "$1/$2");
                formik.handleChange({ target: { name: "expirationDate", value } });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.expirationDate}
              placeholder="Expiration Date (MM/YY)"
              className={`field input-field dark:bg-gray-900 m-2 rounded-2xl border-gray-300 ${
                formik.errors.expirationDate && formik.touched.expirationDate
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.errors.expirationDate && formik.touched.expirationDate && (
              <div className="text-red-500">{formik.errors.expirationDate}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              id="cvc"
              name="cvc"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                formik.handleChange({ target: { name: "cvc", value } });
              }}
              onBlur={formik.handleBlur}
              value={formik.values.cvc}
              placeholder="CVC"
              className={`field input-field dark:bg-gray-900 m-2 rounded-2xl border-gray-300 ${
                formik.errors.cvc && formik.touched.cvc ? "border-red-500" : ""
              }`}
            />
            {formik.errors.cvc && formik.touched.cvc && (
              <div className="text-red-500">{formik.errors.cvc}</div>
            )}
          </div>

          <div className="flex items-center justify-center m-2">
            <button
              className="button2 flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              <span className="mr-2">Submit</span>
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H3a1 1 0 110-2h10.586L9.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="w-[30%] sm:w-full md:ml-8 lg:ml-8 xl:ml-8 2xl:ml-8">
        <Cards
          cvc={formik.values.cvc}
          expiry={formik.values.expirationDate}
          focused={formik.errors.expirationDate}
          name={formik.values.cardHolder}
          number={formik.values.cardNumber}
        />
      </div>
    </div>
  );
};

export default PaymentForm;
