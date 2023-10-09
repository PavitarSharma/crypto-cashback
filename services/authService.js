import http from "@/redux/api/http";

const signUp = async (body) => {
  const response = await http.post("/user/signUp", body);

  return response.data;
};

const login = async (body) => {
  const response = await http.post("/user/login", body);
  return response.data;
};

const forgotPassword = async ({ email }) => {
  const response = await http.post("/user/forgot-password", {
    email,
  });

  return response.data.message;
};

const restPassword = async ({ newPassword, confirmPassword, token }) => {
  const response = await http.post(`/user/reset-password?token=${token}`, {
    newPassword,
    confirmPassword,
  });

  return response.data.message;
};

const verifyOtp = async ({ otp, email, hash }) => {
  const response = await http.post("/user/verify-otp", { otp, email, hash });
  return response.data;
};

const resendOtp = async ({ email }) => {
  const response = await http.post("/user/resend-otp", { email });
  return response.data;
};

const getUserDetail = async (userId) => {
  const response = await AxiosPrivate.get(`/user/${userId}`);

  return response.data;
};

const authService = {
  signUp,
  login,
  forgotPassword,
  restPassword,
  getUserDetail,
  verifyOtp,
  resendOtp
};

export default authService;
