import multer from 'multer';

import multerS3 from 'multer-s3';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import {fromIni} from '@aws-sdk/credential-provider-ini';
dotenv.config();

const storageConfig = multerS3({
    s3: new S3Client({
        region:process.env.AWS_REGION,
        credentials: fromIni({
            accessKey: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })
    }),
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
        cb(null, file.fieldname + '-' +Date.now()+ '.' + file.mimetype.split('/')[1]);
    }
})

const uploadFile = multer({storage: storageConfig})
export default uploadFile;