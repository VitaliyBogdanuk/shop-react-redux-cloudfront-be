import { S3Handler } from "aws-lambda";
import {S3} from 'aws-sdk';
import * as csv from 'csv-parser';

export const importFileParser: S3Handler = event => {
    const s3 = new S3({region: 'eu-west-1', signatureVersion: 'v4'});

    for (const record of event.Records) {
        try {
            const {bucket: {name: Bucket}, object: {key: Key}} = record.s3;
            s3.getObject({Bucket, Key}).createReadStream()
                .on('error', error => console.log(`Service error: ${error}`))
                    .pipe(csv())
                    .on('error', error => console.log(error))
                    .on('data', chunk => console.log(JSON.stringify(chunk)))
                    .on('end', async () => {
                        await s3.copyObject({
                            Bucket,
                            CopySource: `${Bucket}/${Key}`,
                            Key: Key.replace('uploaded', 'parsed')
                        }).promise();
                        await s3.deleteObject({Bucket, Key}).promise();
                    });
        } catch(exception) {
            console.log(exception);
        }
    }
}; 
