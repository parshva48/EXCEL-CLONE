let addbtn=document.querySelector(".add-btn");
let sheetarea=document.querySelector(".sheets");
let firstsheet=document.querySelector(".sheet");
const firstRow = document.querySelector('.outer-box');
const firstCol = document.querySelector('.left-col');
let gridcontainer=document.querySelector(".grid-container");
const firstRowOffsetY = firstRow.offsetTop;
const firstRowOffsetX = firstCol.offsetLeft;




firstsheet.style.backgroundColor="white";
firstsheet.classList.add("active-sheet");
firstsheet.addEventListener("click",function(){
    handlesheetcolor(firstsheet);
    celldata=allsheet[0];
    curridx=0;
    SetUI(celldata);
    
});
addbtn.addEventListener("click",function(){
    let sheetarr=document.querySelectorAll(".sheet");
let sheet=document.createElement("div");
sheet.setAttribute("class","sheet");
let lastsheet=sheetarr[sheetarr.length-1];
let idx=lastsheet.getAttribute("idx");
curridx=idx;
idx++;
sheet.setAttribute("idx",""+idx);
sheetarea.appendChild(sheet);
let str="Sheet-"+idx;
sheet.innerText=str; 
  handlesheetcolor(sheet);
  CreateSheet();
  celldata=allsheet[idx-1];
 console.log(celldata);
  SetUI(celldata);
sheet.addEventListener("click",function(){
    handlesheetcolor(sheet);
    let idx=sheet.getAttribute("idx");
    idx--;
    curridx=idx;
    celldata=allsheet[idx];
    SetUI(celldata);
});

})

function handlesheetcolor(sheet)
{
    let allsheet=document.querySelectorAll(".sheet");
    for(let i=0;i<allsheet.length;i++)
    {
        allsheet[i].style.backgroundColor="";
        allsheet[i].classList.remove("active-sheet");
    }
    sheet.classList.add("active-sheet");
    sheet.style.backgroundColor="white";
  

}

function SetUI(cellarr)
{
   
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<26;j++)
        {
            let address=String.fromCharCode(65 + j)+(i+1);
          let cellnode=document.querySelector(`.cell[uid="${address}"]`);
          cellnode.innerText=cellarr[i][j].value;
           HandleCellNode(cellnode,cellarr[i][j]);
          
        }
    }
    if(idarr[curridx]!=undefined)
    {
        let address=idarr[curridx];
        addressinput.value=address;
        let col=Number(address.charCodeAt(0))-65;
        let row=Number(address.substring(1));
        formulabar.value=cellarr[row-1][col].formula;
       HandleToolBar(row-1,col);
    }
    else{
        HandleToolBar(0,0);
        formulabar.value="";
        addressinput.value="A1";
    }

}

function HandleCellNode(cellnode,cellobj)
{
    if(cellobj.isbold=="true")
    {
     cellnode.style.fontWeight="bold";
    }
    else{
        cellnode.style.fontWeight="normal";
    }
    if(cellobj.isitalic=="true")
    {
        cellnode.style.fontStyle="italic";
    }
    else{
        cellnode.style.fontStyle="normal";
    }
    if(cellobj.isunderline=="true")
    {
        cellnode.style.textDecoration="underline";
    }
    else{
        cellnode.style.textDecoration="none";
    }
    if(cellobj.isla=="true")
    {
        cellnode.style.textAlign="left";
    }
    if(cellobj.isca=="true")
    {
        cellnode.style.textAlign="center";
    }
  
    if(cellobj.isra=="true")
    {
        cellnode.style.textAlign="right";
    }
     let size=cellobj.fs;
    cellnode.style.fontSize=size+"px";
    let fonttype=cellobj.ff;
    cellnode.style.fontFamily=fonttype;
    let color=cellobj.color;
    cellnode.style.color=color;
}




