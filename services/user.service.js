import bcrypt from "bcryptjs";

class UserService {
  getUserDetail(user) {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar ? user.avatar : null,
      mobile: user.mobile ? user.mobile : null,
    };
  }
}

const userService = new UserService();

export default userService;
