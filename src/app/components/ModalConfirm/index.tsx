import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  ModalProps,
  Result,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons"; 

interface Props extends ModalProps {
  onCancel: () => void;
  onAction: () => void;
  nameItem: string;
  titleConfirm: string;
  descriptionConfirm: string;
}

export const ModalConfirm = ({
  onCancel,
  nameItem,
  onAction,
  titleConfirm,
  descriptionConfirm,
  ...modalProps
}: Props) => {
  const [permit, setPermit] = useState(false);

  return (
    <Modal
      {...modalProps}
      onCancel={() => onCancel()}
      destroyOnClose={true}
      footer={null}
      className="bg-white dark:bg-gray-900 rounded-md"
      closeIcon={false}
    >
      <div className="text-right">
        <Button type="text" onClick={onCancel}>
          <CloseCircleFilled className="text-gray-100 text-2xl" />
        </Button>
      </div>
      <Result
        status={"warning"}
        title={
          <Typography.Text strong type="warning" className="text-2xl">
            {titleConfirm}
          </Typography.Text>
        }
        extra={
          <input
            className="field input-field"
            placeholder={nameItem}
            onChange={({ target: { value } }) => {
              if (value === nameItem) {
                setPermit(true);
              } else {
                setPermit(false);
              }
            }}
          />
        }
        subTitle={
          <Space className="text-justify" direction="vertical">
            <Typography.Paragraph className=" dark:text-white">
              {descriptionConfirm}
            </Typography.Paragraph>
            <Typography.Paragraph className=" dark:text-white">
              Para confirmar que deseas borrar el item, escribe la siguiente
              palabra:
              <Typography.Text strong type="danger">
                {` ${nameItem}`}
              </Typography.Text>
            </Typography.Paragraph>
          </Space>
        }
      />
      <div className="text-right">
        <Button
          className="dark:text-gray-100 border dark:border-gray-300 bg-gray-900 text-white"
          key={"btnCancelar"}
          type="default"
          onClick={onCancel}
          icon={<CloseCircleOutlined />}
        >
          Cancelar
        </Button>
        <Button
          className="m-2 dark:text-gray-100 text-black border border-gray-900 text-gray-900"
          key={"btnEliminar"}
          type="primary"
          danger
          onClick={() => {
            onAction();
            onCancel();
          }}
          disabled={!permit}
          icon={<DeleteOutlined className="dark:text-gray-100 dark:border-gray-300 text-gray-900  "/>}
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  );
};
