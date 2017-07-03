var s = "star";
        	var unsubmitted = true;
        	var flag = "havenot";
            function change(i){
            	if(unsubmitted){
	            	for(var j = 1; j <= i; j++){
	            		j = j.toString();
	            		document.getElementById(s+j).src = "star_filled.png";
	            	}
	            	vum.mark = i;
	            }	
            }
            function ret(i){
            	if(unsubmitted){
	            	for(var j = 5; j >=1; j--){
	            		j = j.toString();
	            		document.getElementById(s+j).src = "star_blank.png";
	            	}
	            	vum.mark = 0;
	            }
            }
            function submit(i){
            	//于是乎这个该提交到哪里。。。。。。
            	if(unsubmitted){
            		unsubmitted = false;
            		alert("评价成功！");
            	}else{
            		alert("不能重新评价！")
            	}
            }
            function changeFlag(){
            	if(flag == "have"){
            		document.getElementById('flag').src = "havenot.png";
            		flag = "havenot";
            	}
            	else{
            		document.getElementById('flag').src = "have.png";
            		flag = "have";
            	}
            }
            function toFormer(){
            	unsubmitted = true;
            	for(var j = 5; j >=1; j--){
	            		j = j.toString();
	            		document.getElementById(s+j).src = "star_blank.png";
	            	}
	            	vum.mark = 0;
            	document.getElementById('detail-text').style.display = "none";
                document.getElementById('press').style.display = "block";
                document.getElementById('result-background').style.display = "block";
                document.getElementById('empty-box').style.display = "block";
                document.getElementById('input-box').style.display = "block";
            }