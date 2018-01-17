function insertSort(arr){
	for(var i = 1, len = arr.length;i < len; i++){
		if(arr[i]<arr[i-1]){
			var num = arr[i];
			arr[i] = arr[i-1];
			for(var j = i-2; num < arr[j]; j--){
				arr[j+1] = arr[j];
			}
			arr[j+1] = num;
		}
	}
	console.log(arr);
}

//insertSort([2,4,9,8,3,7,5,12]);

function bubbleSort(arr){
	var num = void 0;
	for(var i = 0,len = arr.length;i<len;i++){
		for(var j = 0;j<len-i;j++){
			if(arr[j]>arr[j+1]){
				num = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = num;
			}
		}
	}
	console.log(arr);
}

//bubbleSort([2,4,9,8,3,7,5,12,11,6]);

var firstMissingPositive = function(nums) {
    nums.sort(function(a, b){
    	return a-b;
    });
    var startNum = void 0;
    for(var i = 0,len = nums.length; i<len; i++){
    	if(nums[len -1] <= 0){
    		return 1;
    	}else if(nums[0] >1){
    		return 1;
    	}
    }
};

//firstMissingPositive([2, 11, 6, 7, 4, 3, 8]);

function Node(value){
	this.value = value;
	this.left = null;
	this.right = null;
	this.parent = null;
}

Node.prototype.setLeft = function(node){
	this.left = node;
}

Node.prototype.setRight = function(node){
	this.right = node;
}

function sortGothroughTree(node){
	console.log(node.value);
	if(node.left){
		sortGothroughTree(node.left);
	}
	if(node.right){
		sortGothroughTree(node.right);
	}
}

function printPath(node, str){
	str+= node.value;
	if(node.left){
		printPath(node.left, str);
	}
	if(node.right){
		printPath(node.right, str);
	}
	if(!node.left && !node.right){
		console.log(str);
	}
}

var root = new Node(1);
var child1 = new Node(17);
var child2 = new Node(21);
var child3 = new Node(12);
var child4 = new Node(5);
root.setLeft(child1);
root.setRight(child2);
child2.setLeft(child3);
child2.setRight(child4);

function ergodic(node){
	var arr = [];
	var top = -1;
	while(node || top != -1){
		if(node){
			console.log(node.value);
			arr[++top] = node;
			node = node.left;
		}else{
			node = arr[top--];
			node = node.right;
		}
	}
}



//console.log(arr);

function fibNaci(n){
	if(n === 1){
		return 1;
	}
	if(n === 2){
		return 1;
	}
	var arr = [1,1];
	for (let i = 2;i < n; i++){
		arr[i] = arr[i-1]+arr[i-2];
	}
	return arr[n-1];
}

//console.log(fibNaci(6));

function minCoinNum(n){
	var arr = [0, 1, 2, 1, 2, 1];
	for(var i=6; i<=n; i++){
		arr[i] = Math.min(arr[i-1], arr[i-3], arr[i-5])+1;
	}
	return arr[n];
}

//console.log(minCoinNum(6));

function strDistance(str1, str2){
	var arr = [];
	for(let i=0;i<=str1.length;i++){
		arr[i] = [];
		arr[i][0] = i;
	}
	for(let i=0;i<=str2.length;i++){
		arr[0][i] = i;
	}
	//arr init

	for(let i=0;i<str1.length;i++){
		for(let j=0;j<str2.length;j++){
			arr[i+1][j+1]=Math.min(arr[i][j]+(str1[i]==str2[j] ? 0:1), arr[i][j+1]+1, arr[i+1][j]+1);
		}
	}
	console.log(arr);
	return arr[str1.length][str2.length];
}
//console.log(strDistance("haha ausar","haha nrl"));
function lcs(arr1, arr2){
	if(arr1.length ===0||arr2.length ===0)
		return [];
	let arr = [];
	for(let i=0;i<arr1.length;i++){
		arr[i] = [];
		arr[i][0] = [];
		if(arr1[i] === arr2[0]){
			arr[i][0].push(arr2[0]);
		}
	}
	for(let j=1;j<arr2.length;j++){
		arr[0][j] = [];
		if(arr2[j] === arr1[0]){
			arr[0][j].push(arr1[0]);
		}
	}
	for(let i =1;i<arr1.length;i++){
		for(let j=1;j<arr2.length;j++){
			arr[i][j] = [];
			if(arr1[i] === arr2[j]){
				arr[i][j] = arr[i-1][j-1].slice(0);
				arr[i][j].push(arr1[i]);
			}else{
				if(arr[i][j-1].length>arr[i-1][j].length){
					arr[i][j] = arr[i][j-1].slice(0);
				}else{
					arr[i][j] = arr[i-1][j];
				}
			}
		}
	}
	return(arr[arr1.length-1][arr2.length-1]);
}

function lis(arr1){
	if(arr1.length === 0)
		return [];
	let arr = [];
	arr[0]=[[arr1[0]]];
	for(let i = 1;i<arr1.length;i++){
		arr[i] = arr[i-1].slice(0);
		arr[i].push([arr1[i]]);
		arr[i].map((data)=>{
			if(arr1[i]>data[data.length-1]){
				var newData = data.slice(0);
				newData.push(arr1[i]);
				arr[i].push(newData);
			}	
		})
	}
	console.log(arr[arr.length-1]);
}
//lis([1,3,7,5,2]);

function packSteal(cosArr, weightArr, total){
	let n = cosArr.length;
	let Value = [];
	for(let i=0;i<=n;i++)
		Value[i]=[];
	for(let j=0;j<=total;j++)
		Value[0][j]=0;
	for(let i=1;i<=n;i++){
		Value[i][0]=0;
		for(let j=1;j<=total;j++){
			if(j>=weightArr[i-1]){
				Value[i][j]=Math.max(Value[i-1][j], Value[i-1][j-weightArr[i-1]]+cosArr[i-1]);
			}else{
				Value[i][j]=Value[i-1][j];
			}
		}
	}
	return Value[6][120];	
}

console.log(packSteal([0,10,25,40,20,10],[0,40,50,70,40,20],120));
