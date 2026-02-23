import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
    //get data
    //validate
    //check if user already exists
    //create a user in db
    // create a verfication token
    //save token in db
    //send token as email to user
    //send success status to user

    const { name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            massage: "All fields are required",
        });
    }
    try {
        const existingUser = await User.findOne({ email});
        if (existingUser) {
            return res.status(400).json({
                massage: "User already exists",
            });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        console.log(user);

        if(!user) {
            return res.status(400).json({
                message: "User not registered",
            });
        }
        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);
        user.verificationToken = token;

        await user.save();

        //send email
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASWORD,
            } 
        });

        const mailoption ={
            from: process.env.MAILTRAP_SENDERMAIL,
            to:user.email,
            subject: `"Verify tour email",
            ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
        };
        await transporter.sendemail(mailoption);

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    }catch (error) {
        res.status(400).json({
            message: "User not registered",
            error,
            success: false,
        });
    }
};

const verifyUser = async (req, res) => {
    //get token from url
    //validate
    //find user based on token 
    //if not
    //set isVarified field to true
    // remove verification token
    //save
    //return

    const {token} = req.param;
    console.log(token);
    if (!token) {
        return res.status(400).json({
            message:"Invalid token",
        });
    }
    const user = await User.findOne({verificationToken: token});
    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
        });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    };

    const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //

    const token = jwt.sign(
      { id: user._id, role: user.role },

      "shhhhh",
      {
        expiresIn: "24h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {}
};

export { registerUser, verifyUser, login };


