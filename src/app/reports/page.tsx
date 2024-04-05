"use client";
import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ThemeProvider } from "next-themes";
import { DatePicker, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import FooterLayout from "../components/Footer";
import { FormValues, ReportData } from "../types/types";
import { descargarCSV, generarPDF } from "../utils/reportsFunctions";
import HeaderLayout from "../components/Header";
import usePlatformAndCategories from "../hooks/usePlatformAndCategories";
import useUser from "../hooks/useUser";
import {
  getReportForRating,
  getTopSoldProducts,
  getTransactionAll,
} from "../servers/requestProducts";
const Reportes: React.FC = () => {
  const [reportResult, setReportResult] = useState<ReportData[] | null>(null);
  const { plataformas, categorias } = usePlatformAndCategories();
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      dateRange: [null, null],
      month: "",
      category: "",
      bestSellers: false,
      topRated: false,
      fileFormat: "pdf",
      platform: "",
    } as FormValues,
    validationSchema: Yup.object({
      dateRange: Yup.array()
        .test(
          "dateRange",
          "Both start and end dates are required",
          (value: any) => value[0] && value[1]
        )
        .required("Select date range"),
      category: Yup.string().required("Select category"),
    }),

    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        const dateRange = values.dateRange;

        if (values.topRated) {
          const reportResultTopRated = await getReportForRating(
            dateRange[0],
            dateRange[1],
            values.category,
            values.platform
          );

          console.log(reportResultTopRated, "reportResultTopRated");

          if (Array.isArray(reportResultTopRated)) {
            const reportData = reportResultTopRated.map((item, index) => {
              console.log(item);

              return {
                game: item.name,
                quantity: item.stock || null,
                category: values.category,
                platform: values.platform,
                selectedDate: values.dateRange[0],
              };
            });

            reportData.forEach((item) => {
              item.platform = values.platform;
              item.selectedDate = values.dateRange;
            });
            setReportResult(reportData);
            console.log(reportResult, "reportDatsa");

            if (values.fileFormat === "pdf") {
              await generarPDF(reportData);
            } else if (values.fileFormat === "csv") {
              const archivo = "informe.csv";
              descargarCSV(reportData, archivo);
            }
          }
        } else {
          const reportResultTopRated = await getTopSoldProducts(
            dateRange[0],
            dateRange[1],
            values.category,
            values.platform
          );
          console.log(reportResultTopRated, "reportResultTopRated");
          if (Array.isArray(reportResultTopRated)) {
            const reportData = reportResultTopRated.map((item, index) => {
              console.log(item);

              return {
                game: item.name,
                quantity: item.stock || null,
                category: values.category,
                platform: values.platform,
                selectedDate: values.dateRange[0],
              };
            });

            reportData.forEach((item) => {
              item.platform = values.platform;
              item.selectedDate = values.dateRange;
            });
            setReportResult(reportData);
            console.log(reportResult, "reportDatsa");

            if (values.fileFormat === "pdf") {
              await generarPDF(reportData);
            } else if (values.fileFormat === "csv") {
              const archivo = "informe.csv";
              descargarCSV(reportData, archivo);
            }
          }
        }
      } catch (error) {
        console.error("Error al generar el informe:", error);
      }
    },
  });

  function formatDateRange(dateRange: Date[]) {
    const options: any = { month: "short", year: "numeric" };

    if (dateRange && dateRange.length === 2) {
      const startDate = new Date(dateRange[0]).toLocaleDateString(
        undefined,
        options
      );
      const endDate = new Date(dateRange[1]).toLocaleDateString(
        undefined,
        options
      );

      return `${startDate} - ${endDate}`;
    }

    return "";
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white">
        <HeaderLayout />
        <Content className="p-4 mt-8">
          <div className=" max-w-md mx-auto ">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col py-20"
            >
              <h1 className="text-2xl font-semibold text-center ">
                Reports Game Best Sellers
              </h1>
              <div className="mb-4 mt-2">
                <label
                  htmlFor="dateRange"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  Select Date Range
                </label>
                <DatePicker.RangePicker
                  picker="month"
                  id="dateRange"
                  name="dateRange"
                  onChange={(dates, dateStrings) => {
                    formik.setFieldValue("dateRange", dates);
                    formik.setFieldValue("month", dateStrings[0]);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateRange}
                  className="w-full text-withe p-2 border rounded-md"
                />
                {
                  //@ts-ignore
                  formik.touched.dateRange && formik.errors.dateRange ? (
                    <div className="text-red-500">
                      {/* @ts-ignore */}
                      {formik.errors.dateRange}
                    </div>
                  ) : null
                }
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category || ""}
                  className="w-full p-2 border rounded-md dark:bg-white text-black"
                >
                  {categorias.map((categorie: any) => (
                    <option key={categorie.id} value={categorie.name}>
                      {categorie.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-500">{formik.errors.category}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="platform"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.platform || ""}
                  className="w-full p-2 border rounded-md dark:bg-white text-black"
                >
                  {plataformas.map((plataforma: any) => (
                    <option key={plataforma.id} value={plataforma.name}>
                      {plataforma.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block dark:text-white text-sm font-bold mb-2">
                  Options
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="bestSellers"
                      name="bestSellers"
                      onChange={formik.handleChange}
                      checked={formik.values.bestSellers}
                      className="mr-2"
                    />
                    <span className="text-sm">Best Sellers</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      id="topRated"
                      name="topRated"
                      onChange={formik.handleChange}
                      checked={formik.values.topRated}
                      className="mr-2"
                    />
                    <span className="text-sm">Top Rated</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="fileFormatPdf"
                      name="fileFormat"
                      value="pdf"
                      onChange={formik.handleChange}
                      checked={formik.values.fileFormat === "pdf"}
                      className="mr-2"
                    />
                    <span className="text-sm">PDF</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="fileFormatCsv"
                      name="fileFormat"
                      value="csv"
                      onChange={formik.handleChange}
                      checked={formik.values.fileFormat === "csv"}
                      className="mr-2"
                    />
                    <span className="text-sm">CSV</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="button1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Download Report
              </button>
            </form>

            {reportResult && (
              <div>
                <h2 className="text-xl font-bold">
                  Report Result Game Best Sellers
                </h2>
                <table
                  id="my-table"
                  className="w-full border-collapse border border-gray-900"
                >
                  <thead>
                    <tr className="bg-gray-900">
                      <th className="p-2 border border-gray-700">Game</th>
                      <th className="p-2 border border-gray-700">Quantity</th>
                      <th className="p-2 border border-gray-700">Category</th>
                      <th className="p-2 border border-gray-700">Platform</th>
                      <th className="p-2 border border-gray-700">
                        Selected Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportResult.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-800" : ""}
                      >
                        <td className="p-2 border border-gray-300">
                          {item.game}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.quantity}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.category}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.platform}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {item.selectedDate
                            ? // @ts-ignore
                              formatDateRange(item.selectedDate)
                            : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
};

export default Reportes;
