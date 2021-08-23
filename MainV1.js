let can=document.getElementById("can"), ctx=can.getContext("2d"), game=setInterval(two,1);

function two(){tick();render()}
var objs=[]
init();

function tick(){
	C.tick();for(var i=0;i<objs.length;i++){objs[i].tick()}
}

function render(){ctx.fillStyle='rgb(0,0,0)'
	ctx.clearRect(0,0,can.width,can.height);ctx.strokeRect(0,0,can.width,can.height);
	for(var i=0;i<objs.length;i++){objs[i].render()}
	ctx.fillRect(Mngr.Mx,Mngr.My,10,10);
	Mngr.click=false;
}

function init(){
	class Manager{
		constructor(){
			document.addEventListener('mousemove',(e)=>{this.Mx=e.pageX-8;this.My=e.pageY-8});
			document.addEventListener('mousedown',(e)=>{
				this.left=e.button==0?true:this.left;this.right=e.button==2?true:this.right});
			document.addEventListener('mouseup',(e)=>{
				this.left=e.button==0?false:this.left;this.right=e.button==2?false:this.right});
			document.addEventListener('click',(e)=>{this.click=e.button==0?true:false});

		}
	}Mngr=new Manager();

	class Tree{a=270;w=250;pts=[];arr=[];itr=10;
		constructor(x,y){this.x=x;this.y=y;this.as=this.a}
		tick(){
			if(this.a>this.as+180){objs.splice(this,1)}
			else{this.a+=0.05}
			//if(Mngr.right){this.a+=0.05}
		}
		render(){ctx.fillStyle='rgb(0,0,0)';ctx.beginPath();this.pts=[];
			ctx.moveTo(this.x,this.y);this.pts.push([this.x,this.y-this.w,this.as]);
			ctx.lineTo(this.x,this.y-this.w);
			for(var i=1;i<this.itr+1;i++){this.arr=[];for(var j=0;j<this.pts.length;j++)
			{this.add(this.pts[j][0],this.pts[j][1],this.pts[j][2],i)}this.pts=this.arr}
			ctx.stroke();//ctx.fillText(`angle:${this.a}`,this.x,this.y);
		}
		add(x,y,a,i){ctx.moveTo(x,y);var w=this.w/1.5**i,r=(d)=>{
			return (a+(d*(this.a-this.as)))/180*Math.PI},
			xp=w*Math.cos(r(1)),yp=w*Math.sin(r(1)),
			xn=w*Math.cos(r(-1)),yn=w*Math.sin(r(-1));
			ctx.lineTo(x+xn,y+yn);this.arr.push([x+xn,y+yn,a-(this.a-this.as)]);ctx.moveTo(x,y);
			ctx.lineTo(x+xp,y+yp);this.arr.push([x+xp,y+yp,a+(this.a-this.as)]);
			//this.x+=Math.cos(this.a/r);this.y+=Math.sin(this.a/r);
		}
	}

	class Camera{
		tick(){
			if(Mngr.click){objs.push(new Tree(Mngr.Mx,Mngr.My))}
		}
	}C=new Camera();

}