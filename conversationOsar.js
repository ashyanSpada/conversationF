'use strict';
var arr = {
	"type": "question",

	"How are you?":{
		"type": "statement",

		"I think you must be fine.":{
			"type" :"statement",

			"I'm osar.":{
				"type": "statement",

				"It\'s a demo on my own. Do you like this?":{
					"type":"option",

					"Yes":{
						"type": "statement",
						"Thanks": ""
					},
					"No":{
						"type": "statement",
						"oops ,tell me what you think that would help me to improve.":{
							"I love you, honey": {
								"type": "image",
								"url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506185754&di=10be18e9a20f5028708a832e16ade4d3&imgtype=jpg&er=1&src=http%3A%2F%2Fpic62.nipic.com%2Ffile%2F20150319%2F12632424_132215178296_2.jpg"
							},
							"type":"statement"
						}
					},
					"Not sure":{
						"type": "statement",
						"haha you are not sure yet!!": {
							"type" : "video",
							"url" : "https://yiqioffice.com/static/yiqixie/webnewdesign/laptop2.mp4",
							"next" : {
								"type" : "statement",
								"Ha ha ha, its osar" : ""
							}
						}
					}
				}
			}
		}
	}
};


var conversationNode = document.querySelector('.conversation');
//elementClick();

function Communication(initArr){
	this.initArr = initArr;
	this.answerArr = {};
	this.storeObj = initArr;
	this.projectInit();
}

Object.defineProperty(Communication.prototype, 'ignorePropArray', {
	value: ['type', 'next', 'url', 'pattern']
});

Communication.prototype.projectInit = function() {
	var headNode = document.querySelector('head');
	var linkNode = document.createElement('link');
	linkNode.rel = 'stylesheet';
	linkNode.href = 'conversationOsar.css';
	headNode.appendChild(linkNode);
	var timer = setTimeout(function(){
		this.conversationSkip();
		clearTimeout(timer);
	}.bind(this), 200);
	this.createProjectBody();
	this.createWarningToneNode();
};

Communication.prototype.createProjectBody = function(){
	var projectBodyNode = document.createElement('osar-body');
	this.conversationNode = projectBodyNode;
	projectBodyNode.className = 'conversation-body';
	conversationNode.appendChild(projectBodyNode);
};

Communication.prototype.createWarningToneNode = function(){
	var audioNode = document.createElement('audio');
	audioNode.src = 'audio/msg.wav';
	this.warningToneNode = audioNode;
};

Communication.prototype.createVideoNode = function(){
	var videoElm = document.createElement('video');
	videoElm.className = 'conversation-video'; 
	videoElm.autoplay = true;
	return videoElm;
};

Communication.prototype.createAudioNode = function(){
	var audioElm = document.createElement('audio');
	audioElm.className = 'conversation-audio';
	return audioElm;
};

Communication.prototype.createImageNode = function(){
	var imageElm = document.createElement('img');
	imageElm.className = 'conversation-image';
	return imageElm;	
};


Communication.prototype.createInputNode = function(){
	var inputElm = document.createElement('input');
	inputElm.type = 'text';
	inputElm.className = 'conversation-input';
	return inputElm;
};

Communication.prototype.readObj = function(obj) {
	var type = typeof(obj);
	if(type.toLowerCase()==='object'){
		this.storeObj = obj;
		var arr = Object.keys(obj);
		var domArr = [];
		arr.map(function(data, index){
			if(obj['type'] === 'option'){
				if(this.ignorePropArray.indexOf(data) === -1){
					var elem = document.createElement('osar-option');
					elem.className = 'conversation-option';
					elem.addEventListener('click', this.optionClick.bind(this));
					elem.innerHTML = data;
					domArr.push(elem);
				}
			}else if(obj['type'] === 'question' || obj['type'] === 'statement'){
				if(this.ignorePropArray.indexOf(data) === -1){
					var elem = document.createElement('osar-question');
					elem.innerHTML = data;
					elem.className = 'conversation-question';
					domArr.push(elem); 

					if(obj['type']==='statement'){
						var timer = setTimeout(function(){
							this.conversationSkip(data);
							clearTimeout(timer);
						}.bind(this), 2500);
					}else{
						var timer = setTimeout(function(){
							this.createTextInputTemplate(data);
							clearTimeout(timer);
						}.bind(this), 2000);
					}
				}
			}else if(obj['type'] === 'video'){
				if(data === 'url'){
					var videoElm = this.createVideoNode();
					videoElm.src = obj['url'];
					domArr.push(videoElm);
					if(obj['next']){
						var timer = setTimeout(function(){
							this.conversationSkip('next');
							clearTimeout(timer);
						}.bind(this), 2500);
					}
				}
			}else if(obj['type'] === 'image'){
				if(data === 'url'){
					var imageElm = this.createImageNode();
					imageElm.src = obj['url'];
					domArr.push(imageElm);
					if(obj['next']){
						var timer = setTimeout(function(){
							this.conversationSkip('next');
							clearTimeout(timer);
						}.bind(this), 2500);
					}
				}

			}
		}.bind(this));
		return domArr;
	}else{
		return [];
	}
};

Communication.prototype.conversationSkip = function(propName){
	if(propName){
		this.storeObj = this.storeObj[propName]; 
	} 
	this.createQuestion();
};

Communication.prototype.optionClick = function() {
	var propName = event.target.innerHTML;
	this.storeObj = this.storeObj[propName];
	this.createClickResults(event.target);
	this.createQuestion();
};

Communication.prototype.createQuestion = function() {
	var divNode = document.createElement('osar-container');  
	var arr = this.readObj(this.storeObj);
	arr.map(function(elem, index){
		divNode.appendChild(elem);
	});
	divNode.className = 'conversation-container';
	this.conversationNode.appendChild(divNode);

	this.warningToneNode.play();
	var questionNode = divNode.querySelector('osar-question');
	if(questionNode){
		this.tableXStrech(questionNode);
	}
};

Communication.prototype.createAnswer = function(){

};

Communication.prototype.createTextInputTemplate = function(data){
	var inputContainer = document.createElement('osar-input');
	inputContainer.className ='conversation-input';
	var inputElm = this.createTextarea();
	var submitBtn = this.createBtn();
	submitBtn.innerHTML = 'S';
	submitBtn.setAttribute('data-propname', data);
	submitBtn.addEventListener('click', this.inputSubmit.bind(this));
	inputContainer.appendChild(inputElm);
	inputContainer.appendChild(submitBtn);
	this.conversationNode.appendChild(inputContainer);
};

Communication.prototype.inputSubmit = function(){
	var propname = event.target.dataset.propname;
	var value = event.target.parentNode.querySelector('textarea').value;
	event.target.parentNode.parentNode.removeChild(event.target.parentNode);
	this.createAnswerTemplate(value);
	this.conversationSkip(propname);
	this.answerArr[propname] =value;
};

Communication.prototype.createBtn = function(){
	var btn = document.createElement('button');
	btn.className = 'conversation-btn';
	return btn;
};

Communication.prototype.createTextarea = function(){
	var inputElm = document.createElement('textarea');
	inputElm.className= 'conversation-textarea';
	inputElm.addEventListener('focus', function(){
		this.className= 'conversation-textarea conversation-textarea-focus';
	});
	inputElm.addEventListener('blur', function(){
		this.className = 'conversation-textarea conversation-textarea-blur';
	});
	return inputElm;
};

Communication.prototype.createAnswerTemplate = function(value){
	var parentNode = document.createElement('osar-container');
	parentNode.className = 'conversation-container';
	var childNode = document.createElement('osar-option');
	childNode.className = 'conversation-option conversation-option-clicked';
	childNode.innerHTML = value==='' ? '...' : value;
	parentNode.appendChild(childNode);
	this.conversationNode.appendChild(parentNode);
};

Communication.prototype.createClickResults = function(sourceObj){
	sourceObj.removeEventListener('click', this.optionClick);
	var parentNode = document.createElement('osar-container');
	parentNode.className = 'conversation-container';
	var childNode = document.createElement('osar-option');
	childNode.className = 'conversation-option conversation-option-clicked';
	childNode.innerHTML = sourceObj.innerHTML;
	parentNode.appendChild(childNode);
	sourceObj.parentNode.parentNode.removeChild(sourceObj.parentNode);
	this.conversationNode.appendChild(parentNode);
};

Communication.prototype.tableXStrech = function(questionNode){
	var offsetWidthEnd = questionNode.offsetWidth;
	var innerHTML = questionNode.innerHTML;
	questionNode.innerHTML= '...';
	questionNode.style.width = questionNode.offsetWidth+'px';
	var timer= setTimeout(function(){
		questionNode.innerHTML = innerHTML;
		questionNode.style.width = offsetWidthEnd+'px';
		clearTimeout(timer);
	}, 1000);
};


var cm = new Communication(arr);