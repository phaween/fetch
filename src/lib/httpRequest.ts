import axios from 'axios';

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