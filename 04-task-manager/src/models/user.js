const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const Task = require("./task")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("the email you provided is invalid")
            }
        }

    },

    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Error:", "Your password must not include the word password")
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("your age must be greater than 30")
            }

        }
    },

    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],

    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})

// set up a virtual field for the user
userSchema.virtual("tasks", {
    ref: "Tasks",
    localField: "_id",
    foreignField: "owner"
})

// hide user private data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// Genrate an auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token

}

// create a fucntion to authenticate user before they login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("unable to login")
    }
    return user
}


// the code below hash the plain text password before saving
// ensure you use the function keyword so to be able to bind as arrow function don't bind
userSchema.pre("save", async function (next) {
    const user = this
    // just to check if the password is really modified
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// middleware to delete user task when the user is removed
userSchema.pre("remove", async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
const User = mongoose.model("User", userSchema)

module.exports = User


