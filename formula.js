let allcells=document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++)
{
    allcells[i].addEventListener("blur",function(){
        let flag=false;
       
        let address=allcells[i].getAttribute("uid");
        let col=Number(address.charCodeAt(0))-65;
        let row=Number(address.substring(1));
       let cellobj=celldata[row-1][col];
       cellobj.value=allcells[i].innerText;
       console.log(cellobj.value);
         UpdateAllValues(cellobj);
      
    })
}
function UpdateAllValues(cellobj)
{
    let child=cellobj.children;
    for(let i=0;i<child.length;i++)
    {
        let ch=child[i];
        let col=Number(ch.charCodeAt(0))-65;
        let row=Number(ch.substring(1));
       let childobj=celldata[row-1][col];
       let formula=childobj.formula;
       let value=Evaluate(formula,true);
        SetValue(value,formula,ch);
        UpdateAllValues(childobj);
       

    }
}

formulabar.addEventListener("keydown",function(e){
if(e.key=="Enter")
{
   let formula=formulabar.value;
   let address=addressinput.value;
   let col=Number(address.charCodeAt(0))-65;
   let row=Number(address.substring(1));
  let cellobj=celldata[row-1][col];
  if(cellobj.formula!=formula)
  {
      RemoveFormula(cellobj,address);
      if(formula.length==0)
      {
          cellobj.formula="";
          let cellnode=document.querySelector(`.cell[uid="${address}"]`);
          cellnode.innerText="";
      }
      else{
      let value=Evaluate(formula);

    SetValue(value,formula,address);
      }

  }
    

}
});

function Evaluate(formula,checker)
{
    let arr=formula.split(" ");
    console.log(arr);
    for(let i=0;i<arr.length;i++)
    {
        let code=arr[i].charCodeAt(0);
        if(code>=65 && code<=90)
        {
            let col=Number(arr[i].charCodeAt(0))-65;
            let row=Number(arr[i].substring(1));
           let cellobj=celldata[row-1][col];
           if(checker==undefined)
           cellobj.children.push(addressinput.value);
           arr[i]=cellobj.value;

        }
    }
    formula=arr.join(" ");
    return eval(formula);
}

function SetValue(value,formula,address)
{
    let cellnode=document.querySelector(`.cell[uid="${address}"]`);
    let col=Number(address.charCodeAt(0))-65;
    let row=Number(address.substring(1));
   let cellobj=celldata[row-1][col];
   cellnode.innerText=value;
   cellobj.value=value;
   cellobj.formula=formula;

}
for(let i=0;i<allcells.length;i++)
{
    allcells[i].addEventListener("keydown",function(e){
      if(e.key=="Backspace")
      {
        let address=allcells[i].getAttribute("uid");
        let col=Number(address.charCodeAt(0))-65;
        let row=Number(address.substring(1));
       let cellobj=celldata[row-1][col];
       if(cellobj.formula.length>0)
       RemoveFormula(cellobj,address);
       cellobj.formula="";
       formulabar.value="";



      }
    })
}
function RemoveFormula(cellobj,cellname)
{
    let formula=cellobj.formula;
    let arr=formula.split(" ");
    for(let i=0;i<arr.length;i++)
    {
        let code=arr[i].charCodeAt(0);
        if(code>=65 && code<=90)
        {
            let col=Number(arr[i].charCodeAt(0))-65;
            let row=Number(arr[i].substring(1));
           let parentobj=celldata[row-1][col];
          let idx=parentobj.children.indexOf(cellname);
          parentobj.children.splice(idx,1);

        }
    }

}


