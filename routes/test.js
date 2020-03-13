var cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs'),
    Iconv = require('iconv').Iconv;

console.log('/성공이냐');
        
        var url = 'https://franchise.ftc.go.kr/user/extra/main/62/firMst/list/jsp/LayOutPage.do';
        
        var url2 = 'https://franchise.ftc.go.kr/main/subIndex/22.do';

var store_name = new Array(),
    company_name = new Array(),
    company_href = new Array(),
    today = new Array();
        
        
request(url, function(error, response, html) {
    var $ = cheerio.load(html);
    
    // 회사 항목 가져오기
    for (var i=1;i<21;i++) {
        $('td a.hover-link').each(function() {
            var result = $(this);
            var result_text = result.text();
            var result_href = result.attr('href');
            
            if(i%2 == 1) {
                var m = (i-1)/2
                company_name[m] = result_text;
                company_href[m] = result_href;
            } else {
                var n = (i-2)/2
                store_name[n] = result_text;
            }
            i++
        })
    }
    
    // 사이드바에 넣을 업종별 가맹본부·가맹점 수 추이
    
    // 업데이트 날짜
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; // January is 0!
    var yyyy = date.getFullYear();

    if (dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today[0] = yyyy;
    today[1] = mm;
    today[2] = dd;

 
    for(var i=1;i<21;i++) {
        console.log(store_name[i]);
    }
    
})