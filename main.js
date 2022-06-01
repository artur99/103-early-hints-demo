const http2 = require('http2');
const fs = require('fs');

const main_css_content = `
    html {
        background: red
    }
    /* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  *//* alksjdlkajsdlkasjdlaksjd laksjd laskjd alskjd laksj dalksjd  */
`
const index_html_content = `
    <!DOCTYPE html>
    <!--<link rel="preload" href="main.css" as="style">-->
    <h1>Hello World</h1>
    <link rel="stylesheet" href="main.css" as="style">
`




const server = http2.createSecureServer({
    key: fs.readFileSync('./certs/localhost-privkey.pem'),
    cert: fs.readFileSync('./certs/localhost-cert.pem')
}, (req, res) => {
    // console.log(`Requested: ${req.url}`)

    if(req.url == '/favicon.ico') {
        console.log(`Received favicon.ico request: ${Date.now()/1000}`)
        res.writeHead(404);
        return res.end()
    }

    if(req.url == '/main.css') {
        console.log(`Received main.css request: ${Date.now()/1000}`)
        // console.log(req.headers)


        res.writeHead(200, {
            'Content-Type': 'text/css',
            'Cache-Control': 'public, max-age=3600',
            'content-length': main_css_content.length,
        });
        setTimeout(_ => res.end(main_css_content), 50)
        return
    }

    console.log(`Received / request: ${Date.now()/1000}`)


    res.stream.additionalHeaders({
        ':status': '103',
        'Link': '</main.css>; rel=preload; as=style',
    });


    res.writeHead(200, {
        'content-type': 'text/html',
        // 'Link': '</main.css>; rel=preload; as=style',
    });
    res.flushHeaders()

    setTimeout(_ => res.end(index_html_content), 3000)

});

// server.on('error', (err) => console.error(err));

server.listen(8443);
