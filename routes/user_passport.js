/**
 * 패스포트 라우팅 함수 정의
 *
 * @date 2016-11-10
 * @author Mike
 */


// '/' 에 심고싶을 경우
var cheerio = require('cheerio'),
    request = require('request'),
    fs = require('fs'),
    Iconv = require('iconv').Iconv;



  
module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

    // 홈 화면
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');

        console.log('req.user의 정보');
        console.dir(req.user);

        // '/' 에 심고싶을 경우
        // Show_News path
        console.log('/성공이냐');
        
        var url_11th = 'http://deal.11st.co.kr/browsing/DealAction.tmall?method=getTimeDeal#2761035320'
        , url_ssg = 'http://www.ssg.com/'
        , url_a = 'http://corners.auction.co.kr/AllKill/AllDay.aspx';
        

var a11th = new Array()
, a11th_name = new Array()
, a11th_price = new Array()
, a11th_sale = new Array()
, a11th_price_add = new Array()


, auction = new Array()
, auction_name = new Array()
, auction_price = new Array()
, auction_sale = new Array()
, auction_price_add = new Array()
, auction_price_add_01 = new Array()

, ssg = new Array()
, ssg_name = new Array()
, ssg_price = new Array()
, ssg_price_add = new Array()
, ssg_price_add_es = new Array()

, today = new Array();
        
var titles_11th = new Array(); // 한국어 패치를 위한
        
request( { url : url_11th, encoding: 'binary' } , function(error, response, html) {
    if (error) { throw error; }
    
    // iconv (+fs)를 이용해 euc-kr (dnjfmf)을 UTF8로 바꿔주는 과정
    var convertedCon = new Buffer(html, 'binary');
    iconv = new Iconv('euc-kr', 'UTF8');
    convertedCon = iconv.convert(convertedCon).toString();
    var $ = cheerio.load(convertedCon);
    
    // var $ = cheerio.load(html);
    
    // 상품 사진 - 11번가
    for (var i=0; i<3; i++) {
        $('a>div.prd_img>img').eq(i).each(function() {
            var results = $(this);
            var results_src = results.attr('src');
            
            
            // console.log(results_src);
            a11th[i] = results_src;
        })
    }
    // 상품 이름 - 11번가
    for (var i=0; i<3; i++) {
            $('div.prd_info>p.name').eq(i).each(function() {
                var results = $(this);
                var results_text = results.text();
                
                //console.log(results);
                
                a11th_name[i] = results_text;
            })
        }
    // 상품 가격 - 11번가
    for (var i=0; i<3; i++) {
        $('span.price_detail>strong').eq(i).each(function() {
            var results = $(this);
            var results_text = results.text();
            
            // 할진 전 가격 - 11번가
            var results_add = $(this).parent().eq(0);
            var results_add_text = results_add.text();
            // console.log(i + 'results_add_text');
            // console.log(results_add_text);
            var cer = results_add_text.split('원');
            // console.log(cer);
            if (cer[2]) {
                var certi = cer[0].split('가');
                a11th_price_add[i] = certi[1] + '원';
            }

            // console.log(results_text);
            a11th_price[i] = results_text;
        })
    }
    // 세일전 가격& 할인율 - 11번가
    for (var i=0; i<3; i++) {
        // 할인율
        $('div.prd_info>div.price_info>span:first-child').eq(i).each(function() {
            var results = $(this);
            var results_text = results.text();
            
            // console.log(results_text);
            a11th_sale[i] = results_text;
        })
    }
    
    
    
    
    
    //옥션
    request({ url : url_a, encoding: 'binary' }, function(error, response, html) {
        
    // iconv (+fs)를 이용해 euc-kr (dnjfmf)을 UTF8로 바꿔주는 과정
    var convertedCon = new Buffer(html, 'binary');
    iconv = new Iconv('euc-kr', 'UTF8');
    convertedCon = iconv.convert(convertedCon).toString();
    var $ = cheerio.load(convertedCon);
        
    // var $ = cheerio.load(html);
    
    // 상품 사진 - 옥션
    for (var i=0; i<3; i++) {
        $('ul>li>div>a>img').eq(i).each(function() {
            var results = $(this);
            
           // console.log('results');
           // console.log(results);
            
            var results_src = results.attr('data-original');
           
           
            
            //console.log(results_src);
            auction[i] = results_src;
        })
    }
        // 상품 이름 - 옥션
         for (var i=0; i<3; i++) {
            $('ul#ItemList >li>div>a>span.title').eq(i).each(function() {
                var results = $(this);
                var results_text = results.text();
                
                
               
                auction_name[i] = results_text;
            })
        }
        // 상품 가격 - 옥션
        for (var i=0; i<3; i++) {
            $('ul#ItemList >li>div>div>span.price>strong').eq(i).each(function() {
                var results = $(this);
                var results_text = results.text();
                
                // 원래 가격 & 추가 설명 있는 부분 긁
                var results_add = results.next(0);
                var results_add_text = results_add.text();
                
                if (results_add_text.length > 0) {
                    var cer = results_add_text.split(' ');
                    if (cer[1]) {
                        auction_price_add_01[i] = '0'
                    } else {
                        
                        auction_price_add_01[i] = '1'
                        
                    }
                } else {
                    auction_price_add_01[i] = '0'
                }
                
                auction_price_add[i] = results_add_text;
                
                //console.log(results_text);
                auction_price[i] = results_text;
            })
        }
        // 세일전 가갹& 할인율 - 옥션
        for (var i=0; i<3; i++) {
            $('ul#ItemList >li>div>div>em').eq(i).each(function() {
                var results = $(this);
                var results_text = results.text();
                
                // console.log('results');
                // console.log(results);
                // console.log('results_text');
                // console.log(results_text);
                
                var sale = 'sale';
                if (results.attr('class') == sale) {
                    var splited = results_text.split(' ');
                    auction_sale[i] = splited[0];
                } else {
                    auction_sale[i] = results_text;
                }
            })
        }
       
        
        
        
        
        
    // SSG
    request(url_ssg, function(error, response, html) {
        var $ = cheerio.load(html);
        
        // 상품 사진 - 신세계
        for (var i=0; i<3; i++) {
            $('ul>li>div>div.thmb>a>img.i1').eq(i).each(function() {
                var results = $(this);
                var results_src = results.attr('src');
                
                //console.log(results);
                ssg[i] = results_src;
            })
        }
        
        // 상품 이름 - 신세계
        for (var i=0; i<3; i++) {
            $('div.ssgmain_theme_sec>ul.cunit_thmb_lst>li div.title a').eq(i).each(function() {
                var results = $(this);
                var results_text = results.attr('data-react-tarea');
                
                //console.log(results);
                
                var splited_name = results_text.split('릭|');
                ssg_name[i] = splited_name[1];
            })
        }
        
        // 상품 가격 - 신세계
        for (var i=0; i<3; i++) {
            $('div.ssgmain_theme_sec>ul.cunit_thmb_lst>li div.opt_price em').eq(i).each(function() {
                var results = $(this);
                var results_text = results.text();
                
                // console.log(results_text);
                ssg_price[i] = results_text;
            })
            
            $('div.cunit_tp>span>i').eq(i).each(function() {
                var results = $(this);
                var results_class = results.attr('class');
                
                // console.log('results');
                // console.log(results_class);
                
                if (results_class == 'em') {
                    ssg_price_add[i] = '이마트몰'
                    ssg_price_add_es[i] = 'em' // for css
                } else {
                    ssg_price_add[i] = '신세계몰'
                    ssg_price_add_es[i] = 'sm'
                }
                
                console.log(ssg_price_add[i]);
            })
        }
        
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
        
        res.render('index.ejs', {a11th : a11th, a11th_name : a11th_name , a11th_price :                             a11th_price, a11th_sale : a11th_sale, a11th_price_add :                         a11th_price_add ,
                                 
                                 auction : auction, auction_name : auction_name, auction_price : auction_price, auction_sale : auction_sale , auction_price_add : auction_price_add , auction_price_add_01 : auction_price_add_01 , 
                                 
                                 ssg : ssg, ssg_name : ssg_name ,  ssg_price : ssg_price, ssg_price_add : ssg_price_add , ssg_price_add_es : ssg_price_add_es ,
                                 today:today});
    })
    
})       
})    

 
      /*  
request(url_a, function(error, response, html) {
    var $ = cheerio.load(html);
    
    
    for (var i=0; i<4; i++) {
        $('div>ul.item_list>li>div>a>img').eq(i).each(function() {
            var results = $(this);
            var results_src = results.attr('data-original');
            
            console.log('.,,,,,,,skgnksjgnksdn');
            console.log(results_src);
            auction[i] = results_src;
        })
    }
    
    res.render('index.ejs', {auction : auction});
 
    
    
})
*/
        /*
request(url, function(error, response, html) {
    var $ = cheerio.load(html);
    
    
    for (var i=0; i<4; i++) {
        $('ul#mainBill>li').eq(i).each(function() {
            var results = $(this);
            var results_img = results.attr('src');
            
            console.log(results_img);
            a[i] = results_img;
        })
    }
    
 

    res.render('index.ejs', {a : a});
    
})*/
        
        
    });
    
    router.route('/api/test').get(function(req, res) {
        
        
        console.log('/Func test CALLED');

        // 외식업만 보여주기
        console.log('/성공,,?');

        var url = "http://www.hi-franchise.com/sub/brand1.php?category=10&brand_month=&sch_input=&total_amt=&fran_cnt=";

        var company_name = new Array,
            store_name = new Array,
            sort = new Array,
            company_href = new Array;
        
        request(url, function(error, response, html) {
            var $ = cheerio.load(html);

   
            // 상호명
            for (var i=0; i<15; i++) {
                $('span.title').each(function() {
                    var result = $(this);
                    var result_text = result.text();
                    var result_href = result.attr('onclick');
                    
                    var splited = result_href.split('?');
                    var more = splited[1].split('=');
                    var mores = more[1].split('&');
                    
                    /* split 잘됬나 확인하는 console.log
                    console.log(splited);
                    console.log(more);
                    console.log(mores);
                    */
                    
                    company_name[i] = result_text;
                    company_href[i] = mores[0];
                    
                    i++
                
                })
            }
            
            // 영업표지
            for (var i=0; i<15; i++) {
                $('td.wide1 > span').each(function() {
                    var result = $(this);
                    var result_text = result.text();
                    
                    store_name[i] = result_text;
                    
                    i++
                })
            }
            
            // 종류
            for (var i=0; i<15; i++) {
                $('tbody > tr > td:nth-child(4)').each(function(){
                    var result = $(this);
                    var result_text = result.text();
                    
                    var splited = result_text.split('/')
                    sort[i] = splited[1];
                    
                    i++
                })
            }
            
            
            res.render('restaurant.ejs', {company : company_name, href : company_href, store : store_name, sort : sort});
    })
    });


    
    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });
	 
    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });
	 
    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('profile.ejs', {user: req.user});
            }
        }
    });
	
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });


    // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/profile', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/profile', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));

    // 패스포트 - 페이스북 인증 라우팅 
    router.route('/auth/facebook').get(passport.authenticate('facebook', { 
        scope : 'email' 
    }));

    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

};