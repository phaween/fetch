import http from 'http';
import https from "https";
import axios from 'axios';
import * as fs from "fs";

export interface HttpResponse {
  data: string;
  status?: number;
  statusMessage?: string;
}

export async function requestHtml(urlString : string) : Promise<HttpResponse> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const protocol = url.protocol === 'https' ? https : http;
    const request = protocol.request({
      hostname: url.hostname,
      port: url.port.length > 0 ? url.port : url.protocol === 'https' ? 443 : 80,
      path: url.pathname,
      search: url.search,
      method: 'GET'
    }, result => {
      let html = ''
     
      result.on('data', dataBuffer => {
        const partialHTML = dataBuffer.toString()
        html += partialHTML
      })
     
      result.on('end', () => {
        if(result.statusCode && result.statusCode === 200)
        {
          const response: HttpResponse = {
            data: html,
            status: result.statusCode,
            statusMessage: result.statusMessage
          };
          
          resolve(response);
        }
        else{
          reject(new Error(result.statusCode?.toString()));
        }
      })
    })
     
    request.on('error', error => {
      reject(new Error(`Request Error: ${error}`));
    })
     
    request.end()
  });
}

export async function downloadHtml(urlString : string) : Promise<Buffer>
{
  return new Promise((resolve, reject) => 
  {
    axios.get(urlString, { responseType: 'arraybuffer' }).then((response) =>
    {
      const fileData = Buffer.from(response.data, 'utf8');
      resolve(fileData);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
      } else {
        console.error(error);
      }
      reject(error);
    });
  });
}

export async function downloadImage(urlString : string) : Promise<Buffer>
{
  return new Promise((resolve, reject) => 
  {
    axios.get(urlString, { responseType: 'arraybuffer' }).then((response) =>
    {
      const fileData = Buffer.from(response.data, 'binary');
      resolve(fileData);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
      } else {
        console.error(error);
      }
      reject(error);
    });
  });
}