class HomeController {
	getHomePage(req, res) {
		res.render('index.ejs');
	}
}

export default HomeController;
