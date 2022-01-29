const fsPromises = require("fs/promises");
const fs = require("fs");
const http = require("http");
const path = require("path");
// const pathToUrl = require('path-to-url');

function pathToUrl(p) {
    return path.relative(__dirname, p).split(path.sep).join("/");
}

function returnHtml(response, body) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end(`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>NodeJs</title>
			</head>
			<body>
				${body}
			</body>
		</html>
	`);
}

const server = http.createServer(async (req, res) => {

    const dir = path.resolve(__dirname, req.url);
    const file = await fsPromises.stat(dir);

    if (file.isDirectory()) {
        const elements = await fsPromises.readdir(dir);

        let body = "<ul>";

        if (dir !== __dirname) {
            body += `<li><a href="/${pathToUrl(path.resolve(dir, ".."))}">..</a></li>`;
        }

        for (let element of elements) {
            body += `<li><a href="/${pathToUrl(path.resolve(dir, element))}">${element}</a></li>`;
        }

        body += "</ul>";

        returnHtml(res, body);

    } else if (file.isFile()) {
        res.setHeader("Content-Type", "application/octet-stream");
        fs.createReadStream(element).pipe(res);
    }
});

server.listen(5555);
