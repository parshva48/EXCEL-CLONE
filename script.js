let addbtn=document.querySelector(".add-btn");
let sheetarea=document.querySelector(".sheets");
let firstsheet=document.querySelector(".sheet");
firstsheet.style.backgroundColor="white";
firstsheet.addEventListener("click",function(){
    handlesheetcolor(firstsheet);
});
addbtn.addEventListener("click",function(){
    let sheetarr=document.querySelectorAll(".sheet");
let sheet=document.createElement("div");
sheet.setAttribute("class","sheet");
let lastsheet=sheetarr[sheetarr.length-1];
let idx=lastsheet.getAttribute("idx");
idx++;
sheet.setAttribute("idx",""+idx);
sheetarea.appendChild(sheet);
let str="Sheet-"+idx;
sheet.innerText=str; 
  handlesheetcolor(sheet);
sheet.addEventListener("click",function(){
    handlesheetcolor(sheet);
});

})

function handlesheetcolor(sheet)
{
    let allsheet=document.querySelectorAll(".sheet");
    for(let i=0;i<allsheet.length;i++)
    {
        allsheet[i].style.backgroundColor="";
    }
    sheet.style.backgroundColor="white";

}




