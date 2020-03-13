// BoardExample user_passport.js 참조
var cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs'),
    Iconv = require('iconv').Iconv;


/*
var test = function(req, res) {
    console.log('/Func test CALLED');
    
    // 외식업만 보여주기
    console.log('/성공,,?');
    
    var url = "http://www.hi-franchise.com/sub/brand1.php?category=10&brand_month=&sch_input=&total_amt=&fran_cnt=";
    var titles = new Array();
    
    reqeust(url, function(error, response, html) {
        var $ = cheerio.load(html);
        
        for (var i=1;i<10;i++) {
            $('tbody > tr > td[1]').each(function() {
                var result = $(this);
                var result_text = result.text();
                
                titles[i] = result_text;
                
                i++
            })
        }
        
        res.render('test.ejs', {test:titles});
    })
}



module.exports.text = test;
*/