import React, { ReactElement, useState } from "react";
import Login from "../login";
import RegistrationForm from "../registro";
import { AuthModalProps } from "@/app/types/types";
import { Tabs, Button, Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons"; 

const { TabPane } = Tabs;

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab,
}): ReactElement => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      closeIcon={false}
      className="bg-white dark:bg-gray-500 rounded-md"
    >
      <div className="text-right">
        <Button
          type="text"
          onClick={onClose}
        >
          <CloseCircleFilled className="dark:text-gray-100 text-gray-900"/> 
        </Button>
      </div>
      <Tabs
        activeKey={activeTab.toString()}
        onChange={(key) => setActiveTab(Number(key))}
        centered
      >
        <TabPane
          tab={
            <span className="dark:text-gray-100 text-gray-900">Sign In</span> 
          }
          key="0"
        >
          <Login onClose={onClose} isOpen={false} initialTab={0}/>
        </TabPane>
        <TabPane
          tab={
            <span className="text-gray-900 dark:text-gray-100">Sign Up</span> 
          }
          key="1"
        >
          <RegistrationForm onClose={onClose} isOpen={false} initialTab={0}/>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
