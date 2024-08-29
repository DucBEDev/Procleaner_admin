// Models
const Location = require("../models/location.model");
const Helper = require("../models/helper.model");

// Config
const systemConfig = require("../config/system");


// [GET] /admin/helpers
module.exports.index = (req, res) => {
    res.render('pages/helpers/index', {
        pageTitle: "Quản lý người giúp việc"
    });
}

// [GET] /admin/helpers/create
module.exports.create = async (req, res) => {
    const locations = await Location.find({});

    res.render('pages/helpers/create', {
        pageTitle: "Thêm người giúp việc",
        locations: locations
    });
}

// [POST] /admin/helpers/create
module.exports.createPost = async (req, res) => {
    let workingArea = {
        province: req.body.province,
        districts: []
    }
    if (req.body.jobDetail == "partTime") {
        workingArea.districts = [req.body.district, req.body.subDistrict]
    }

    req.body.workingArea = workingArea;

    if (req.body.avatar) {
        req.body.avatar = req.body.avatar[0];
    }

    const newHelper = new Helper(req.body);
    await newHelper.save();

    res.redirect(`${systemConfig.prefixAdmin}/helpers`)
}