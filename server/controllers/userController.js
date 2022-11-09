const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/*
    @desc    Register a new user
    @route   POST /api/users/register
    @access  Public
*/
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	// Validation
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill in all required fields");
	}

	// Check Password Length
	if (password.length < 6) {
		res.status(400);
		throw new Error("Password must be up to 6 characters");
	}

	// Check if user already exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// Create new user
	const user = await User.create({
		name,
		email,
		password,
	});

	// Generate Token
	const token = generateToken(user._id);

	// send token to frontend
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 86400000), // expires in 1 day
		sameSite: "none",
		secure: true,
	});

	if (user) {
		const { _id, name, email } = user;
		res.status(201).json({
			_id,
			name,
			email,
            token
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

/*
    @desc    Login user
    @route   POST /api/users/login
    @access  Public
*/
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Validation
	if (!email || !password) {
		res.status(400);
		throw new Error("Please fill in all required fields");
	}

	// Check if user exists
	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error("User not found, Please register");
	}

	// Check if password matches
	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		res.status(400);
		throw new Error("Invalid credentials, Password is incorrect");
	}

    // Generate Token
	const token = generateToken(user._id);

	// send token to frontend
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 86400000), // expires in 1 day
		sameSite: "none",
		secure: true,
	});

	if (user && isMatch) {
		const { _id, name, email } = user;
		res.status(200).json({
			_id,
			name,
			email,
            token,
		});
	} else {
		res.status(400);
		throw new Error("Invalid email or password");
	}
});


/*
    @desc    Logout user
    @route   GET /api/users/logout  
    @access  Private
*/
const logout = asyncHandler(async (req, res) => {

    // Clear cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
    });
    return  res.status(200).json({
        message: "Logged out",
    });
});

/*
    @desc    Get user profile
    @route   GET /api/users/getuser
    @access  Private
*/
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        const { _id, name, email } = user;
        res.status(200).json({
            _id,
            name,
            email,
        });
        } else {
            res.status(400);
            throw new Error("User not found");
        }
});

/*
    @desc    Check if user is logged in
    @route   GET /api/users/loggedin
    @access  Private
*/
const loginStatus = asyncHandler(async (req, res) => {
    
    // const user = await User.findById(req.user._id);
    const token = req.cookies.token;

    if(!token) {
        return res.json(false);
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if(verified) {
        return res.json(true);
    }

    return res.json(false);

    // if(user) {
    //     const { _id, name, email } = user;
    //     res.status(200).json({
    //         _id,
    //         name,
    //         email,
    //     });
    //     } else {
    //         res.status(400);
    //         throw new Error("User not found");
    //     }
});

/*
    @desc    Update user profile
    @route   PUT /api/users/updateuser
    @access  Private
*/
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        const {name, email} = user;
        user.name = req.body.name || name;
        user.email = email;

        // save uodated user data
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    } 
});

/*
    @desc    Update user password
    @route   PUT /api/users/updatepassword
    @access  Private
*/

const updatePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const {oldPassword, password} = req.body;
    
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }

    if(!oldPassword || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    // Check if password matches
    const passwordCorrect = await bcrypt.compare(oldPassword, user.password);

    // save password
    if(user && passwordCorrect) {
        user.password = password;
        await user.save();
        res.status(200).send("Password updated");
    } else {
        res.status(400);
        throw new Error("Invalid credentials, Password is incorrect");
    }

});

/* 
    @desc    Forgot password
    @route   POST /api/users/forgotpassword
    @access  Public
*/
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if(!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
  
    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if(token) {
      await token.deleteOne();
    }
  
    // Generate token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);
  

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    // Save Token to DB
    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // expires in 1 hour
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>You are recieving this email because you have requested to reset your password</p>  
        <p>This reset link is valid for only 1 hour.</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>Thank you.</p>
      `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
  
    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email not sent, please try again");
    }
});


/*
    @desc    Reset password
    @route   POST /api/users/resetpassword
    @access  Public
*/

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
  
    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Find token in DB
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
  
    if (!userToken) {
      res.status(404);
      throw new Error("Invalid or Expired Token");
    }
  
    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password Reset Successful, Please Login",
    });
});


module.exports = {
	registerUser,
	loginUser,
    logout,
    getUser,
    loginStatus,
    updateUser,
    updatePassword,
    forgotPassword,
    resetPassword
};
