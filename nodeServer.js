const http = require('http');
const fs = require('fs');

const port = 3000;
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('D:/Sem 3/Back End Technology Lab/Exp_2/employee.html', 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading HTML file:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading HTML file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/employeeData') {
        let requestBody = '';
        req.on('data', (chunk) => {
            requestBody += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(requestBody);
            fs.appendFile('new.txt', JSON.stringify(data) + '\n', 'utf8', (error) => {
                if (error) {
                    console.error('Error writing to file:', error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing to file');
                } else {
                    console.log('Data appended to file.');
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Data received successfully');
                }
            });
            console.log('Received employee data:', data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
