import api from "@/lib/axios";
import { RefereeWithUser, CreateRefereePayload, ApiEnvelope } from "@/types/referee";
export const refereeService = {
  async getAll(): Promise<RefereeWithUser[]> {
    const res = await api.get<ApiEnvelope<RefereeWithUser[]>>(
      "/api/user/getAllReferees"
    );
    return res.data.data;
  },
  async getById(id: string): Promise<RefereeWithUser> {
    const res = await api.get<ApiEnvelope<RefereeWithUser>>(
      `/api/user/getUser/${id}`
    );
    return res.data.data;
  },
  async create(data: CreateRefereePayload): Promise<RefereeWithUser> {
    const payload: CreateRefereePayload = {
      ...data,
      phoneNumber: (data.phoneNumber || "").replace(/\D/g, ""),
      RoleId: Number(data.RoleId ?? 3),
      birthDate:
        typeof data.birthDate === "string"
          ? data.birthDate
          : new Date(data.birthDate).toISOString().split("T")[0],
      specification: (data.specification || "").trim(),
      AFCNumber: (data.AFCNumber || "").replace(/\D/g, ""),
      status: Boolean(data.status),
      photo: data.photo || "",
    };

    const res = await api.post<ApiEnvelope<RefereeWithUser>>(
      "/api/user/createUser",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data.data ?? (res.data as any).user;
  },

  async update(id: string, data: CreateRefereePayload): Promise<RefereeWithUser> {
    // ✅ استخدم FormData لأن الراوت فيه multer
    const formData = new FormData();
    formData.append("phoneNumber", (data.phoneNumber || "").replace(/\D/g, ""));
    formData.append("RoleId", String(Number(data.RoleId ?? 3)));
    formData.append(
      "birthDate",
      typeof data.birthDate === "string"
        ? data.birthDate
        : new Date(data.birthDate).toISOString().split("T")[0]
    );
    formData.append("specification", (data.specification || "").trim());
    formData.append("AFCNumber", (data.AFCNumber || "").replace(/\D/g, ""));
    formData.append("status", String(Boolean(data.status)));
    formData.append("photo", data.photo || "");
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("password", data.password ?? "");

    const res = await api.patch<ApiEnvelope<RefereeWithUser>>(
      `/api/user/editUser/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data.data ?? (res.data as any).user ?? (res.data as any).referee;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/user/deleteUser/${id}`);
  },
};