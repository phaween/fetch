import { existsSync, mkdirSync, writeFileSync } from "fs";
import { getLocalFilename } from "./getLocalFilename";
import { downloadHtml, downloadImage } from "./httpRequest";
import { isValidUrl } from "./isValidUrl";
import { processHtml } from "./processHtml";
import path from "path";

export interface IWebPage
{
    baseDir : string;
    urlString : string;
}

export async function processWebPage(params : IWebPage) : Promise<void> {
    return new Promise(async (resolve, reject) => {
        if(isValidUrl(params.urlString)){
            const url = new URL(params.urlString);
            const actualDir = params.baseDir + path.sep +  url.hostname;
            if (!existsSync(actualDir)){
                mkdirSync(actualDir);
            }
            
            const data = await downloadHtml(params.urlString);
            const filename = getLocalFilename(params.urlString);
            const images = await processHtml({ data, filepath : actualDir + path.sep + filename });
            images.forEach(async (image) => {
                const imageUrl = image.startsWith('http') ? image : params.urlString + image;
                const imageData = await downloadImage(imageUrl);
                const imgFilename = image.split('/').pop();
                writeFileSync(actualDir + path.sep + imgFilename, imageData);
            });

            resolve();
        }
        else
        {
            reject(`URL is not valid: ${params.urlString}`);
        }
    });
}
