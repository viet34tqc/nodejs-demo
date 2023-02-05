class UploadController {
	getUploadPage(req, res) {
		res.render('upload-file.ejs');
	}

	singleUpload(req, res) {
		// Display uploaded image for user validation
		res.send(
			`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
		);
	}
	multipleUpload(req, res) {
		let result = 'You have uploaded these images: <hr />';
		const files = req.files;
		let index, len;

		// Loop through all the uploaded images and display them on frontend
		for (index = 0, len = files.length; index < len; ++index) {
			result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
		}
		result += '<hr/><a href="/upload">Upload more images</a>';
		res.send(result);
	}
}

export default UploadController;
