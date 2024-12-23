//（start）計算する前の初期状態
//（number）前の文字が１から９の数字の状態
//（zero）前の文字が０か００の状態
//（reset）前の文字が０かつその前の文字が演算子のときの状態
//（point）前の文字が.の状態
//（operator）前の文字が演算子の状態
//（finish）＝を押して計算が終わった状態
let state = 'start';

//（inputMode）整数入力モード
//（decimalMode）.を押して演算子を押すまでの入力モード
let mode = 'inputMode';

//計算式を一時格納する場所
let tmp;

//input フィールドに入力された計算式を取得する
let formula;


//0を押したときの処理
function zero(num){
    if(state === 'start' || state === 'finish' || state === 'reset') {
        return;
    }
    else if(state === 'number' || state === 'zero' || state === 'point') {
        document.querySelector('input').value += num;
        state = 'zero';
    }
    else if(state === 'operator') {
        document.querySelector('input').value += num;
        state = 'reset';
    }
}

//00を押したときの処理
function doubleZero(num){
    if(state === 'start' || state === 'finish' || state === 'operator' || state === 'reset') {
        return;
    }
    else if(state === 'number' || state === 'zero' || state === 'point') {
        document.querySelector('input').value += num;
        state = 'zero';
    }
}

//.を押したときの処理
function point(num) {  
    if(mode === 'decimalMode'){
        return;
    }
    else if((state === 'start' || state === 'number' || state === 'zero' || state === 'reset') && mode === 'inputMode') {
        document.querySelector('input').value += num;
        mode = 'decimalMode';
        state = 'point';
    }
    else if(state === 'operator') {
        document.querySelector('input').value += 0 + num;
        mode = 'decimalMode';
        state = 'point';
    }
}

//１から9の数字を押したときの処理
function symbol(num) {  
    if(state === 'start' || state === 'finish') {
        document.querySelector('input').value = num;
    }
    else if(state === 'number' || state === 'operator' || state === 'zero' || state === 'point') {
        document.querySelector('input').value += num;
    }
    //演算子を押したあとの0を数字で上書きする処理
    else if(state === 'reset') {
        tmp = document.querySelector('input').value;
        document.querySelector('input').value = tmp.slice(0, tmp.length -1) + num;
    }
    state = 'number';
}

//演算子を押したときの処理
function operator(num) {  
    if(state === 'start' && (num === '*' || num === '/' || num === '+')) {
        document.querySelector('input').value += num;
    }
    //マイナスを数字の前につけるための処理
    else if(state === 'start' && num === '-') {
        document.querySelector('input').value = num;

    }
    //演算子のあとにマイナスをつけるための処理
    else if (state === 'operator' && num === '-') {
        // 現在の入力がマイナスで終わっていない場合のみマイナスを追加
        if (tmp.slice(-1) !== '-') {
            document.querySelector('input').value += num;
        }
    }

    //演算子のあとに演算子が来た場合上書きする
    else if(state === 'operator') {
        tmp = document.querySelector('input').value;
        document.querySelector('input').value = tmp.slice(0, tmp.length -1) + num;
    }
    
    else if(state === 'number' || state === 'zero' || state === 'finish' || state === 'point' || state === 'reset') {
        document.querySelector('input').value += num;
    }
    mode = 'inputMode';
    state = 'operator';
    tmp = document.querySelector('input').value;
}

//計算をすべて初期状態に戻す
function erase(num) {
    document.querySelector('input').value = num;
    mode = 'inputMode';
    state = 'start';    
}

//計算結果を出す
function calculation() {
    let formula = document.querySelector('input').value;
    //計算式を関数として処理させる
    let total = new Function('return ' + formula);

    //計算結果を文字列としてeraseに返す
    erase(total().toString());
    
    mode = 'inputMode';
    state = 'finish';
}