
import * as fs from "fs";
import axios from 'axios';
import * as http from './lib/httpRequest'
import * as processHtml from './lib/processHtml'
import path from "path";
import { buffer } from "stream/consumers";

var baseDir = path.resolve(__dirname, '..') + '/data';

if (!fs.existsSync(baseDir)){
    fs.mkdirSync(baseDir);
}

const args = process.argv.slice(2);
args.forEach(arg => {
  const url = new URL(arg);
  console.log(`site: ${arg}`);
  http.downloadHtml(arg).then((response) =>
    {
      const url = new URL(arg);
      const filename = url.hostname + '.html'
      console.log(filename);
      processHtml.processHtml(response, baseDir + '/' + filename).then((images) =>
        images.forEach((image) => {
          const imageUrl = image.startsWith('http') ? image : url + image;
          http.downloadImage(imageUrl).then((buffer) =>{
            const imgFilename = image.split('/').pop();
            fs.writeFileSync(baseDir + '/' + imgFilename, buffer);
          })
        })
      )

      console.log(`last_fetch: ${new Date()}`);
    })
    .catch((error) => {
      if (!axios.isAxiosError(error)) {
        console.log(error);
      }
    });
});