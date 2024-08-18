// Models
const Staff = require("../models/staff.model");

// Config
const md5 = require('md5');
const systemConfig = require("../config/system");

// Helpers
const filterStatusHelper = require("../helpers/filterStatus");
const searchHelper = require("../helpers/search");
const paginationHelper = require("../helpers/pagination");


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

    // Search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.fullName = objectSearch.regex
    }

    // Pagination
    const countStaffs = await Staff.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1, 
            limitItems: 5
        },
        req.query,
        countStaffs
    );

    const records = await Staff
                            .find(find)
                            .select("-password")
                            .limit(objectPagination.limitItems)
                            .skip(objectPagination.skip);

    res.render('pages/staffs/index', {
        pageTitle: "Quản lý nhân viên",
        staffs: records,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
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

// [PATCH] /admin/staffs/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch (type) {
        case "active":
            await Staff.updateMany(
                { _id: { $in: ids } },
                { status: 'active' }
            );
            // req.flash("success", `Cập nhật trạng thái cho ${ids.length} nhân viên thành công!`);
            break;
        case "inactive":
            await Staff.updateMany(
                { _id: { $in: ids } },
                { status: 'inactive' }
            );
            // req.flash("success", `Cập nhật trạng thái cho ${ids.length} nhân viên thành công!`);
            break;
        case "delete-all":
            await Staff.updateMany(
                { _id: { $in: ids } },
                { deleted: true }
            );
            // req.flash("success", `Xóa ${ids.length} nhân viên thành công!`);
            break;
        default:
            break;
    }

    res.redirect("back");
}

// [PATCH] /admin/staffs/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Staff.updateOne(
        { _id: id },
        { status: status }
    )

    // req.flash("success", "Cập nhật thành công");
    res.redirect("back");
}

// [DELETE] /admin/staffs/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    await Staff.updateOne(
        { _id: id },
        { deleted: true }
    )

    // req.flash("success", "Cập nhật thành công");
    res.redirect("back");
}