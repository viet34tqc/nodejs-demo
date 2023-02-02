import appRoot from 'app-root-path';
import multer from 'multer';
import path from 'path';
import {
	FILE_NUMBER_FAIL,
	IMAGE_FORMAT_VALIDATION_FAIL,
	IMAGE_REQUIRED_FAIL,
} from '../constants';

class UploadMiddleware {
	getStorage = () => {
		return multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, appRoot + '/src/public/image/');
			},

			// By default, multer removes file extensions so let's add them back
			filename: function (req, file, cb) {
				cb(
					null,
					file.fieldname + '-' + Date.now() + path.extname(file.originalname)
				);
			},
		});
	};

	imageFilter = (req, file, cb) => {
		// Accept images only
		if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
			req.fileValidationError = IMAGE_FORMAT_VALIDATION_FAIL;
			return cb(new Error(IMAGE_FORMAT_VALIDATION_FAIL), false);
		}
		cb(null, true);
	};

	singleUpload = (req, res, next) => {
		const upload = multer({
			storage: this.getStorage(),
			fileFilter: this.imageFilter,
		}).single('single_file');

		upload(req, res, err => {
			if (req.fileValidationError) {
				return res.send(req.fileValidationError);
			} else if (!req.file) {
				return res.send(IMAGE_REQUIRED_FAIL);
			} else if (err) {
				return res.send(err.message);
			}

			// next will call to controller.
			next();
		});
	};

	multipleUpload = (req, res, next) => {
		const upload = multer({
			storage: this.getStorage(),
			fileFilter: this.imageFilter,
		}).array('multiple_file', 3);

		upload(req, res, err => {
			if (
				err instanceof multer.MulterError &&
				err.code === 'LIMIT_UNEXPECTED_FILE'
			) {
				// handle multer file limit error here
				return res.send(FILE_NUMBER_FAIL);
			} else if (req.fileValidationError) {
				return res.send(req.fileValidationError);
			} else if (!req.files) {
				return res.send(IMAGE_REQUIRED_FAIL);
			} else if (err) {
				return res.send(err);
			}
			// make sure to call next() if all was well
			next();
		});
	};
}

export default UploadMiddleware;
