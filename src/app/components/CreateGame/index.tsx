import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  uploadImageToFirebaseStorage,
} from "@/app/services/firebase";
import InputField from "../Inputs/InputField";
// import { categorias } from "../../services/categories.json";
import { useGames } from "@/app/hooks/useGames";
import usePlatformAndCategories from "@/app/hooks/usePlatformAndCategories";
import { createProduct } from "@/app/servers/reques";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

function CreateGame() {
  const itemsPerPage = 10;
  const [modalVisible, setModalVisible] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [imagen, setImagen] = useState([]);
  const [gameType, setGameType] = useState(null);
  const { gameAll } = useGames();
  const [imageError, setImageError] = useState(false);

  const modalCloseStyles =
    "absolute right-2 top-0.5 text-gray-400 hover:text-red-500 text-2xl";
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const { plataformas, categorias } = usePlatformAndCategories();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedPlatformIds, setSelectedPlatformIds] = useState([]);
  const [gameToEdit, setGameToEdit] = useState(null);
  const [gameAllFilter, setGameAllFilter] = useState()

  const handleSave = async (values: any) => {
    // console.log(values.release_date);

    try {
      if (imagen.length > 0) {
        const downloadURL = await Promise.all(
          imagen.map(async (file) => {
            const url = await uploadImageToFirebaseStorage(file);
            return url;
          })
        );

        const gameDataWithImage = {
          ...values,
          image_url: downloadURL,
          score: 9.9,
          stock: 100,
        };
        console.log(gameDataWithImage);

        const result = await createProduct(gameDataWithImage);
        // @ts-ignore
        if (result) {
          // @ts-ignore
          console.log(`Juego creado con éxito. ID del juego: ${result.gameId}`);
          setModalVisible(false);
        } else {
          // @ts-ignore
          console.error(`Error al crear el juego: ${result.error}`);
        }
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error(`Error al subir la imagen a Firebase: ${error}`);
    }
  };

  return (
    <div>
      <Button
        className="button1 w-full"
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Create Product
      </Button>
      <Modal
        title={
          <div className="dark:bg-gray-900 p-4 text-white">Create Product</div>
        }
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        className="bg-white dark:bg-gray-900 rounded-md text-center"
        closeIcon={<span className={modalCloseStyles}>&times;</span>}
      >
        <Form onFinish={handleSave}>
          <Form.Item
            label="Name"
            name="name"
            className="dark:text-black"
            rules={[
              {
                required: true,
                message: "Please enter the game name",
              },
            ]}
          >
            <Input className="bg-gray-400 border-none outline-none w-full text-white dark:text-black" />
          </Form.Item>
          <Form.Item label="Category" name="categories_id">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select or enter categories"
              onChange={(values) => setSelectedCategoryIds(values)}
            >
              {categorias.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Platform" name="platforms_id">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Select or enter platform"
              onChange={(values) => setSelectedPlatformIds(values)}
            >
              {plataformas.map((platform: any) => (
                <Option key={platform.id} value={platform.id}>
                  {platform.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Release date" name="release_date">
            <InputField
              label="Birthday"
              type="date"
              value={birthdate}
              //@ts-ignore
              onChange={(e) => setBirthdate(e.target.value)}
              placeholder="Your birthday"
              required
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <InputNumber
              style={{ width: "100%" }}
              className="bg-gray-400 border-none outline-none w-full text-white dark:text-black"
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            className="dark:text-black"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <TextArea
              className="bg-gray-400 border-none outline-none w-full text-white dark:text-black"
              autoSize={{ minRows: 3, maxRows: 5 }} 
            />
          </Form.Item>

          <Form.Item name="image_url">
            <Upload
              beforeUpload={(file: any) => {
                //@ts-ignore
                setImagen([...imagen, file]);
                setImageError(false);
                return false;
              }}
              showUploadList={false}
            >
              {imagen.length > 0 ? (
                <Button className="button1" icon={<PlusOutlined />}>
                  Change image
                </Button>
              ) : (
                <Button className="button1" icon={<PlusOutlined />}>
                  Upload Image
                </Button>
              )}
            </Upload>
            {imageError && (
              <div className="text-red-500">
                Please upload an image (required).
              </div>
            )}
            {imagen.length > 0 && (
              <Button
                type="link"
                onClick={() => setImagen([])}
                className="text-red-500"
              >
                Delete image
              </Button>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="button1 w-full">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CreateGame;
