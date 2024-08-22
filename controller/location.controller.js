// Models
const Location = require("../models/location.model");

// Config
const systemConfig = require("../config/system");


// [GET] /admins/locations
module.exports.index = async (req, res) => {
    const locations = await Location.find({
        deleted: false
    });

    res.render("pages/locations/index", {
        pageTitle: "Danh sách địa điểm",
        locations: locations
    })
}

// [GET] /admins/locations/fetch
module.exports.fetchData = async (req, res) => {
    const locations = await Location.find({
        deleted: false,
        province: req.query.province
    });

    res.json(locations);
}

// [GET] /admin/locations/createProvince
module.exports.createProvince = async (req, res) => {
    res.render("pages/locations/createProvince", {
        pageTitle: "Thêm khu vực"
    })
}

// [POST] /admin/locations/createProvince
module.exports.createProvincePost = async (req, res) => {
    const location = new Location(req.body);
    location.save();

    res.redirect("/admin/locations");
}

// [GET] /admin/locations/createDistrict
module.exports.createDistrict = async (req, res) => {
    const locations = await Location.find({
        deleted: false
    });

    res.render("pages/locations/createDistrict", {
        pageTitle: "Thêm quận",
        locations: locations
    })
}

// [POST] /admin/locations/createDistrict
module.exports.createDistrictPost = async (req, res) => {
    await Location.updateOne(
        { province: req.body.province },
        {
            $push: { districts: req.body.district }
        }
    );
    req.flash("success", "Cập nhật thành công!");
    res.redirect("back");
}