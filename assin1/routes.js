const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    if(url == '/')
    {
        res.write('<html>');
        res.write('<head><title>Hello Home Page</title></head>');
        res.write('<body>');
        res.write('<div>Create User</div>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('<html>');
        
        return res.end();


    }
    if(url == '/create-user' && method === 'POST')
    {
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        }); 
        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
         
            console.log(message);
            res.statusCode =302;
            res.setHeader('Location','/');
            return res.end();
        });
        
    }

    if(url == '/users')
    {
        res.write('<html>');
        res.write('<head><title>User</title></head>');
        res.write('<body>');
        res.write('<ul><li> User 1</li></ul>');
        res.write('</body>');
        res.write('</html>');

        return res.end();
        
    }


};

module.exports = {
    handler : requestHandler,
    someText: 'Routes functions'
}