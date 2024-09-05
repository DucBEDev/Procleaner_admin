// Import the system file config
const systemConfig = require('../config/system');

// Import route
const dashboardRoutes = require("./dashboard.route");
const staffRoutes = require("./staff.route");
const locationRoutes = require("./location.route");
const helperRoutes = require("./helper.route");
const roleRoutes = require("./role.route");
const serviceRoutes = require("./service.route");

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN + '/staffs', staffRoutes);
    app.use(PATH_ADMIN + '/locations', locationRoutes);
    app.use(PATH_ADMIN + '/helpers', helperRoutes);
    app.use(PATH_ADMIN + '/roles', roleRoutes);
    app.use(PATH_ADMIN + '/services', serviceRoutes);
}