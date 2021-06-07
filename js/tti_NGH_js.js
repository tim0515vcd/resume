var RequisitionID="(-:newtypefunc:Request("RequisitionID"):-)";
var ProcessID="(-:newtypefunc:Request("ProcessID"):-)";
var refill=parseInt("(-:newtypefunc:Request("refill"):-)");
var DraftFlag = $('[name=DraftFlag]').val();
var $tr1=$("#DetailTable tbody").find("tr");
var DeptID="(-:newtypefunc:cookie("DeptID"):-)";
var AccountID="(-:newtypefunc:cookie("AccountID"):-)";
DetailChange=false;
$(function(){
console.log("refill="+refill);
	if(RequisitionID!=''){	
		ShowInput();
		$(".tp2").hide();
		GetDetailField();
		$(".tp1").find("[type=text]").attr("readonly","readonly");
		$(".tp1").find("[type=text]").css("border","0px");
		if(DraftFlag != 1 && refill!=1&& refill!=3){
			$(".Ap2").attr("readonly","readonly");
			$(".Ap2").css("border","0px");
			$(".Ap1").find("[type=text]").attr("readonly","readonly");
			$(".Ap1").find("[type=text]").css("border","0px");
			$(".Ap1").find("[type=radio]").attr("disabled","disabled");
			$(".Ap1").find("textarea").attr("readonly","readonly");
			$(".Ap1").find("textarea").css("border","0px");
			GetAssign();
			$("#ag1").hide();
			if(ProcessID=="GoSpcDpt01"||ProcessID=="SpcMem11"||ProcessID=="AplSlf01"||ProcessID=="GoSpcDpt05"||ProcessID=="GoSpcDpt06")
			{
				$("#ag1").show();
			}
			if(ProcessID=="SpcMem09")//倉庫
			{
				$(".TA").removeAttr("disabled");
			}
			if(ProcessID=="SpcMem02")//營業
			{
				$(".TB").removeAttr("readonly");
				$(".TB").removeAttr("style");
			}
			if(ProcessID=="SpcMem03")//採購
			{
				$(".TC").removeAttr("readonly");
				$(".TC").removeAttr("style");
			}
			if(ProcessID=="SpcMem04")//生技
			{
				$(".TE").removeAttr("readonly");
				$(".TE").removeAttr("style");
			}
			if(ProcessID=="SpcMem05")//製造

			{
				$(".TF").removeAttr("readonly");
				$(".TF").removeAttr("style");
			}
			
			if(ProcessID=="GoSpcDpt07")//生管
			{
				$(".TG").removeAttr("readonly");
				$(".TG").removeAttr("style");
			}
			
			if(ProcessID=="SpcMem07")//製造單位及包裝確認
			{
				$(".TI").removeAttr("readonly");
				$(".TI").removeAttr("style");
				$(".TJ").removeAttr("disabled");
			}
			
			if(ProcessID=="SpcMem10"||ProcessID=="SpcMem08")//製造單位及包裝確認
			{
				$(".TK").removeAttr("readonly");
				$(".TK").removeAttr("style");
			}
			
		}
		
	}
	else
	{
		ShowInput();
		/*$(".TA").attr("disabled","disabled");
		$(".TB").attr("readonly","readonly");
		$(".TB").css("border","0px");
		$(".TC").attr("readonly","readonly");
		$(".TC").css("border","0px");
		$(".TE").attr("readonly","readonly");
		$(".TE").css("border","0px");
		$(".TF").attr("readonly","readonly");
		$(".TF").css("border","0px");
		$(".TG").attr("readonly","readonly");
		$(".TG").css("border","0px");
		$(".TF").attr("readonly","readonly");
		$(".TF").css("border","0px");
		$(".TI").attr("readonly","readonly");
		$(".TI").css("border","0px");
		$(".TJ").attr("disabled","disabled");
		$(".TK").attr("readonly","readonly");
		$(".TK").css("border","0px");*/
		
	}
	$("[name=WSDate]").focus(function(){
		WdatePicker({dateFmt:'yyyy/MM/dd'});
	});
	//新增明細表格==
	$("[name=imgAddDetail]").click(function(){
		//增加一列表格==
		AddDetail($("#DetailTable tbody"), $tr1);
	});
	//刪除該筆明細資料==
	$("[name=imgDelDetail]").click(function(){
		if($("#DetailTable tbody").find("tr").length==1)
		{
			$("[name^=checkboxID]:checked").each(function(){
				$(this).parent().parent().remove();
			});
			AddDetail($("#DetailTable tbody"), $tr1);
			ModName($("#DetailTable tbody"));
		}
		else
		{
			$("[name^=checkboxID]:checked").each(function(){
				$(this).parent().parent().remove();
			});
			
			ModName($("#DetailTable tbody"));
		}
		
		
		
	});
});
function applicantSubmit(){
	//檢核 -
	var msg = '';
	var tmp="false"; 
	var tmp2="";
	//if($('[name=SerialNum]').val()=='') msg += '請填編號!\n';
	if($('[name=model]').val()=='') msg += '請填規格!\n';
	if($('[name=HINum]').val()=='') msg += '請填重工數量!\n';
	if($('[name=Type]:checked').length==0) msg += '請填種類!\n';
	if($('[name=LOT]').val()=='') msg += '請填LOT!\n';
	if($('[name=PACKING]').val()=='') msg += '請填PACKING!\n';
	if($('[name=WSDate]').val()=='') msg += '請填原庫存最後日期!\n';
	//if($('[name=ProcessIns]:checked').length==0) msg += '請填種類!\n';
	
	if(msg!=''){
		alert(msg);
		return false;
	}
	return true;
}
function approveSubmit(){
	//檢核 -
	var msg = '';
	var tmp="false"; 
	var tmp2="";
	if(ProcessID=="GoSpcDpt01"||ProcessID=="SpcMem11"||ProcessID=="GoSpcDpt04"||ProcessID=="GoSpcDpt05"||ProcessID=="GoSpcDpt06")
	{
		if($('[name=assignd]').find(":selected").val()==" ") msg += '請選擇擔當!\n';
	}
	if(ProcessID=="SpcMem07")
	{
		if($('[name=AppName7]').val()=="") msg += '請填寫執行人員!\n';
	}
	
	
	
	if(msg!=''){
		alert(msg);
		return false;
	}
	return true;
}


/* 明細表單控制碼 */
function AddDetail(tobj,CopyTr) 
{
	//計算總行數時要扣掉標題行==
	var $table = $(tobj),
		//複製子表單裡明細的html
		$newTR = $(CopyTr).clone(true,true);
		
	totalTR= $table.find("tr").length+1;

	//隔行變色,透過Css==
	if (totalTR%2==0)
	{
		$newTR.closest("tr").removeClass();
		$newTR.closest("tr").addClass("grid_bg_even");
		
	}
	$newTR.find("input").each(function(){
		var $this = $(this),
			 thisName = $this.attr("id");

		thisName = thisName.replace(/\d/g, totalTR);
		
		$this.attr("name", thisName);
		$this.attr("id", thisName);
		$this.val("");
		if ($this.attr("type")=="checkbox")
		{
			$(this).attr("checked",false);
		}
	});
	//下拉式選單==
	$newTR.find("select").each(function(){
		var $this = $(this),
			 thisName = $this.attr("id");
		//將新的欄位更名使用replace
		thisName = thisName.replace(/\d/g, totalTR);
		$this.attr("name", thisName);
		$this.attr("id", thisName);
		$this.val("");
	});
	//插入到Table後方==
	$table.append($newTR);
}

//子表單td重新編碼 參數tobj:表單名==
function ModName(tobj)
{
	var tmpname;
	var newID=0;

	$(tobj).find("tr").each(function(i){

		//修改input、select元件 name與id ==
		$(this).find("input,select").each(function(){
			tmpname=$(this).attr("name");
			//將新的欄位更名使用replace
			newID=i+1;
			
			tmpname = tmpname.replace(/\d/g,"");
			tmpname = tmpname+newID.toString();
			$(this).attr("name",tmpname);
			$(this).attr("id",tmpname);
		});
	});
}

//新增明細==
function AddDetailTable()
{
	var flag=0;
	
	for(var i=1; $("[name=tdname"+i+"]").length!=0; i++){
		if ($("[name=tdname"+i+"]").val()!="")
		{
			$.ajax({
				type: "POST",
				url: "tti_NGH_AddDetail.aspx",
				async: false,
				data:{RequisitionID:$("[name=RequisitionID]").val(),
						name:$("[name=tdname"+i+"]").val(),
						Model:$("[name=tdModel"+i+"]").val(),
						Demand:$("[name=tdDemand"+i+"]").val(),
						Content:$("[name=tdContent"+i+"]").val(),
						},
				success: function(msg){
					if(msg!="true"){
						flag++;
					}
					//alert(msg);
				}
			});
		}
		
	}
	
	return (flag==0);
}
//刪除明細==
function DelDetailTable()
{
	var flag=0;
	$.ajax({
		type: "POST",
		url: "tti_NGH_DelDetail.aspx",
		async: false,
		dataType:"text",
		data:{RequisitionID:$("[name=RequisitionID]").val()},
		success: function(msg){
			if(msg!="true"){
				flag++;
			}
		}
	});
	
	return (flag==0);
}
//取得明細==
function GetDetailField()
{
	var i=1;
	var xml;
	var e;
	$.ajax({
		type: "POST",
		url: "tti_NGH_GetDetail.aspx",
		async: false,
		dataType: "xml",
		data:{RequisitionID:RequisitionID},
		success: function(msg){
			xml=msg;
		},
		error: function(e) {
			//錯誤訊息
		}
	});


	$(xml).find("xml").each(function(){  
		$(this).children("AutoCounter").each(function(){
		
			//動態新增一行html表格
			if (i>1) 
			{
				 AddDetail($("#DetailTable tbody"), $tr1);
			}

			//將xml資料轉到對應變數裡==
			var name=$(this).children("name").text();
			var Model=$(this).children("Model").text();
			var Demand=$(this).children("Demand").text();
			var Content=$(this).children("Content").text();
			
			
			
			//變數資料轉到子表單中==
			$("[name=tdname"+i+"]").val(name);
			$("[name=tdModel"+i+"]").val(Model);
			$("[name=tdDemand"+i+"]").val(Demand);
			$("[name=tdContent"+i+"]").val(Content);
		
			i++;
		});
	});
}

function ShowInput()
{
	$(".TA").attr("disabled","disabled");
	$(".TB").attr("readonly","readonly");
	$(".TB").css("border","0px");
	$(".TC").attr("readonly","readonly");
	$(".TC").css("border","0px");
	$(".TE").attr("readonly","readonly");
	$(".TE").css("border","0px");
	$(".TF").attr("readonly","readonly");
	$(".TF").css("border","0px");
	$(".TG").attr("readonly","readonly");
	$(".TG").css("border","0px");
	$(".TI").attr("readonly","readonly");
	$(".TI").css("border","0px");
	$(".TJ").attr("disabled","disabled");
	$(".TK").attr("readonly","readonly");
	$(".TK").css("border","0px");
}


//取得擔當==
function GetAssign()
{
	var i=1;
	var xml;
	var e;
	$.ajax({
		type: "POST",
		url: "GetAssign.aspx",
		async: false,
		dataType: "xml",
		data:{
			DeptID:DeptID,
			AccountID:AccountID,
			ProcessID:ProcessID
		},
		success: function(msg){
			xml=msg;
		},
		error: function(e) {
			//錯誤訊息
		}
	});


	$(xml).find("xml").each(function(){  
		$(this).children("AutoCounter").each(function(){

			//將xml資料轉到對應變數裡==
			var AccountID=$(this).children("AccountID").text();
			var DisplayName=$(this).children("DisplayName").text();
			
			
			
			//變數資料轉到子表單中==
			$("[name=assignd]").append('<option value="'+AccountID+'">'+DisplayName+'</option>');


		});
	});
}


function upNGH_M(){
	var RequisitionID=$("[name=RequisitionID]").val();
	var PID=$("[name=ProcessID]").val();
	$.ajax({
			type: "GET",
			async:false,
			cache:false,
			url: "tti_NGH_UpdateM.aspx",
			data:{
				RequisitionID:RequisitionID,
				ProcessID:PID,
				content3:$("[name=content3]").val(),
				content4:$("[name=content4]").val(),
				content5:$("[name=content5]").val(),
				content6:$("[name=content6]").val(),
				content7:$("[name=content7]").val(),
				content8:$("[name=content8]").val(),
				AppName2:$("[name=AppName2]").val(),
				TransferCabin:$("[name=TransferCabin]:checked").val(),
				PackingCheck:$("[name=PackingCheck]:checked").val(),
				AppName7:$("[name=AppName7]").val(),
				}
			,success: function(msg)
			{
				
				if(msg!="true")
				{
					alert(msg);
				}
			}
		});	

}