import * as cheerio from "cheerio";
import * as fs from "fs";

export interface IFileBuffer
{
    data : Buffer;
    filepath : string;
}

export async function processHtml(params : IFileBuffer) : Promise<string[]>{
    return new Promise((resolve, reject) => {
        let imageCount = 0;        
        let linkCount = 0;
        let images : string[] = [];

        try{
            const $ = cheerio.load(params.data);
            $("img").each((index, element) =>{
                imageCount++;
                const oldSrc = $(element).attr("src")
                const newSrc = oldSrc!.split('/').pop();
                images = [...images, oldSrc!];
                $(element).attr('src', newSrc!);                
            });

            $("a").each((index, element) =>{
                linkCount++;
            });

            fs.writeFileSync(params.filepath, $.html());
        }
        catch(error)
        {
            reject(error);
        }

        console.log(`num_links: ${linkCount}`);
        console.log(`images: ${imageCount}`);
        

        resolve(images);
    });
}
