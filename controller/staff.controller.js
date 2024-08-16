// Models
const Staff = require("../models/staff.model");

// Config
const md5 = require('md5');
const systemConfig = require("../config/system");

// Helpers
const filterStatusHelper = require("../helpers/filterStatus");


// [GET] /admin/staffs
module.exports.index = async (req, res) => {
    // FIlter status
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    };
    if (req.query.status) {
        find.status = req.query.status;
    }

    const records = await Staff.find(find).select("-password");

    res.render('pages/staffs/index', {
        pageTitle: "Quản lý nhân viên",
        staffs: records,
        filterStatus: filterStatus
    });
}

// [GET] /admin/staffs/create
module.exports.create = async (req, res) => {
    res.render('pages/staffs/create', {
        pageTitle: "Thêm mới nhân viên"
    });
}

// [POST] /admin/staffs/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Staff.findOne({
        email: req.body.email,
        deleted: false
    });
    const phoneExist = await Staff.findOne({
        phone: req.body.phone,
        deleted: false
    });

    if (emailExist) {
        req.flash('error', 'Email đã tồn tại');
        res.redirect("back");
    }
    else if (phoneExist) {
        req.flash('error', 'Số điện thoại đã tồn tại');
        res.redirect("back");
    }
    else {
        req.body.password = md5(req.body.password);

        const record = new Staff(req.body);
        await record.save();

        res.redirect(`${systemConfig.prefixAdmin}/staffs`);
    }
}