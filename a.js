<!DOCTYPE html>
<html>
    <header>
        <title>dd</title>
    </header>
    <body>null</body>
    <script>
function split(str,spliter,openChar,closeChar){
    let res = [];
    let item = "";
    let openCounter = 0;
    for(let char of str){
        if(openCounter === 0 && char === spliter){
            res.push(item);
            item = "";
            continue;
        }
        if(char === openChar){
            openCounter ++;
        }
        if(char === closeChar){
            openCounter --;
        }
        item += char;
    }
    if(item !== ""){
        res.push(item);
    }
    return res;
}

function parseIntoTree(arr,spliter,openChar,closeChar){
    let root = {};
    let node = root;
    for(let i = 0;i< arr.length; i++){
        if (i === 0){
            if(arr[i].startsWith(openChar)){
                root = parseIntoTree(split(arr[i].substr(1,arr[i].length-2),spliter,openChar,closeChar));;
            }else{
                root.label = arr[i];
            }
        }else{
            if(arr[i].startsWith(openChar)){
                node.children = parseIntoBrother(arr[i].substr(1,arr[i].length-2),spliter,openChar,closeChar);
            }else{
                node.children = [];
                node.children.push({label:arr[i]})
                node = node.children[0];
            }
        }
    }
    return root;
}
function parseIntoBrother(str,spliter,openChar,closeChar){
    let result = [];
    let arr = split(str,",","(",")");
    for(let item of arr){
        if(item.includes(spliter)){
            result.push(parseIntoTree(split(item,"-",openChar,closeChar),spliter,openChar,closeChar));
        }else{
            result.push({label:item});
        }
    }
    return result;
}
        window.onload= ()=>{
            let arr = split("ASC-MTeX-(GTM-RKS,ESP)","-","(",")");
            let treeObj = parseIntoTree(arr,"-","(",")");
            console.log(treeObj);
        }
    </script>
</html>
