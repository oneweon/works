/// <reference path="./jquery.d.ts" />

fetch('./summer.json').then((res)=>{
    return res.json();
}).then((data)=>{
    function classlist(find = null, word = null){
        if(word == null){
            $('.list dd').remove();
            for(C of data.CLASS){
                // console.log(c);
                let result = $.grep(data.TEACHER, function(t){
                    return t.NO == C.TEACHERNO; 
                })[0];
    
                let tname = result.TNAME;
    
                let str = `<dd><p>${C.CODE}</p><p>${C.TITLE}</p><p>${C.DATE}</p><p>${C.PERIOD}개월</p><p>₩${C.PRICE}</p><p>${tname}</p><p>${C.LIMIT}</p></dd>`
    
                $(str).appendTo($('.list'));
            };
        }else{
            $('.list dd').remove();
            for(C of data.CLASS){
                let result = $.grep(data.TEACHER, function(t){
                    return t.NO == C.TEACHERNO;
                })[0];

                let tname = result.TNAME;

                if(find != 'TEACHERNO'){
                    if(C[find].includes(word)){
                        let str = `<dd><p>${C.CODE}</p><p>${C.TITLE}</p><p>${C.DATE}</p><p>${C.PERIOD}개월</p><p>₩${C.PRICE}</p><p>${tname}</p><p>${C.LIMIT}</p></dd>`
            
                        $('.list').append(str);
                    }
                }else{
                    if(tname.includes(word)){
                        let str = `<dd><p>${C.CODE}</p><p>${C.TITLE}</p><p>${C.DATE}</p><p>${C.PERIOD}개월</p><p>₩${C.PRICE}</p><p>${tname}</p><p>${C.LIMIT}</p></dd>`
            
                        $('.list').append(str);
                    }
                }   
            }
        }
    };
    classlist();

    function homelist(){
        for(c of data.CLASS.slice(0, 4)){
            let cnt = 0;
            $.grep(data.LIST, function(l){
                if(l.CODE == c.CODE){
                    cnt++;
                };
            });

            let str = `<dd><p>${c.TITLE}</p><p>${c.DATE}</p><p>${cnt}&#47;${c.LIMIT}</p></dd>`

            $(str).appendTo($('.classSum'));
        }

        for(m of data.MEMBER.slice(0,4)){
            let str = `<dd><p>${m.MEMBER}</p><p>${m.TNAME}</p><p>${m.TPHONE}</p></dd>`;
            $(str).appendTo($('.memberSum'));
        }
    }
    homelist();

    function teacherlist(){
        for(t of data.TEACHER){
            let opt = `<option value="${t.TNAME}">${t.TNAME}</option>`;
            $('#Nteacher').append(opt);
        }
    }
    teacherlist();

    $('.CNsave').on('click', ()=>{
        let title = $('#Ntitle').val();
        let date = $('#Ndate').val();
        let period = $('#Nperiod').val();
        let price = $('#Nprice').val();
        let teacher = $('#Nteacher').val();
        let limit = $('#Nlimit').val();

        if(!title || !date || !period || !price || !teacher || !limit){
            alert("모든 정보를 입력해주세요.");
        }else if(isNaN(price)){
            alert("수강료는 숫자만 입력해주세요.")
        }else if(isNaN(limit)){
            alert("정원은 숫자만 입력해주세요.")
        }else{
            let lastNum = $('.list dd:last-child p:nth-child(1)').text();
            if(lastNum.slice(1,2) == '0'){
                lastNum = Number(lastNum.slice(2,4));

                let str = `<dd><p>D0${lastNum+1}</p><p>${title}</p><p>${date}</p><p>${period}</p><p>${price}</p><p>${teacher}</p><p>${limit}</p></dd>`

                $('.list').append(str);
            }else{
                lastNum = Number(lastNum.slice(1,4));
                
                let str = `<dd><p>D${lastNum+1}</p><p>${title}</p><p>${date}</p><p>${period}</p><p>${price}</p><p>${teacher}</p><p>${limit}</p></dd>`
                $('.list').append(str);
            }
        }
    })

    $('#searchbtn').on('click', ()=>{
        let find = $('#find').val();
        let word = $('#word').val();

        classlist(find, word);
    })
});

$('aside li').on('click', function(){
    $('aside li').removeClass('on');
    $(this).addClass('on');

    $('.page').hide();
    $('.page').eq($(this).index()).show();
})