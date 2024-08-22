// Import the system file config
const systemConfig = require('../config/system');

// Import route
const dashboardRoutes = require("./dashboard.route");
const staffRoutes = require("./staff.route");
const locationRoutes = require("./location.route");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/staffs', staffRoutes);
    app.use(PATH_ADMIN + '/locations', locationRoutes);
}