var storeObj = arr;

var answerArr = {};

function readObj(obj){
	var type = typeof(obj);
	if(type.toLowerCase()==="object"){
		storeObj = obj;
		var arr = Object.keys(obj);
		var domArr = [];
		arr.map(function(data, index){
			if((obj["type"]==="question" || obj["type"]==="statement")){
				if(data!=="type"){
					var elem = document.createElement("osar-question");
					elem.innerHTML = data;
					elem.className = "conversation-question";
					domArr.push(elem); 
					if(obj["type"]==="statement"){
						var timer = setTimeout(function(){
							elementClick(data);
							clearTimeout(timer);
						}, 2500);
					}else{
						var timer = setTimeout(function(){
							createInputTemplate(data);
							clearTimeout(timer);
						}, 2000);
					}
				}
			}else{
				if(data!=="type"){
					var elem = document.createElement("osar-option");
					elem.className = "conversation-option";
					elem.addEventListener("click", elementClick);
					elem.innerHTML = data;
					domArr.push(elem);
				}
			}
		});
		return domArr;
	}
}

function elementClick(propName){
	propName= this.innerHTML || propName;
	if(propName){
		storeObj = storeObj[propName]; 
	} 
	if(this.innerHTML){
		createClickResults(this);
	}	
	var divNode = document.createElement("osar-container");
	var arr = readObj(storeObj);
	arr.map(function(elem, index){
		divNode.appendChild(elem);
	});
	divNode.className = "conversation-container";
	conversationNode.appendChild(divNode);

	var questionNode = divNode.querySelector("osar-question");
	if(questionNode){
		tableXStrech(questionNode);
	}
}


function createInputTemplate(data){
	var inputContainer = document.createElement("osar-input");
	inputContainer.className ="conversation-input";
	var inputElm = createTextarea();
	var submitBtn = createBtn();
	submitBtn.innerHTML = "S";
	submitBtn.setAttribute("data-propname", data);
	submitBtn.addEventListener("click", inputSubmit);
	inputContainer.appendChild(inputElm);
	inputContainer.appendChild(submitBtn);
	conversationNode.appendChild(inputContainer);
}

function createBtn(){
	var btn = document.createElement("button");
	btn.className = "conversation-btn";
	return btn;
}

function createTextarea(){
	var inputElm = document.createElement("textarea");
	inputElm.className= "conversation-textarea";
	inputElm.addEventListener("focus", function(){
		this.className= "conversation-textarea conversation-textarea-focus";
	});
	inputElm.addEventListener("blur", function(){
		this.className = "conversation-textarea conversation-textarea-blur";
	});
	return inputElm;
}

function inputSubmit(){
	var propname = event.target.dataset.propname;
	var value = event.target.parentNode.querySelector("textarea").value;
	event.target.parentNode.parentNode.removeChild(event.target.parentNode);
	createAnswerTemplate(value);
	elementClick(propname);
	answerArr[propname] =value;
	console.log(answerArr);
}

function createAnswerTemplate(value){
	var parentNode = document.createElement("osar-container");
	parentNode.className = "conversation-container";
	var childNode = document.createElement("osar-option");
	childNode.className = "conversation-option conversation-option-clicked";
	childNode.innerHTML = value==="" ? "..." : value;
	parentNode.appendChild(childNode);
	conversationNode.appendChild(parentNode);
}

function createClickResults(sourceObj){
	sourceObj.removeEventListener("click", elementClick);
	var parentNode = document.createElement("osar-container");
	parentNode.className = "conversation-container";
	var childNode = document.createElement("osar-option");
	childNode.className = "conversation-option conversation-option-clicked";
	childNode.innerHTML = sourceObj.innerHTML;
	parentNode.appendChild(childNode);
	sourceObj.parentNode.parentNode.removeChild(sourceObj.parentNode);
	conversationNode.appendChild(parentNode);
}

function backToLast(){
	event.target.parentNode.parentNode.removeChild(event.target.parentNode);
}

function tableXStrech(questionNode){
	var offsetWidthEnd = questionNode.offsetWidth;
	var innerHTML = questionNode.innerHTML;
	questionNode.innerHTML= "...";
	questionNode.style.width = questionNode.offsetWidth+"px";
	var timer= setTimeout(function(){
		questionNode.innerHTML = innerHTML;
		questionNode.style.width = offsetWidthEnd+"px";
		clearTimeout(timer);
	}, 1000);
}