function resizeTextarea(textarea) {
    if (!textarea.dataset.initialHeight) {
        textarea.dataset.initialHeight = textarea.offsetHeight + 'px';  // Store the initial height
    }
    textarea.style.height = 'auto';
    if (textarea.value.trim() === '') {
        textarea.style.height = textarea.dataset.initialHeight;
    } else {
        textarea.style.height = Math.max(textarea.scrollHeight, 20) + 'px'; 
    }
}

document.getElementById('qus').addEventListener('input', function() {
    resizeTextarea(this);
});
document.getElementById('ans').addEventListener('input', function() {
    resizeTextarea(this);
});

const flashcards=document.getElementsByClassName("allcards")[0];
const createBox=document.getElementsByClassName("askcard")[0];
const question=document.getElementById("qus");
const answer=document.getElementById("ans");
let contentArray=localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[];

contentArray.forEach(divMaker);
function divMaker(text){
    var div=document.createElement("div");
    var h2_qus=document.createElement("h2")
    var h2_ans=document.createElement("h2")

    div.className='card';
    h2_qus.setAttribute('style',"border-top:1px solid red; padding:15px; margin-top:30px");
    h2_qus.innerHTML=text.my_qus;

    h2_ans.setAttribute('style',"text-align:center; display:none; color:red");
    h2_ans.innerHTML=text.my_ans;

    div.appendChild(h2_qus);
    div.appendChild(h2_ans);

    div.addEventListener("click",function(){
        if(h2_ans.style.display=="none")
            h2_ans.style.display="block";
        else
            h2_ans.style.display="none";
    });

    flashcards.appendChild(div);
}

function addFlashcard(){
    // console.log("entered");
    var flash_info={
        'my_qus':question.value,
        'my_ans':answer.value,
    }

    contentArray.push(flash_info);
    localStorage.setItem('items',JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length-1]);
    question.value='';
    answer.value='';
}

function delFlashCards(){
    // console.log("delete flashcard clicked");
    localStorage.clear();
    flashcards.innerHTML='';
    contentArray=[];
}

function hideCreateBox(){
    createBox.style.display="none";
}
 
function showCreateCardBox(){
    createBox.style.display="block";
}