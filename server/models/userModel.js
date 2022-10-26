const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "Please add a email"],
			unique: true,
			trim: true,
			match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "Please enter a valid email"
            ],
		},
		password: {
			type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be up to 6 characters"],
		},
		photo: {
			type: String,
			required: [true, "Please add a photo"],
			default: "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png",
		},
	},
	{ timestamps: true, }
);

// Encrypt password

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;
