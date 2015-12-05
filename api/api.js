var http = require('http'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    parseString = require('xml2js').parseString,
    fs = require('fs'),
    cheerio = require('cheerio');

var key = 'onEnPNZI';
var md5sum = crypto.createHash('md5');

md5sum.update(key + 'hpflavnzo777');

var post_data = querystring.stringify({
	login : 'VKuser52323961',
	hash : key + md5sum.digest('hex'),
  xml : '<?xml version="1.0" encoding="UTF-8"?><request action="get-library" type="object-type" />'
});

var options = {
	host : 'api.russia.travel',
	method : 'POST' ,
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded',
		'Content-Length' : Buffer.byteLength(post_data)
  }
};

var request =  http.request(options, function (res){

  var rawXml = '';

  res.on('data', function (chunk){
    rawXml += chunk.toString();
  });

  res.on('end', function(){
    var $ = cheerio.load(rawXml);

    var names = [];

    $('item').each(function (i, el){
      names.push($(this).attr('name'));
    });

    var file = fs.createWriteStream('names.txt', {
      defaultEncoding : 'utf8'
    });

    var string = '';

    for(var i = 0; i < names.length; i++){
      string += names[i] + '\n';
    }

    file.write(string);
    file.end();

  });

  res.on('err', function (err){
    console.log(err);
  });

})

request.write(post_data);
request.end();
