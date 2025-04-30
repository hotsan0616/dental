import axios from 'axios';
import { PatientRegisterRequest, PatientLoginRequest } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:6616';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Add CORS headers to all requests
api.interceptors.request.use((config) => {
  // Remove the Access-Control-Allow-Origin header from client-side requests
  // This header should only be set by the server
  delete config.headers['Access-Control-Allow-Origin'];
  
  // Add JWT token to headers if available
  const token = sessionStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Base Response Interface
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

// Patient Related Interfaces
export interface PatientEditRequest {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  dob: string;
  phone: string;
}

// Treatment Related Interfaces
interface TreatmentResponse {
  code: number;
  message: string;
  itemList: Array<{
    id: number;
    name: string;
    image_url: string;
  }>;
}

// Dentist Related Interfaces
interface DentistResponse {
  code: number;
  message: string;
  dentistList: Array<{
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    emailAddress: string;
    imageUrl: string;
  }>;
}

interface DentistDetailResponse {
  code: number;
  message: string;
  dentist: {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    emailAddress: string;
  };
}

interface DentistItem {
  id: number;
  dentistReferenceId: number;
  dentist: {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    emailAddress: string;
  };
  itemReferenceId: number;
  item: {
    id: number;
    name: string;
  };
  fee: number;
}

interface DentistItemsResponse {
  code: number;
  message: string;
  dentistItemList: DentistItem[];
}

// Clinic Related Interfaces
export interface Clinic {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string;
  openHours: string;
  imageUrl?: string;  // Optional property for clinic image
}

interface ClinicResponse {
  code: number;
  message: string;
  clinicList: Array<{
    id: number;
    name: string;
    address: string;
    district: string;
    phone: string;
    openHours: string;
  }>;
}

interface ClinicDentist {
  id: number;
  clinicReferenceId: number;
  clinic: {
    id: number;
    name: string;
    address: string;
    district: string;
    phone: string;
    openHours: string;
  };
  dentistReferenceId: number;
  dayOfWeek: string;
  timeslot: {
    id: number;
    startTime: string;
    endTime: string;
  };
}

interface ClinicDentistResponse {
  code: number;
  message: string;
  clinicDentistList: Array<{
    id: number;
    clinicReferenceId: number;
    clinic: {
      id: number;
      name: string;
      address: string;
      district: string;
      phone: string;
      openHours: string;
    };
    dentistReferenceId: number;
    dentist: {
      id: number;
      firstName: string;
      lastName: string;
      gender: string;
      emailAddress: string;
      imageUrl: string;
    };
    dayOfWeek: string;
    timeslotReferenceId: number;
    timeslot: {
      id: number;
      startTime: string;
      endTime: string;
    };
  }>;
}

// Blog Related Interfaces
interface BlogListResponse {
  code: number;
  message: string;
  blogList: Array<{
    id: number;
    title: string;
    slug: string;
    snippet: string;
    content: string;
    date: string;
    image: string;
  }>;
}

interface BlogDetailResponse {
  code: number;
  message: string;
  blog: {
    id: number;
    title: string;
    slug: string;
    snippet: string;
    content: string;
    date: string;
    image: string;
  };
}

// Contact Form Interface
interface ContactFormData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phone: string;
  topic: string;
  message: string;
}

interface appointmentData {
  patientId: number;
  clinicDentistId: number;
  appointmentDate: string;
  totalAmount: number;
  status: string;
  appointmentItems: Array<{
    dentistItemId: number;
  }>;
}


// API Functions
export const patientApi = {
  register: async (data: PatientRegisterRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/patient/register', data);
    return response.data;
  },

  login: async (data: PatientLoginRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/patient/login', data);
    return response.data;
  },

  forgotPassword: async (data: { email: string }): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/patient/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: { email: string; code: string; newPassword: string }): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/patient/reset-password', data);
    return response.data;
  },

  getTreatments: async (): Promise<TreatmentResponse> => {
    const response = await api.get<TreatmentResponse>('/item/list');
    return response.data;
  },

  editProfile: async (data: PatientEditRequest): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/patient/edit', data);
    return response.data;
  },

  getDentists: async (): Promise<DentistResponse> => {
    const response = await api.get<DentistResponse>('/dentist/list');
    return response.data;
  },

  getDentistById: async (id: number): Promise<DentistDetailResponse> => {
    const response = await api.get<DentistDetailResponse>(`/dentist/${id}`);
    return response.data;
  },

  getDentistItems: async (dentistId: number): Promise<DentistItemsResponse> => {
    const response = await api.get<DentistItemsResponse>(`/dentistItem/dentist/${dentistId}`);
    return response.data;
  },

  getClinicDentists: async (clinicId: string): Promise<ClinicDentistResponse> => {
    const response = await api.get<ClinicDentistResponse>(`/clinicDentist/clinic/${clinicId}`);
    return response.data;
  },

  getClinics: async (): Promise<ClinicResponse> => {
    const response = await api.get<ClinicResponse>('/clinic/list');
    return response.data;
  },

  getClinicDentistsByDentist: async (dentistId: number): Promise<ClinicDentistResponse> => {
    const response = await api.get<ClinicDentistResponse>(`/clinicDentist/dentist/${dentistId}`);
    return response.data;
  },

  submitContactForm : async (formData: ContactFormData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/contact_us', formData);
    return response.data;
  },

  submitAppointment : async (formData: appointmentData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/appointment/create', formData);
    return response.data;
  },

  getBlogs: async (): Promise<BlogListResponse> => {
    const response = await api.get<BlogListResponse>('/blog/list');
    return response.data;
  },

  getBlogById: async (id: number): Promise<BlogDetailResponse> => {
    const response = await api.get<BlogDetailResponse>(`/blog/${id}`);
    return response.data;
  },
};