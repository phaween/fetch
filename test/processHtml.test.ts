import { processHtml } from "../src/lib/processHtml";

const fs = jest.createMockFromModule("fs");
const spyConsoleLog = jest.spyOn(global.console, "log").mockImplementation();


test.each([
    ["<HTML></HTML>", "num_links: 0", "images: 0", []],
    ["<HTML><a href='somelink'>test</a></HTML>", "num_links: 1", "images: 0", []],
    ["<HTML><img src='someimage'></HTML>", "num_links: 0", "images: 1", ['someimage']],
    ["<HTML><a href='somelink'><img src='someimage'></a></HTML>", "num_links: 1", "images: 1", ['someimage']]
])('image count test', async (dataString, numlinks, images, array) => {
    const data = Buffer.from(dataString);
    const filepath = "fu.html"

    expect(processHtml({data, filepath})).resolves.toStrictEqual(array);
    expect(spyConsoleLog).toHaveBeenCalledWith(numlinks);
    expect(spyConsoleLog).toHaveBeenCalledWith(images);
});