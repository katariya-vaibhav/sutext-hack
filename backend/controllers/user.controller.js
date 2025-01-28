import { User } from "../model/user.schema.js";

const genToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const token = user.genToken();
    return { token };
  } catch (error) {
    throw new Error("Something went wrong while generating token", error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password  } = req.body;

    console.log(req.body);

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }


    const user = await User.create({
      username,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    // await sendEmail({
    //   email: createdUser.email,
    //   subject: "Welcome to the app",
    //   html: `<h1>hello user Welcome to the shop-trend </h1>`,
    // });

    if (!createdUser) {
      return res.status(500).json({
        message: "User cannot be created",
      });
    }

    res.status(200).json({
      message: "User created successfully",
      createdUser,
    });
  } catch (error) {
    console.error("Error while registering the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password must be required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const correctPassword = await user.isPasswordCorrect(password);

    if (!correctPassword) {
      return res.status(400).json({
        message: "email or passwrod invalid",
      });
    }

    const { token } = await genToken(user._id);
    console.log(token);

    const loginUser = await User.findById(user._id).select("-password");

    // await sendEmail({
    //   email: loginUser.email,
    //   subject: "Welcome to the app",
    //   html: `<h1>hello User , </br>  Welcome to the shop-trend </h1>`,
    // });

    const option = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res.status(200).cookie("token", token, option).json({
      loginUser,
    });
  } catch (error) {
    console.error("Error while login the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  if (!req.user) {
    res.json({
      message: "user not exist",
    });
  }

  try {
    const option = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res.status(200).clearCookie("token", option).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error while logout the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const getCorrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id).select("-password ");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error while get the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const currUserId = req.user._id;

    if (!currUserId) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const findUser = await User.findById(currUserId);

    if (!findUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (findUser?.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const user = await User.find().select("-password");

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error while get all the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdminId = req.user?._id;
    const isAdmin = await User.findById(isAdminId);
    if (isAdmin.role !== "admin") {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting the user:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getCorrentUser,
  getAllUser,
  deleteUser,
};