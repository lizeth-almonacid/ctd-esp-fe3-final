export interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

export interface FilterProps {
  id: number;
  nombre: string;
  categoria: string[];
  desarrollador: string;
  fecha_lanzamiento: string;
  precio: number;
  imagen: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: number;
}
export interface Game  {
  categoria: string[];
  desarrollador: string;
  fecha_lanzamiento: string;
  imagen: string;
  nombre: string;
  precio: number;
  valoracion?:any
  categories: string[];
  image_url: any;
  score: number;
  price: number;
  release_date: string;
};

export interface NewUserProps {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  birthday: string;
  isRegistered?: boolean;
}

export interface ReportData {
  game: string;
  quantity: number;
  category: string | null;
  platform: string | null;
  selectedDate: Date;
}
export interface PaymentFormProps {
  onSubmit: (values: any) => void;
}

export interface PaymentFormValues {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvc: string;
}
export interface FormValues {
  dateRange: any;
  platform: any;
  month: string;
  category: string;
  bestSellers: boolean;
  topRated: boolean;
  fileFormat: "pdf" | "csv";
}
