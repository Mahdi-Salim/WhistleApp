import api from "@/lib/axios";
import { User } from "@/types/user";
import axios from "axios";

const transformAssessor = (data: unknown): User => {
  const d = data as Partial<User>;
  return {
    id: d.id ?? 0,
    userName: d.userName ?? "",
    email: d.email ?? "",
    password: d.password ?? "",
    phoneNumber: d.phoneNumber ?? "",
    birthDate: d.birthDate ?? "",
    address: d.address ?? "",
    photo: d.photo ?? "",
    RoleId: d.RoleId ?? 2, // المقيم دائمًا RoleId = 2
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
};

export const assessorService = {
  async getAll(): Promise<User[]> {
    const response = await api.get("/api/user/getAllRefereeAssessor");
    return response.data.data.map((item: unknown) => transformAssessor(item));
  },

  async getById(id: number): Promise<User> {
    // ✅ المسار الصحيح حسب الراوت
    const response = await api.get(`/api/user/getUser/${String(id)}`);
    return transformAssessor(response.data.data);
  },

  async create(data: Partial<User>): Promise<User> {
    if (
      !data.userName ||
      !data.email ||
      !data.password ||
      !data.phoneNumber ||
      !data.birthDate ||
      !data.address
    ) {
      throw new Error("جميع الحقول مطلوبة");
    }

    const cleanPhoneNumber = data.phoneNumber.replace(/\D/g, "");
    if (cleanPhoneNumber.length < 10 || cleanPhoneNumber.length > 15) {
      throw new Error("رقم الهاتف يجب أن يكون بين 10-15 رقم");
    }

    const payload = {
      userName: data.userName.substring(0, 16),
      email: data.email.trim(),
      password: data.password,
      phoneNumber: cleanPhoneNumber,
      RoleId: 2, // المقيم
      birthDate: data.birthDate,
      address: data.address,
      photo: data.photo || "",
    };

    try {
      const res = await api.post("/api/user/createUser", payload);
      return transformAssessor(res.data.user);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("ERROR CREATING ASSESSOR");
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
      }
      throw error;
    }
  },

  async update(id: number, data: Partial<User>): Promise<User> {
    const payload = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      RoleId: 2,
      birthDate: data.birthDate,
      address: data.address,
      photo: data.photo,
    };
    // ✅ المسار الصحيح حسب الراوت
    const res = await api.patch(`/api/user/editUser/${String(id)}`, payload);
    return transformAssessor(res.data.data);
  },

  async delete(id: number): Promise<void> {
    // ✅ المسار الصحيح حسب الراوت
    await api.delete(`/api/user/deleteUser/${String(id)}`);
  },
};