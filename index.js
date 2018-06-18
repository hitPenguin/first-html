var array = [{ "name": "待接单", "status": "WAIT_ACCEPT", "isShadowed": true }, { "name": "待发货", "status": "WAIT_DELIVER", "isShadowed": true, "isCurrentStatus": true }, { "name": "验货入库", "status": "STOCK_IN" }, { "name": "已完成", "status": "DELIVERED" }];
var wrapper = document.getElementsByClassName("wrapper")[0];


function stateChange(array) {
    var innerStr = array.length === 1 ? `<div class = "abandon">${ array[0].name }</div>` : "";
    if(!innerStr){
        var len = array.length
        array.forEach(function(ele, index){
            var color = "";
            if(ele.isCurrentStatus){
                color = "active";
            }else if(ele.isShadowed){
                color = "shadow";
            }
            switch(index){
                case 0 : innerStr += `<div class="order start ${ color }">${ ele.name }</div>`;break;
                case len - 1 :  innerStr +=`<div class="order final ${ color }">${ ele.name }</div>`;break;
                default : innerStr += `<div class="order ${ color }"><span></span><span></span>${ ele.name }</div>`;break;
            }
        })
    }
    wrapper.innerHTML = innerStr;
}

stateChange(array);