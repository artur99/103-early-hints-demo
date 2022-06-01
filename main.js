const http2 = require('http2');

const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('./certs/localhost-privkey.pem'),
    cert: fs.readFileSync('./certs/localhost-cert.pem')
}, (req, res) => {
    console.log(`Requested: ${req.url}`)

    if(req.url == '/favicon.ico') {
        console.log(`Received favicon.ico request: ${Date.now()/1000}`)
        res.writeHead(404);
        res.end()
        return
    }
    if(req.url == '/main.css') {
        console.log(`Received main.css request: ${Date.now()/1000}`)
        // console.log(req.headers)
        let content = 'html{background: red} /* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  */'
        res.writeHead(200, {
            'content-type': 'text/css',
            'Cache-Control': 'public, max-age=3600',
            'expires': 'Wed, 02 Jun 2022 10:06:20 GMT',
            'last-modified': 'Tue, 01 Sep 2015 22:51:45 GMT',
            'content-length': content.length,
        });
        setTimeout(_ => res.end(content), 50)
        return
    }

    console.log(`Received / request: ${Date.now()/1000}`)


    res.stream.additionalHeaders({
        ':status': '103',
        // 'Link': '</main.css>; rel=preload; as=style',
        // 'Link': '<main.css>; rel="preload"; as="style"',
    });



    res.writeHead(200, {
        'content-type': 'text/html',
        // 'Link': '<https:///main.css>; rel="preload"; as="style"',
        // 'Link': '</main.css>; rel=preload; as=style',
    });

    res.flushHeaders()


    setTimeout(() => {


        res.end(`<!DOCTYPE html>
        <!--<link rel="preload" href="main.css" as="style">-->
        <h1>Hello World</h1>
        <link rel="stylesheet" href="main.css" as="style">
        `);
    }, 5000)

});

// server.on('error', (err) => console.error(err));
//
// server.on('stream', (stream, headers) => {
//
//     stream.respond({
//         'content-type': 'text/html; charset=utf-8',
//         ':status': 200
//     });
//     stream.end('<h1>Hello World</h1>');
// });

server.listen(8443);
