const user = require("../models/user");
const bcrypt = require('bcryptjs');

const test = async (req, res) => {
    return res.send('user controller works');
}

const Register = async (req, res) => {

    const { email, name, cin, password } = req.body;

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (existingUser) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        email,
        name,
        cin,
        password: hashedPassword
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(201).json({ success: true, message: 'user added successfully', data: NewUser });

}

const Login = async (req, res) => {

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error ', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'Email donst exist!!', data: null });
    }

    const compare = await bcrypt.compare(password, existingUser.password);  // true// false

    if (!compare) {
        return res.status(200).json({ success: false, message: 'Check Your Password', data: null });
    }

    return res.status(200).json({ success: true, message: `Logged Successfully, Welcome Mr/Miss/Mrs ${existingUser.name}`, data: existingUser });

}

const GetAll = async (req, res) => {

    let allUser;
    try {
        allUser = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'user found successfully', data: existingUser });

}

const Update = async (req, res) => {

    const { email, name, cin } = req.body;
    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    if (req.body.password) {

        existingUser.password = await bcrypt.hash(req.body.password, 10);
    }

    existingUser.email = email;
    existingUser.name = name;
    existingUser.cin = cin;

    try {
        await existingUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });

}

const DeleteUser = async (req, res) => {
    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    try {
        await existingUser.deleteOne();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user deleted successfully', data: null });
}

exports.test = test
exports.Register = Register
exports.GetAll = GetAll
exports.FindById = FindById
exports.DeleteUser = DeleteUser
exports.Login = Login
exports.Update = Update