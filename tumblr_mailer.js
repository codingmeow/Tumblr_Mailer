var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

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

friendList = csvParse(csvFile);

friendList.forEach(function(row){

    var firstName = row["firstName"];
    var numMonthsSinceContact = row["numMonthsSinceContact"];

    // we make a copy of the emailTemplate variable to a new variable to ensure
       // we don't edit the original template text since we'll need to us it for 
       // multiple emails

    var templateCopy = emailTemplate;

    // use .replace to replace FIRST_NAME and NUM_MONTHS_SINCE_CONTACT with firstName and  monthsSinceLastContact  
    templateCopy = templateCopy.replace(/FIRST_NAME/gi,
    firstName).replace(/NUM_MONTHS_SINCE_CONTACT/gi, numMonthsSinceContact);

    console.log(templateCopy);


});