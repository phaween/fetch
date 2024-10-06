export function isValidUrl(urlString : string)
{
    try{
        const url = new URL(urlString);
        return true;
    }
    catch{
        return false;
    }
}