import multer from 'multer';
import path from 'path';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(), 'uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' +Date.now()+ '.' + file.mimetype.split('/')[1]);
    }
})

const uploadFile = multer({storage: storageConfig})
export default uploadFile;