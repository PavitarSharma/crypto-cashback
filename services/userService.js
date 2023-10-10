import { AxiosPrivate } from "@/redux/api/http";

const getUserDetail = async (userId) => {
  const response = await AxiosPrivate.get(`/user/${userId}`);

  return response.data;
};

const updatePassword = async (data) => {
  const response = await AxiosPrivate.post("/user/update-password", data);

  return response.data;
};

const updateUser = async ({ id, data }) => {
  const response = await AxiosPrivate.patch(`/user/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const updateUserInfo = async ({ id, data }) => {
  const response = await AxiosPrivate.post(
    `/user/${id}/update-user-info`,
    data
  );

  return response.data;
};

const getAllUsers = async (data) => {
  const response = await AxiosPrivate.get("/user", data);

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await AxiosPrivate.delete(`/user/${userId}`);

  return response.data;
};

const userService = {
  getUserDetail,
  updatePassword,
  updateUser,
  updateUserInfo,
  getAllUsers,
  deleteUser,
};

export default userService;
