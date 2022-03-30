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
  if(cellobj.formula==formula || IsCycleDetected(cellobj,formula,address))
  {
    alert("CYCLE DETECTED");
    formulabar.value=cellobj.formula;
    
  }

  else{
  
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
    UpdateAllValues(cellobj);

      }

    }
}
});

function IsCycleDetected(cellobj,formula,cellname)
{
    cellobj.formula=formula;
    let arr=formula.split(" ");
    for(let i=0;i<arr.length;i++)
    {
        let code=arr[i].charCodeAt(0);
        if(code>=65 && code<=90)
        {
            let col=Number(arr[i].charCodeAt(0))-65;
            let row=Number(arr[i].substring(1));
           let cellobj=celldata[row-1][col];
           cellobj.children.push(addressinput.value);

        }
    }
    let inward=[];
    for(let i=0;i<100;i++)
    {
        let rowwise=[];
        for(let j=0;j<26;j++)
        {
            rowwise.push(0);

        }
        inward.push(rowwise);
    }
    for(let i=0;i<100;i++)
    {
        for(let j=0;j<26;j++)
        {
            let eachobj=celldata[i][j];
            let children=eachobj.children;
            if(children.length>0)
            {
               FillInward(inward,children);
            }

        }
    }
    
    let res= KahnsAlgo(inward);
    RemoveFormula(cellobj,cellname);
    cellobj.formula="";
    return res;

}
function KahnsAlgo(inward)
{
    let que=[];
    for(let i=0;i<inward.length;i++)
    {
        for(let j=0;j<inward[0].length;j++)
        {
            if(inward[i][j]==0)
            {
                que.push(i*26+j);
            }
        }
    }
    let temp=[];
    while(que.length>0)
    {
     let size=que.length;
     while(size-->0)
     {
         let idx=que.shift();
          let row=Math.floor(idx/26);
          let col=idx%26;
          temp.push(idx);
          let child=celldata[row][col].children;
         for(let i=0;i<child.length;i++)
         {
            let c=Number(child[i].charCodeAt(0))-65;
            let r=Number(child[i].substring(1))-1; 
            inward[r][c]--;  
            if(inward[r][c]==0)
            {
             que.push(r*26+c);

            }
         }
          
     }

    }
   if(temp.length==2600)
   {
       return false;
   }
   return true;

}

function FillInward(inward,children)
{
  for(let i=0;i<children.length;i++)
  {
    let child=children[i];
    let col=Number(child.charCodeAt(0))-65;
    let row=Number(child.substring(1));
    inward[row-1][col]++;

  }
}


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
           if(cellobj.value=="")
           {
               arr[i]=""+0;
           }
          else
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


