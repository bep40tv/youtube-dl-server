import express from 'express';
import {YoutubeDl} from "./YoutubeDl";

const app = express();
const port = 3000;

app.get('/video', async (req, res) => {
    try {
        const url = req.query.url as string;
        const options = req.query.options as string;
        if(!url){
            res.status(400);
            res.send('Missing url');
            return;
        }
        const metadata = await YoutubeDl.getVideoMetadata(url, options);
        res.json(metadata);
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send(e);
    }
});

app.get('/update', async (req, res) => {
    try {
        await YoutubeDl.downloadTools(true);
        res.send('youtube-dl updated to latest version.');
    } catch (e) {
        console.error(e)
        res.status(500);
        res.send(e);
    }
});

app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
