/*
 *这个组件的作用是实现选项卡功能 
 */

//需要jquery支持
/**
 * JS选项卡组件
 * @param {Object} btns
 * @param {Object} shows
 * @param {Object} num
 */

function tabclick(btns,shows,num)
{
	this.init(btns,shows,num);
}

tabclick.prototype.init = function(btns,shows,num)
{
	this.length = btns.length;
	this.btns = btns;
	this.shows = shows;
	this.current =-1;
	
	//隐藏全部选项卡内容
	shows.forEach(function(a){a.addClass('hidden');});
	//激活指定选项卡
	this.active(num);
	this.events();
}

tabclick.prototype.active =function (num)
{
	if(num==this.current){return;}
	//激活新的
	this.btns[num].addClass('active');
	this.shows[num].removeClass('hidden');
	//清除旧的
		console.log('的current为'+this.current);
	if(this.current==-1){this.current = num;return;}
	this.btns[this.current].removeClass('active');
	this.shows[this.current].addClass('hidden');
	//转置
	this.current = num;
	
}

tabclick.prototype.events = function(a)
{
	var that = this;
	for(let i=0;i<this.length;i++)
	{
		this.btns[i].on('click',function(event){
			that.active(i);
		});
	}
}


//loading弹窗
var LOADINGANMITION =
{
	loadigDom: $('<div style="z-index:11;position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(8,8,8,0.8);width:100%;height:100%"><div class="overLay-animation"><div class="animation-loading"></div><p>请稍等。。。</p></div></div>'),
	show: function()
	{
		$body.append(this.loadigDom); 
	},
	hidden: function()
	{
		this.loadigDom.remove();
	}
}

