let c1 = document.querySelector('#can1').getContext('2d');
let c2 = document.querySelector('#can2').getContext('2d');

c1.font = 'bold 24px NanumGothic';
c1.fillText('방문자 현황', 12, 30);

c2.font = 'bold 24px NanumGothic';
c2.fillText('강좌 신청 현황', 12, 30);

fetch('./summer.json').then((res)=>{
    return res.json();
}).then((data)=>{
    let counts = [];
    for(c of data.CLASS){
        let temp = [];
        $.grep(data.LIST, function(l){
            if(l.CODE == c.CODE){
                temp.push(l.CODE);
            };
        });
        if(temp.length > 0){
            let summ = {
                'title':c.TITLE,
                'apply':temp.length
            };

            counts.push(summ);
        }
    };

    // for(i = 0; i < counts.length; i++){
    //     c
    // }

    function c2set(){
        c2.beginPath();
        c2.moveTo(50, 60);
        c2.lineTo(50, 260);
        c2.stroke();
        c2.closePath();

        c2.beginPath();
        c2.moveTo(50, 260);
        c2.lineTo(980, 260);
        c2.stroke();
        c2.closePath();

        c2.font = '16px NanumGothic';
        c2.textAlign = 'right';
        // c2.fillText('10', 35, 67);
        let k = 0;
        for(i = 10; i >= 0; i = i-2){
            c2.fillText(i, 35, 66 + 40*k);
            k++;
        };

        c2.font = '14px NanumGothic';
        c2.textAlign = 'center';
        // c2.fillText('주말헬스', 100, 280);
        for(i = 0; i < counts.length; i++){
            // console.log(counts[i].title);
            c2.fillText(counts[i].title.slice(0, 4), 80 + 72*i, 280);
        }
    };
    
    c2set();

    for(i = 0; i < counts.length; i++){
        // console.log(counts[i].apply);
        c2.fillStyle = 'blue';
        let h = counts[i].apply * 20;
        c2.fillRect(70 + 72*i, 260 - h, 20, h);
        c2.font = 'bold 12px NanumGothic';
        c2.fillStyle = 'black';
        c2.fillText(counts[i].apply, 80 + 72*i, 250 - h);
    }
});


c1.beginPath();
c1.moveTo(50, 60);
c1.lineTo(50, 260);
c1.stroke();
c1.closePath();

c1.beginPath();
c1.moveTo(50, 260);
c1.lineTo(980, 260);
c1.stroke();
c1.closePath();

for(i = 0; i < 6; i++){
    c1.textAlign = 'right';
    c1.font = '16px NanumGothic';
    c1.fillText(50 - 10*i, 35, 66 + 40*i);
}

let dates = ['2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05', '2023-08-06', '2023-08-07', '2023-08-08', '2023-08-09', 'TODAY'];
for(i = 0; i < dates.length; i++){
    c1.fillStyle = 'black'
    c1.textAlign = 'center';
    if(i != 9){
        c1.font = '14px NanumGothic';
        c1.fillText(dates[i], 96.5 + 93*i, 280);
    }else{
        c1.font = 'bold 16px NanumGothic';
        c1.fillStyle = 'orangered';
        c1.fillText(dates[i], 96.5 + 93*i, 280);
    }

    // let ranN = Math.floor(Math.random() * 50);

    // line(ranN);
    // circle(ranN, i);
}

function circle(randomNum){
    for(i = 0; i < dates.length; i++){
        c1.fillStyle = 'orangered';
        c1.beginPath();
        c1.arc(96.5 + 93*i, 260 - randomNum[i]*4, 5, 0, 3.14*2, 0);
        c1.fill();
        c1.closePath();
    };

    let high = Math.max(...randomNum);
    let index = randomNum.indexOf(high);
    console.log(high);
    console.log(index);
    c1.font = 'bold 14px NanumGothic';
    c1.fillText(`${high}명`, 96.5 + 93*index, 245 - high*4);
};

function line(){
    let temp = [];
    for(i = 0; i < dates.length; i++){
        let randomNum = Math.floor(Math.random() * 45 + 5);
        temp.push(randomNum);
        if(i == 0){
            c1.beginPath();
            c1.strokeStyle = 'orangered';
            c1.moveTo(96.5 + 93*i, 260 - randomNum*4);
        }else{
            c1.lineTo(96.5 + 93*i, 260 - randomNum*4);
        }
    }
    c1.lineWidth = 2;
    c1.stroke();
    c1.closePath();

    circle(temp);
    linefill(temp);
};

function linefill(random){
    c1.beginPath();
    c1.moveTo(96.5, 260);
    c1.strokeStyle = 'transparent';
    c1.fillStyle = 'rgba(255, 68, 0, 0.3)';
    for(i = 0; i < dates.length; i++){
        c1.lineTo(96.5 + 93*i, 260 - random[i]*4);
    };
    c1.lineTo(933.5, 260);
    c1.fill();
    c1.closePath();
}

line();