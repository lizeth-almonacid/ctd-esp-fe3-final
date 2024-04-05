"use client";
import Link from "next/link";
import FooterLayout from "./components/Footer";
import { Layout } from "antd";
import { ThemeProvider } from "next-themes";
export default function Error404() {
  const { Content } = Layout;
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout className="w-full min-h-screen dark:bg-gray-700 bg-white overflow-hidden">
        <Content className="body ">
          <div className="noise"></div>
          <div className="overlay"></div>
          <div className="terminal">
            <h1>
              Error <span className="errorcode">404</span>
            </h1>
            <p className="output">
              The page you are looking for might have been removed, had its name
              changed or is temporarily unavailable.
            </p>
            <p className="output">
              Please try to <Link href="/">go back</Link> or{" "}
              <Link href="/">return to the homepage</Link>.
            </p>
            <p className="output">Good luck.</p>
          </div>
        </Content>
        <FooterLayout />
      </Layout>
    </ThemeProvider>
  );
}
