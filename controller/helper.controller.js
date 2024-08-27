// [GET] /admin/dashboard
module.exports.index = (req, res) => {
    res.render('pages/helpers/index', {
        pageTitle: "Quản lý người giúp việc"
    });
}