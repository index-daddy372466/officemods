// variables
let btns = document.querySelectorAll('.btn'),
    display = document.querySelector('.display-actual'),
    calculator = document.querySelector('.cal-actual'),
    colors = document.querySelectorAll('.color-card'),
    silver = document.querySelector('.silver'),
    url = '/module/calculator/equal',
    del = '/module/calculator/history/delete',
    hisDisplay = {
        res:document.querySelector('.hisDisplay-text-res'),
        equation:document.querySelector('.hisDisplay-text-equation')
    },
    clearBtn = document.querySelector('.clr'),
    indicators = document.querySelectorAll('#indicator-container>span'),
    combo = []
//_______________________________________

// helper functions:
// 1) Hide Arrow Indicators
const hideIndicators = (indArr) => {
    indArr[0].classList.add('indicator-off')
    indArr[1].classList.add('indicator-off')
    indArr[0].classList.remove('indicator-on')
    indArr[1].classList.remove('indicator-on')
    indArr[0].parentElement.classList.add('no-white')
    indArr[0].parentElement.classList.remove('yes-white')

}
// 2) Show Arrow Indicators
const enableIndicators = (indArr) => {
    indArr[0].classList.remove('indicator-off')
    indArr[1].classList.remove('indicator-off')
    indArr[0].classList.add('indicator-on')
    indArr[1].classList.add('indicator-on')
    indArr[0].parentElement.classList.add('no-white')

}
// 3) Toggle Arrow Right
const toggleRightArrow = (indArr) => {
    indArr[0].classList.add('indicator-off')
    indArr[1].classList.add('indicator-off')
    indArr[0].classList.remove('indicator-on')
    indArr[1].classList.remove('indicator-on')
    setTimeout(()=>{
        indArr[0].classList.remove('indicator-on')
        indArr[1].classList.add('indicator-on')
        indArr[0].classList.add('indicator-off')
        indArr[1].classList.remove('indicator-off')
    },150)
}
// 4) ToggleArrow Left
const toggleLeftArrow = (indArr) => {
    indArr[0].classList.add('indicator-off')
    indArr[1].classList.add('indicator-off')
    indArr[0].classList.remove('indicator-on')
    indArr[1].classList.remove('indicator-on')

    setTimeout(()=>{
        indArr[0].classList.add('indicator-on')
        indArr[1].classList.remove('indicator-on')
        indArr[0].classList.remove('indicator-off')
        indArr[1].classList.add('indicator-off')
    },150)
    
}
// 5) History Container - Blinking effect on <h3> elements
const blink = (element,time) => {
    element.classList.add('blink')
    setTimeout(()=>{
        element.classList.remove('blink')
    },time)
    
}
// 6) Hide History Container
const hideHistory = (display) => {
    display.res.classList.add('dis-hidden')
    display.equation.classList.add('dis-hidden')
    display.res.classList.remove('dis-show')
    display.equation.classList.remove('dis-show')
}
// 7) Show History Container
const showHistory = (display) => {
    display.res.classList.remove('dis-hidden')
    display.equation.classList.remove('dis-hidden')
    display.res.classList.add('dis-show')
    display.equation.classList.add('dis-show')
}
// 8) History is Cleared
function stop(){
    let indArr = [...indicators]
    clearBtn.onclick=()=>{
        display.value = ''
        hisDisplay.res.textContent=''
        hisDisplay.equation.textContent=''
        fetch(del)
        getData(url)
        hideIndicators(indArr)
    }
}
stop()
// 9) Handle History via GET Request
const handleHistory = (arr) => {
    let indArr = [...indicators]
    const approvedKeys = ['ArrowRight','ArrowLeft']
    let currentPos = 0;
    window.onkeydown = e => {  
        if(approvedKeys.includes(e.key) && arr.length>1){
            enableIndicators(indArr)
            if((approvedKeys[0])==(e.key)&&currentPos > 0){
                toggleRightArrow(indArr)
                hideHistory(hisDisplay)
                currentPos--
                // console.log(currentPos)
                return [...arr].forEach((el,index)=>{
                    if(index==currentPos){
                        const object = {res:el.res,equation:el.equation}
                        hisDisplay.res.textContent = object.res
                        hisDisplay.equation.textContent = object.equation
                        const hisArr = [hisDisplay.equation,hisDisplay.res]
                        // console.log(el)
                        for(let x = 0; x < hisArr.length; x++){
                            setTimeout(()=>{
                                hisArr[x].classList.remove('dis-hidden')
                                hisArr[x].classList.add('dis-show')
                            },150*(x+1))
                        }
                    }
                })
                // indicator right
            }//if key is equal to right
            if((approvedKeys[1])==(e.key)&&currentPos < arr.length-1){
                toggleLeftArrow(indArr)
                hideHistory(hisDisplay)
                currentPos++
                return [...arr].forEach((el,index)=>{
                    if(index==currentPos){
                        const object = {res:el.res,equation:el.equation}
                        hisDisplay.res.textContent = object.res
                        hisDisplay.equation.textContent = object.equation
                        const hisArr2 = [hisDisplay.res,hisDisplay.equation]
                        // console.log(el)
                        for(let x = 0; x < hisArr2.length; x++){
                            setTimeout(()=>{
                                hisArr2[x].classList.remove('dis-hidden')
                                hisArr2[x].classList.add('dis-show')
                            },150*(x+1))
                        }
                    }
                })
                
            }//if key is equal to left
        }
    }
    indArr.forEach((arrow,idx)=>{
        arrow.onclick = e => {
            if(arr.length>1){
                enableIndicators(indArr)
                if(idx==1&&currentPos > 0){
                    toggleRightArrow(indArr)
                    hideHistory(hisDisplay)
                    currentPos--
                    // console.log(currentPos)
                    return [...arr].forEach((el,index)=>{
                        if(index==currentPos){
                            const object = {res:el.res,equation:el.equation}
                            hisDisplay.res.textContent = object.res
                            hisDisplay.equation.textContent = object.equation
                            const hisArr = [hisDisplay.equation,hisDisplay.res]
                            // console.log(el)
                            for(let x = 0; x < hisArr.length; x++){
                                setTimeout(()=>{
                                    hisArr[x].classList.remove('dis-hidden')
                                    hisArr[x].classList.add('dis-show')
                                },150*(x+1))
                            }
                        }
                    })
                    // indicator right
                }//if key is equal to right
                if(idx==0&&currentPos < arr.length-1){
                    toggleLeftArrow(indArr)
                    hideHistory(hisDisplay)
                    currentPos++
                    return [...arr].forEach((el,index)=>{
                        if(index==currentPos){
                            const object = {res:el.res,equation:el.equation}
                            hisDisplay.res.textContent = object.res
                            hisDisplay.equation.textContent = object.equation
                            const hisArr2 = [hisDisplay.res,hisDisplay.equation]
                            // console.log(el)
                            for(let x = 0; x < hisArr2.length; x++){
                                setTimeout(()=>{
                                    hisArr2[x].classList.remove('dis-hidden')
                                    hisArr2[x].classList.add('dis-show')
                                },150*(x+1))
                            }
                        }
                    })
                    
                }//if key is equal to left
            }
        }
    })
}
// 10) Get the full history of equations and results produces
const getData = (u) => {
    // get data
    return $.ajax({
        type: 'GET',
        url: u,
        success:function(data){
            let arr = [...data.data] // unpackage data from it's object (data)
            console.log(arr)
            handleHistory(arr)
            if(arr.length > 1){
                enableIndicators([...indicators])
            }
            return arr
        }
    })
    
}
getData(url)

// post data to the server
const postData = async (u,v,t) => {
    $.ajax({
        dataType : "json",
        contentType: "application/json; charset=utf-8",    
        type: 'POST',
        url: u,
        data: JSON.stringify({result:v,equation:t}),
        success:function(data){
            console.log(data)
            let counter = data['c']
            if(counter > 1){
                enableIndicators([...indicators])
            }
        }
    })

 }

// 11) Post data from client side to server 
const renderHistory = async(url,val,trust) => {
    let newData = {res:val,equation:trust}
    hisDisplay.res.textContent = ''
    hisDisplay.equation.textContent = ''
    hisDisplay.res.textContent = newData.res
    hisDisplay.equation.textContent = newData.equation
    showHistory(hisDisplay)
    postData(url,val,trust)
    //get data
    getData(url)

}
// 12) Function to check for 2 keys pressed at the same time
const isCleared = () => combo[combo.length-1] == 'c' && combo[combo.length-2] == 'Control';

//__________________________________

// Change calculator's background color
colors.forEach((color,index)=>{

    color.addEventListener('click', e =>{
    
        // remove start push from sivler button
        silver.classList.remove('start-color')
        silver.classList.add('up')
        // color card push down 
        if(!e.target.classList.contains('down')){
            e.target.classList.add('down')
            e.target.classList.remove('up')

        }
        colors.forEach((c,i)=>{
            if(c!==color){
            c.classList.remove('down')
            c.classList.add('up')
            }
        })



        calculator.style.background = e.target.classList[0]
        let inArr = [...indicators]
        inArr.forEach(el=>{
                el.style.color = e.target.classList[0]
        })

        if(/(black|blue|red)/.test(e.target.classList[0])){
            return btns.forEach(btn => {
            if(!btn.classList.contains('long')){
                btn.style = `
            border: none;
            text-align: center;
            width: 50px;
            color:#fff;
            height: 50px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            box-shadow: 0px 0px 3px 2px silver;
            font-family: 'Agdasima', sans-serif;
            transition: .25s ease;
            `
            }
            else{
                btn.style=`
                width: 33%;
                margin-top: 1rem;
                letter-spacing: 1.25px;
                color:#fff;
                box-shadow: 0px 0px 3px 2px #fff; `
            }
            })
        }
        else{
            btns.forEach(btn => {
                if(!btn.classList.contains('long')){
                    btn.style = `
                    border: none;
                    text-align: center;
                    width: 50px;
                    color:#000;
                    height: 50px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 24px;
                    box-shadow: 0px 0px 3px 2px #4b454574;
                    font-family: 'Agdasima', sans-serif;
                    transition: .25s ease;
                    `
                }
                else{
                    btn.style=`
                    width: 33%;
                    margin-top: 1rem;
                    color:#000;
                    letter-spacing: 1.25px;
                    box-shadow: 0px 0px 3px 2px #4b454574; `
                }
            })
        }
    })
})
// Loop through each button - 'click' event listener
btns.forEach(btn => {
    //Event listener to click buttons
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(display.value=='0')display.value=''
        var chr = e.target.textContent; 
        //Regex.test(string) - condition for programming chrs, deleting chrs & All Clear(AC)
        if(/\d|[0-9-+*./]/.test(chr)){
            display.value += chr;
            if(/(\+|\-|\/|\*)(\-)(\+|\-|\/|\*)/g.test(display.value)){
                display.value=display.value.replace('-','')
                }
        }
        if(/(\+|\/|\*)(\+|\/|\*)/g.test(display.value)){
            display.value = display.value.replace(/(\+|\/|\*)/,'')
        }
        if(/(\+|\-|\/|\*)?(\-)(\+|\-|\/|\*)/g.test(display.value)){
            display.value = display.value.replace('-','')
            }
        if(/DELETE/.test(chr))display.value = display.value.slice(0,-1);

        if(/AC/.test(chr)){
            display.value = '0';
            //board.textContent='0'
        }
        if(/NEG/.test(chr)){
            display.value = display.value.replace(/\d+$/,n=>(+n*-1).toString())
        }
        if(/=/.test(chr)){
            let trust = [...display.value].join``
            //Helper function to evaluate
            display.value = !display.value ? '' : eval(display.value);
            // post request function
            renderHistory(url,display.value,trust)
        }
        if(/\./g.test(chr)){
    // display.value = '.....22+45+56..3/77-4.............3'
    //regex to ensure possible decimals are limited to no more than 1.
    display.value = display.value.replace(/([(0-9)*|\.{1}])(\+|\-|\/|\*)(\+|\-|\/|\*)([(0-9)*|\.{1}])/g,'$1\s$2\s$3')
    .replace(/([0-9]*)(\+|\-|\/|\*)([0-9]*)/g,'$1 $2 $3')                
         .split(" ")
         .map(num=>{
             if(/\d+/g.test(num)){
                 num = num.replace(/(\d+)(\.{1})(\d+)(\.{1})/g,'$1$2$3')
                 .replace(/(\.{1})(\d+)(\.{1})/g,'$1$2')
                 .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
             }
             else{
                 num
             }
             return num
         })
         .join('')
        }
        //regex to ensure possible decimals are limited to no more than 1.
        display.value = display.value.replace(/\.{2,}/g,'.')
        display.value = display.value.replace(/\.(\d+)\./g,'$1')
    })
    
})
//Event listener to detect keydown event listener
window.addEventListener('keydown',(e)=>{
    let indArr = [...indicators]
    let currKey = e.key;
    combo.push(currKey)
    const specialObject = {DELETE:'Backspace',NEG:'n',AC:'c'}
    // map buttons with keypress
    // console.log(combo)
    let key_2_btn = [...btns].map((b,index)=>{
        let content = b.textContent
        if((e.key==content||e.key==specialObject[content])){
            blink(b,150)
        }
        if(e.key==combo[combo.length-1] && index<1 && isCleared()){
            blink(b,150)
            display.value = ''
            hisDisplay.res.textContent=''
            hisDisplay.equation.textContent=''
            fetch(del)
            getData(url)
            combo = [];
            hideIndicators(indArr)
        }
        
    })




    if(display.value=='0')display.value=''

    if(/[0-9-+*./]/.test(e.key)){
        display.value += e.key;
    }
    if(/(\+|\/|\*)(\+|\/|\*)/g.test(display.value)){
        display.value = display.value.replace(/(\+|\/|\*)/,'')
    }
    if(/(\+|\-|\/|\*)?(\-)(\+|\-|\/|\*)/g.test(display.value)){
        display.value = display.value.replace('-','')
        }
    if(e.key=='Enter'|| e.key=='='){
    let trust = [...display.value].join``
    //board.textContent= eval(display.value);
    display.value = !display.value ? '' : eval(display.value);
    renderHistory(url,display.value,trust)
    }
    if(e.key=='c') {
        display.value = '0';
        //board.textContent='0'
    }
    if(e.key=='Backspace') {display.value = display.value.slice(0,-1)}
    if(e.key=='n'){
        display.value = display.value.replace(/\d+$/,n=>(+n*-1).toString())
                                     .replace(/--/g,'-')
    }
    if(e.key=='.'){
        display.value = display.value.replace(/([(0-9)*|\.{1}])(\+|\-|\/|\*)(\+|\-|\/|\*)([(0-9)*|\.{1}])/g,'$1\s$2\s$3')
                                     .replace(/([0-9]*)(\+|\-|\/|\*)([0-9]*)/g,'$1 $2 $3')                
                                    .split(" ")
                                    .map(num=>{
                                        if(/\d+/g.test(num)){
                                            num = num.replace(/(\d+)(\.{1})(\d+)(\.{1})/g,'$1$2$3')
                                                        .replace(/(\.{1})(\d+)(\.{1})/g,'$1$2')
                                                        .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
                                                        .replace(/(\d+)(\.{1})(\.*)/g,'$1$2')
                                        }
                                        else{
                                            num
                                        }
                                        return num
                                    })
                                    .join('')
            }
})

