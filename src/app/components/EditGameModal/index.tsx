/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import usePlatformAndCategories from "@/app/hooks/usePlatformAndCategories";
import { updateProduct } from "@/app/servers/reques";
import { storage } from "@/app/services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const { Option } = Select;

const EditGameModal = ({ visible, onCancel, onEdit, game, gameId }: any) => {
  const [loading, setLoading] = useState(false);
  const { plataformas, categorias } = usePlatformAndCategories();
  const modalCloseStyles =
    "absolute right-2 top-0.5 text-gray-400 hover:text-red-500 text-2xl";
  const [imagen, setImagen] = useState<any[]>([]);
  const [imageError, setImageError] = useState(false);
console.log(game?.image_url);

  const initialValues = {
    id: gameId, 
    name: game?.name || "",
    description: game?.description || "",
    categories_id: game?.categories_id || [],
    platforms_id: game?.platforms_id || [],
    price: game?.price || "",
    date: game?.release_date ? (game.release_date) : null,
    image_url: game?.image_url ? game?.image_url : []
  };

  const handleSave = async (values: any) => {
    try {
      if (imagen.length > 0) {
        const file = imagen[0];
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const downloadURLs = [downloadURL];
        console.log(downloadURLs);
        
        // Actualiza los datos del juego con la nueva URL de imagen
        const gameDataWithImage = {
          ...values,
          image_url: downloadURLs,
          score: 9.9,
          stock: 100,
          id: gameId,
        };

        // Actualiza el juego en la base de datos
        await updateProduct(gameDataWithImage);
        message.success("Game updated successfully");
        onCancel();
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error(`Error updating game: ${error}`);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      title={
        <div className="dark:bg-gray-900 p-4 text-white">Edit Product</div>
      }
      className="bg-white dark:bg-gray-900 rounded-md text-center"
      closeIcon={<span className={modalCloseStyles}>&times;</span>}
    >
      <Form
        initialValues={initialValues}
        onFinish={handleSave}
        layout="vertical"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Categories"
          name="categories_id"
          rules={[{ required: true }]}
        >
          <Select mode="multiple" placeholder="Select categories">
            {categorias &&
              categorias.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Platforms"
          name="platforms_id"
          rules={[{ required: true }]}
        >
          <Select mode="multiple" placeholder="Select platforms">
            {plataformas &&
              plataformas.map((platform: any) => (
                <Option key={platform.id} value={platform.id}>
                  {platform.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Date" name="release_date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="image_url"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            {
              validator: (_, value) => {
                if (value.length > 0) {
                  setImageError(false);
                  return Promise.resolve();
                }
                setImageError(true);
                return Promise.reject("Please upload an image (required).");
              },
            },
          ]}
        >
          <Upload
            beforeUpload={(file) => {
              setImagen([file]);
              return false;
            }}
            listType="picture-card"
            showUploadList={false}
            style={{ textAlign: "center" }}
          >
            {imagen.length > 0 ? (
              <img
                src={URL.createObjectURL(imagen[0])}
                alt="Avatar"
                style={{ width: "100%", height: "auto", maxHeight: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined className="text-white"/>
                <div style={{ marginTop: 8, color: "white" }}>Upload</div>
              </div>
            )}
          </Upload>
          {imageError && (
            <div className="text-red-500">
              Please upload an image (required).
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            className="button1"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGameModal;
