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
console.log(root, child1, child2, child3, child4);

printPath(root, '');

//sortGothroughTree(root);