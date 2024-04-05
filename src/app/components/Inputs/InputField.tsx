import React, { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { InputFieldProps } from "@/app/types/types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  const iconMap = {
    text: <UserOutlined className="text-teal-500" />,
    email: <MailOutlined className="text-teal-500" />,
    password: <LockOutlined className="text-teal-500" />,
    date: <CalendarOutlined className="text-teal-500" />,
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <div className="relative text-gray-700 dark:text-white ">
        <div className="field flex items-center">
          {/* @ts-ignore */}
          {iconMap[type]}
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            value={value}
            //@ts-ignore
            onChange={onChange}
            placeholder={placeholder}
            className=" input-field"
          />
        </div>
        {type === "password" && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
          >
            {showPassword ? <EyeOutlined className="text-teal-500" /> : <EyeInvisibleOutlined className="text-teal-500" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
