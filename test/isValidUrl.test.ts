import { isValidUrl } from "../src/lib/isValidUrl";

test.each([
    {url: 'www.google.com',expected: false},
    {url: 'blabla', expected: false},
    {url: 'https://autify.com', expected: true},
    {url: 'https://autify.com/img.jpg', expected: true}
  ])('given invalid and valid url return false/true', ({url, expected}) => {
    expect(isValidUrl(url)).toBe(expected);
  });