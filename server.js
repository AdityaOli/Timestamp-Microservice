const express = require("express");
const app = express();
var path = require("path");
var moment = require('moment');
moment().format();

app.get("/", (request, response) =>
{
   response.sendFile(path.join(__dirname+'/views/index.html'));
});

app.get('/:query', function(request, response) 
{
        var date = request.params.query;
        var unix = null;
        var natural = null;
        
        if (+date >= 0) 
        {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) 
        {
            unix = +natToUnix(date);
            natural = unixToNat(unix);
        }
        
        var dateObj = { "unix": unix, "natural": natural };
        response.send(dateObj);
        
});
    
function natToUnix(date) 
{
    return moment(date, "MMMM D, YYYY").format("X");
}
   
function unixToNat(unix) 
{
    return moment.unix(unix).format("MMMM D, YYYY");
}

app.listen(3000, () => 
{
  console.log("Node application is listening on port 3000!");
})