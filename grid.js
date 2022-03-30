let rows=document.querySelector(".left-col");
let cols=document.querySelector(".cols");
let grid=document.querySelector(".grid");
let addressinput=document.querySelector(".address-input");
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let leftalign=document.querySelector(".left-align");
let centrealign=document.querySelector(".centre-align");
let rightalign=document.querySelector(".right-align");
let fontsize=document.querySelector(".font-size");
let fontfamily=document.querySelector(".font-family");
let fontcolor=document.querySelector(".font-color");
let formulabar=document.querySelector(".formula-input");
let curridx=0;
let idarr=[];
for(let i=0;i<100;i++)
{
    let eachrow=document.createElement("div");
    eachrow.innerText=i+1;
    rows.appendChild(eachrow);
    eachrow.setAttribute("class","row");
}
for(let i=0;i<26;i++)
{
    let eachcol=document.createElement("div");
    eachcol.innerText=String.fromCharCode(65 + i);
    cols.appendChild(eachcol);
    eachcol.setAttribute("class","col");
}
let allsheet=[];
let celldata=[];
CreateSheet();

function CreateSheet(){
  let tempcelldata=[];
  for(let i=0;i<100;i++)
  {
      let row=[];
      for(let j=0;j<26;j++)
      {
        let obj={
            isbold:"false",
            isitalic:"false",
            isunderline:"false",
            isla:"false",
            isca:"false",
            isra:"false",
            fs:"16",
            ff:"monospace",
            color:"black",
            bgcolor:"white",
            value:"",
            color:"black",
            value:"",
            formula:"",
            children:[]
        }
        row.push(obj);
      }
      tempcelldata.push(row);


  }
allsheet.push(tempcelldata);
celldata=tempcelldata;

}
for(let i=0;i<100;i++)
{
   
    let eachrow=document.createElement("div");
    eachrow.setAttribute("class","eachrows");
    grid.appendChild(eachrow);
    for(let j=0;j<26;j++)
    {
        
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        eachrow.appendChild(cell);
        cell.setAttribute("contenteditable","true");
        let code=String.fromCharCode(65 + j)+(i+1);
       cell.setAttribute("uid",code);
       cell.addEventListener("click",function(e){
           handleaddress(e.currentTarget);
          idarr[curridx]=code;
         HandleToolBar(i,j);
         formulabar.value=celldata[i][j].formula;

       })
    }  
}
function HandleToolBar(i,j)
{
    let cellobj=celldata[i][j];
    //HANDLING BOLD,ITALIC,UNDERLINE
    if(cellobj.isbold=="true")
    {
      bold.classList.add("active-state");
    }
    else{
        bold.classList.remove("active-state");
    }
    if(cellobj.isitalic=="true")
    {
      italic.classList.add("active-state");
    }
    else{
        italic.classList.remove("active-state");
    }
    if(cellobj.isunderline=="true")
    {
      underline.classList.add("active-state");
    }
    else{
        underline.classList.remove("active-state");
    }
    if(cellobj.isla=="true")
    {
      leftalign.classList.add("active-state");
    }
    else{
        leftalign.classList.remove("active-state");
    }
    if(cellobj.isca=="true")
    {
      centrealign.classList.add("active-state");
    }
    else{
        centrealign.classList.remove("active-state");
    }
    if(cellobj.isra=="true")
    {
      rightalign.classList.add("active-state");
    }
    else{
        rightalign.classList.remove("active-state");
    }

    // HANDLING FONTSIZE,FONTFAMILY
    let fsize=cellobj.fs;
    fontsize.value=fsize;
    let ffamily=cellobj.ff;
    fontfamily.value=ffamily;
  
    //Handling font-color
    let color=cellobj.color;
    fontcolor.value=color;
   

}
function handleaddress(cell)
{
   let code=cell.getAttribute("uid");
   addressinput.value=code;
}
bold.addEventListener("click",function(){
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
   if(cellobj.isbold=="true")
   {
      cellnode.style.fontWeight="normal";
      cellobj.isbold="false";
      bold.classList.remove("active-state");
   }
   else{
    cellnode.style.fontWeight="bold";
    cellobj.isbold="true";
    bold.classList.add("active-state");
   }
   
})
italic.addEventListener("click",function(){
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
   if(cellobj.isitalic=="true")
   {
      cellnode.style.fontStyle="normal";
      cellobj.isitalic="false";
      italic.classList.remove("active-state");
   }
   else{
    cellnode.style.fontStyle="italic";
    cellobj.isitalic="true";
    italic.classList.add("active-state");
   }
})
underline.addEventListener("click",function(){
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
   if(cellobj.isunderline=="true")
   {
      cellnode.style.textDecoration="none";
      cellobj.isunderline="false";
      underline.classList.remove("active-state");
   }
   else{
    cellnode.style.textDecoration="underline";
    cellobj.isunderline="true";
    underline.classList.add("active-state");
   }
   
})
leftalign.addEventListener("click",function(){
    let address=addressinput.value;
    centrealign.classList.remove("active-state");
    rightalign.classList.remove("active-state");
    leftalign.classList.add("active-state");
let cellnode=document.querySelector(`.cell[uid="${address}"]`);
let col=Number(address.charCodeAt(0))-65;
let row=Number(address.substring(1));
let cellobj=celldata[row-1][col];
cellobj.isla="true";
cellobj.isca="false";
cellobj.isra="false";
    cellnode.style.textAlign="left";
})
centrealign.addEventListener("click",function(){
    let address=addressinput.value;
    leftalign.classList.remove("active-state");
    rightalign.classList.remove("active-state");
    centrealign.classList.add("active-state");
   
let cellnode=document.querySelector(`.cell[uid="${address}"]`);
let col=Number(address.charCodeAt(0))-65;
let row=Number(address.substring(1));
let cellobj=celldata[row-1][col];
cellobj.isla="false";
cellobj.isca="true";
cellobj.isra="false";
    cellnode.style.textAlign="center";
})
rightalign.addEventListener("click",function(){
    let address=addressinput.value;
    centrealign.classList.remove("active-state");
    leftalign.classList.remove("active-state");
    rightalign.classList.add("active-state");
let cellnode=document.querySelector(`.cell[uid="${address}"]`);
let col=Number(address.charCodeAt(0))-65;
let row=Number(address.substring(1));
let cellobj=celldata[row-1][col];
cellobj.isla="false";
cellobj.isca="false";
cellobj.isra="true";
    cellnode.style.textAlign="right";
   
})
fontsize.addEventListener("change",function(){
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
    let size=fontsize.value;
    cellnode.style.fontSize=size+"px";
    cellobj.fs=size;

})
fontfamily.addEventListener("change",function(){
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
    let fonttype=fontfamily.value;
    cellnode.style.fontFamily=fonttype;
    cellobj.ff=fonttype;
})
fontcolor.addEventListener("change",function(){
    let color=fontcolor.value;
    let address=addressinput.value;
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
let col=Number(address.charCodeAt(0))-65;
let row=Number(address.substring(1));
let cellobj=celldata[row-1][col];
cellobj.color=color;
cellnode.style.color=color;


})

let fcell=document.querySelector(`.cell[uid="A1"]`);
fcell.click();

