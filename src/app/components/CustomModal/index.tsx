import React from "react";
import { Modal, Button } from "antd";

const CustomModal = ({ title, content, onOk, onCancel, visible }: any) => {
  return (
    <Modal title={title} open={visible} onOk={onOk} onCancel={onCancel} className="mt-4 dark:bg-gray-900">
      {content}
      <div className="mt-4">
        <Button type="primary" onClick={onOk}>
          Confirmar
        </Button>
        <Button onClick={onCancel} className="text-red-500">
          Eliminar
        </Button>
      </div>
    </Modal>
  );
};

export default CustomModal;
