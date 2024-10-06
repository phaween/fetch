import { writeFileSync } from "fs";
import { getLocalFilename } from "./getLocalFilename";
import { downloadHtml, downloadImage } from "./httpRequest";
import { isValidUrl } from "./isValidUrl";
import { processHtml } from "./processHtml";

export async function processWebPage(baseDir : string, urlString : string) : Promise<void> {
    return new Promise(async (resolve, reject) => {
        if(isValidUrl(urlString)){         
            const data = await downloadHtml(urlString);
            const filename = getLocalFilename(urlString);
            const images = await processHtml(data, baseDir + '/' + filename);
            images.forEach(async (image) => {
                const imageUrl = image.startsWith('http') ? image : urlString + image;
                const imageData = await downloadImage(imageUrl);
                const imgFilename = image.split('/').pop();
                writeFileSync(baseDir + '/' + imgFilename, imageData);
            });

            resolve();
        }
        else
        {
            reject(`URL is not valid: ${urlString}`);
        }
    });
}
