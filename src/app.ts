import express from 'express'
import {Request, Response} from 'express';
import {createConnection} from 'typeorm';
import {Image} from './entity/Image';
import { mongoConfig } from './configs/mongo';
import AWS from "aws-sdk";
import fs from "fs";
import { BUCKET, REGION, ACCESS_KEY, SECRET_KEY } from './configs/config';
import { v4 as uuidv4 } from 'uuid';

// create typeorm connection
createConnection(mongoConfig).then(connection => {
    const imageRepository = connection.getRepository(Image);

    // create and setup express app
    const app = express()
    app.use(express.json())

    // register routes
    app.get("/images", async function(req: Request, res: Response) {
        const images = await imageRepository.find();
        res.json(images);
    });

    app.get("/images/:id", async function(req: Request, res: Response) {
        const results = await imageRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/images", async function(req: Request, res: Response) {
       
        AWS.config.update({
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
            region: REGION
        })

        const buf = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""),'base64')

        const s3 = new AWS.S3()
      
        const params = {
            Bucket: BUCKET,
            Key: uuidv4() + '.png', // File name you want to save as in S3
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }

            const url = data.Location

            const image =  imageRepository.create({'url': url});
            const results =  imageRepository.save(image);

            res.send(JSON.stringify({'url':url}));
        });
    });

    app.put("/images/:id", async function(req: Request, res: Response) {
        const image = await imageRepository.findOne(req.params.id);
        imageRepository.merge(image, req.body);
        const results = await imageRepository.save(image);
        return res.send(results);
    });

    app.delete("/images/:id", async function(req: Request, res: Response) {
        const results = await imageRepository.delete(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(3000);
});