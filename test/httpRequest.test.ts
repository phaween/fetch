import { downloadHtml, downloadImage } from "../src/lib/httpRequest";
import nock from 'nock'

test.each([
    [400],
    [401],
    [403],
    [404],
    [500],
]
)('downloadHtml Test error code scenario', async (reply) => {
    nock('http://www.dummy.com')
        .get('/accounts')
        .reply(reply);
        try {
            await downloadHtml('http://www.dummy.com/accounts')
        } catch (error) {
            expect(1);
        }
});

test('downloadHtml test valid response code scario', async() => {
    nock('http://www.dummy.com')
    .get('/accounts')
    .reply(200);
    try {
        await downloadHtml('http://http://www.dummy.com/accounts')
        expect(1);
    } catch (error) {
        
    }
});

test.each([
    [400],
    [401],
    [403],
    [404],
    [500],
]
)('downloadImage Test error code scenario', async (reply) => {
    nock('http://www.dummy.com')
        .get('/accounts')
        .reply(reply);
        try {
            await downloadImage('http://www.dummy.com/accounts')
        } catch (error) {
            expect(1);
        }
});

test('downloadImage test valid response code scario', async() => {
    nock('http://www.dummy.com')
    .get('/accounts')
    .reply(200);
    try {
        await downloadImage('http://http://www.dummy.com/accounts')
        expect(1);
    } catch (error) {
        
    }
});