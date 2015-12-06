var http = require('http'),
    querystring = require('querystring'),
    crypto = require('crypto'),
    parseString = require('xml2js').parseString,
    fs = require('fs'),
    cheerio = require('cheerio');

var key = 'onEnPNZI';
var md5sum = crypto.createHash('md5');

md5sum.update(key + 'hpflavnzo777');

var post_data = {
	login : 'VKuser52323961',
	hash : key + md5sum.digest('hex')
};

var options = {
	host : 'api.russia.travel',
	method : 'POST' ,
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded'
  }
};

function API (){
  this.getObjectsInRadius = function (coords, fn){
    fs.readFile('./radius.xml', function (err, rawXml){
      if(err) return console.log(err);
      var $ = cheerio.load(rawXml);
      $('point').text(coords.join(','));
      $('point').attr('radius', 15);

      var xml = $.xml();

      post_data.xml = xml;

      var post_stringified = querystring.stringify(post_data);
      options.headers["Content-Length"] = Buffer.byteLength(post_stringified);

      var request = http.request(options, function (res){
        var response = '';

        res.on('data', function (chunk){
          response += chunk.toString();
        });

        res.on('end', function (){
          console.log(response)
          var $ = cheerio.load(response);

          var places = {};

          $('item').each(function (i, el){
            if(i > 10) return;
            obj = $(el);

            var cdata = obj.find('name text').contents()["0"].data;

            places[obj.attr('id')] = {
              coordinates : obj.attr('geo'),
              name : cdata.match(/\[CDATA\[(.+)\]\]/)[1],
              photo_url : obj.attr('image')
            }
          });

          fn(null, places);
        })
      });

      request.write(post_stringified);
      request.end();
    });
  }
}

module.exports = new API();
