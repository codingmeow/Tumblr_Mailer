var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

var latestPosts = [];


function csvParse(csvFile){
    var arrayOfObjects = [];
    var arr = csvFile.split("\n");
    var newObj;

    keys = arr.shift().split(",");

    arr.forEach(function(contact){
        contact = contact.split(",");
        newObj = {};

        for(var i =0; i < contact.length; i++){
            newObj[keys[i]] = contact[i];
        }

        arrayOfObjects.push(newObj);

    });

    return arrayOfObjects;
}

var friendList = csvParse(csvFile);
console.log(friendList);

friendList.forEach(function(row){
    var firstName = row["firstName"];
    var numMonthsSinceContact = row["numMonthsSinceContact"];
    var customizedTemplate = ejs.render(emailTemplate, {
        firstName: firstName,
        numMonthsSinceContact: numMonthsSinceContact,
        latestPosts: latestPosts
    });

    var templateCopy = emailTemplate;

    // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
    templateCopy = templateCopy.replace(/firstName/gi,
    firstName).replace(/numMonthsSinceContact/gi, numMonthsSinceContact);

var client = tumblr.createClient({
  consumer_key: 'xxxxx',
  consumer_secret: 'xxxxx',
  token: 'xxxxx',
  token_secret: 'xxxxx'
});


});
client.posts('codingmeow.tumblr.com', function(err, blog){
  var currentTime = new Date().getTime();
  var blogTime = new Date(posts.date).getTime();
  var timeDiff = Math.abs(currentTime - blogTime)/24/60/60/1000;
  blog.posts.forEach(function(post){
    if (timeDiff <= 7) {
        latestPosts.push(post);
    }
    });
});