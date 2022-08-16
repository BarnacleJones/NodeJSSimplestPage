//server that actively listens for requests made

//require the core http module that enables server to be made
const http = require('http');
const fs = require('fs')

//store the instance of the server in 'server' and creat the server
//takes in a callback function, any every request to the server the callback is invoked
//get access to two objects - request (req) and response (res)
const server = http.createServer((req, res) => {
  //req comes with lot of information included

  console.log(req.url, req.method)
    //rsp is what we use to respond
    //set header content type
    res.setHeader('Content-Type', 'text/html');


    //routing the various paths
    let path = './views/';

    switch (req.url) {
      case '/':
        path += 'index.html';
        res.statusCode = 200;
        break;
      case '/index.html':
        path += 'index.html';
        res.statusCode = 200;
        break;
      case '/about.html':
        path += 'about.html';
        res.statusCode = 200;
        break;
        //redirect case
      case '/about-me':       
        res.statusCode = 301; //redirect code
        res.setHeader("Location", '/about'); //tell browser what location to go
        break;
      case '/contact.html':
        path += 'contact.html';
        res.statusCode = 200;
        break;
      default:
        path += '404.html';
        //tell the browser the status code
        res.statusCode = 404;
        break;
    }
  
    //send an html file
    fs.readFile(path, (err, data)=>{
      if(err){
        console.log(err);
        res.end();
      }
      else{
        // res.write(data)
        //end the response - if only one page youre sending you can put it as a parameter in the .end function
        
        res.end(data);
      }
    })
    
});

//have to invoke listen method to make the server listen for responses
//takes a callback which is run when server starts listening
//takes the port and host as arguments
server.listen(3001, 'localhost', ()=>{
  console.log('listening for requests on port 3001')
})