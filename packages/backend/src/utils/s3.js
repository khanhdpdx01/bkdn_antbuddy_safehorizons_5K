import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

require('dotenv').config({ path: `${__dirname}/../../.env` });

const s3bucket = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export function uploadFile(files) {
    const params = files.map((item) => {
        const fileStream = fs.createReadStream(item.path);
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: fileStream,
            Key: item.filename,
        };
    });
    const responeData = params.map((param) => s3bucket.upload(param, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                return data;
            }
        }));
    return responeData;
}

// download file from s3 bucket
export function getFile(filekey) {
    const downloadParams = {
        Key: filekey,
        Bucket: process.env.AWS_BUCKET_NAME,
    };
    return s3bucket.getObject(downloadParams).createReadStream();
}
