export function getLocalFilename(urlstring : string) : string
{
    const url = new URL(urlstring);
    const filename = url.hostname + '.html'
    return filename;
}