// Models
const Request = require("../models/request.model");
const Location = require("../models/location.model");
const Service = require("../models/service.model");

// Config 
const systemConfig = require("../config/system");

// Libs
const moment = require("moment");

// [GET] /admin/requests
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
        status: "notDone"
    };
    const undeterminedCost = [];
    const processingRequest = [];

    const records = await Request.find(find);

    for (const record of records) {
        const hasExtraFee = await Service.findOne(
            { _id: record.service_id }
        );

        if (hasExtraFee.extraFee == "yes") {
            undeterminedCost.push(record);
        }
        else {
            processingRequest.push(record);
        }
    }

    res.render('pages/requests/index', {
        pageTitle: "Quản lý đơn hàng",
        undeterminedCost: undeterminedCost,
        processingRequest: processingRequest
    });
}

// [GET] /admin/requests/create
module.exports.create = async (req, res) => {
    const locations = await Location.find({});
    const services = await Service.find({
        deleted: false,
        status: "active"
    });

    res.render('pages/requests/create', {
        pageTitle: "Thêm đơn hàng",
        locations: locations,
        services: services
    });
}

// [POST] /admin/requests/create
module.exports.createPost = async (req, res) => {
    if (req.body.requestType == "shortTerm") {
        req.body.endDate = req.body.startDate;
    }

    let customerInfo = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address
    }
    req.body.customerInfo = customerInfo;

    let location = {
        province: req.body.province,
        district: req.body.district
    }
    req.body.location = location;

    const startDate = moment(req.body.startDate);
    const startTime = moment(startDate);
    const startTimeTemp = parseInt(req.body.startTime);
    // Create time
    startTime.hour(Math.floor(startTimeTemp / 60))
            .minute(startTimeTemp % 60)
            .second(0)
            .millisecond(0);
    // Add 7 hours (VN is UTC +7)
    startTime.add(7, 'hours');
    // Convert to Date 
    req.body.startTime = startTime.toDate();
    
    const endDate = moment(req.body.endDate);
    const endTime = moment(endDate);
    const endTimeTemp = parseInt(req.body.endTime);
    // Create time
    endTime.hour(Math.floor(endTimeTemp / 60))
            .minute(endTimeTemp % 60)
            .second(0)
            .millisecond(0);
    // Add 7 hours (VN is UTC +7)
    endTime.add(7, 'hours');
    // Convert to Date 
    req.body.endTime = endTime.toDate();

    const request = new Request(req.body);
    await request.save();

    req.flash("success", "Tạo đơn hàng thành công");
    res.redirect(`${systemConfig.prefixAdmin}/requests`)
}