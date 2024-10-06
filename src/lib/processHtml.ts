import * as cheerio from "cheerio";
import { Console } from "console";
import * as fs from "fs";

export async function processHtml(buffer : Buffer, filepath : string) : Promise<string[]>{
    return new Promise((resolve, reject) => {
        let imageCount = 0;        
        let linkCount = 0;
        let images : string[] = [];

        try{
            const $ = cheerio.load(buffer);
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

            fs.writeFileSync(filepath, $.html());
        }
        catch(error)
        {
            console.log(error);
        }

        console.log(`num_links: ${linkCount}`);
        console.log(`images: ${imageCount}`);
        

        resolve(images);
    });
}
