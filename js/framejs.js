//選擇表單(<select name="select" id="select_form" onchagne = "SelectForm(this)">)
function SelectForm(obj){

//javascript獲取select控制元件的value和text值
var selecteItem = document.getElementById("select_form");//拿到select物件
var index = selecteItem.selectedIndex ;  //拿到選中項的索引
var selectedValue = selecteItem.options[index].value;//拿到選中項options的value
var select_form = selecteItem.options[index].text;//拿到選中項options的text

//jQuery獲取select控制元件的value和text值
$("#select_form option:selected").val()
$("#select_form option:selected").text()

if (obj.value=="ngh") {
	document.getElementById("i_frame").src="ngh.html";
}
if (obj.value=="defual") {
	document.getElementById("i_frame").src="defual.html";
}
if(obj.value=="other"){
	document.getElementById("i_frame").src="index.html";
}
}

function load(){
//下面兩種方法效果是一樣的
document.getElementById("target").onclick();
document.getElementById("target").click();
}

function BtnClick(){
	var ngh = document.getElementById("ngh");
	var defual = document.getElementById("defual");
	var other = document.getElementById("other");
	
	if (ngh.value=="ngh"){
		document.getElementById("i_frame").src="ngh.html";
		
	}
	if (defual.value=="defual") {
		document.getElementById("i_frame").src="defual.html";
		
	}
	if (other.value=="other") {
		document.getElementById("i_frame").src="index.html";

	}
}

function test(){
	var select_form = document.getElementById("select_form").value
	var i_frame = document.getElementById("i_frame")

	if (select_form=="ngh"){
		i_frame.src="ngh.html";
		
	}
	if (select_form=="defual") {
		document.getElementById("i_frame").src="defual.html";
		
	}
	if (select_form=="other") {
		document.getElementById("i_frame").src="index.html";

	}
	if (select_form=="#") {
		alert("請選擇單據");
		console.log("請選擇單據");
		console.log(NaN || 1-"1" || 1+"1" || 1*"1")
	}
}
