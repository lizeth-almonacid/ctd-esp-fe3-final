import React from "react";
import {
  HeartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Layout, Button } from "antd";
const { Footer } = Layout;
export default function FooterLayout() {
  return (
    <Footer className="w-full bottom-0 z-10 mt-4 bg-blue-800 text-white p-4 text-center flex justify-between items-center dark:bg-gray-900">
      <div className="flex-1 text-center">
        Made with <HeartOutlined /> Team 3
      </div>
      <div className="dark:text-white flex items-center space-x-4 text-3xl">
        <Button
          className="dark:text-white text-white"
          type="link"
          icon={<FacebookOutlined />}
        />
        <Button
          className="dark:text-white text-white"
          type="link"
          icon={<TwitterOutlined />}
        />
        <Button
          className="dark:text-white text-white"
          type="link"
          icon={<InstagramOutlined />}
        />
      </div>
    </Footer>
  );
}
