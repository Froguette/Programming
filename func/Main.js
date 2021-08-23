let can=document.getElementById("can"),ctx=can.getContext("2d"),game=setInterval(two,1);
var clrs=['rgb(0,0,0)','rgb(255,255,255)','rgb(0,255,0)'],Sclr=(r,g,b)=>{ctx.fillStyle=`rgb(${r},${g},${b})`;ctx.strokeStyle=`rgb(${r},${g},${b})`};
ctx.lineWidth=6;
init();
console.log(Math.round(Math.random()*15).toString(16)+'exe')
function two(){tick();render()}
function tick(){
	grd.tick();
	//console.log(can.height);console.log(can.width);
}
function render(){Sclr(255,255,255);
	ctx.fillRect(0,0,can.width,can.height);
	grd.render();Sclr(255,255,255);
	ctx.fillRect(Mngr.Mx,Mngr.My,10,10);
}

var h=0;for(var i=0;i<50;i++){if(i%3==0){h++}}console.log(h);//Math.round(Math.random()*100)

function init(){
	class Manager{left=false;right=false;whl=false;Mx=0;My=0;nums=[];symb="";
		constructor(){document.addEventListener('mousemove',(e)=>{this.Mx=e.pageX-8;this.My=e.pageY-8});
		document.addEventListener('mousedown',(e)=>{this.left=e.button==0?true:this.left;
			this.right=e.button==2?true:this.right;this.whl=e.button==1?true:this.whl;});
		document.addEventListener('mouseup',(e)=>{this.left=e.button==0?false:this.left;
			this.right=e.button==2?false:this.right;this.whl=e.button==1?false:this.whl;});
		document.addEventListener('click',(e)=>{
			this.clkd=true;
		});
		document.addEventListener('keydown',(e)=>{this.prsd=true;
			for(var i=0;i<10;i++){this.nums[i]=e.key==i?true:this.nums[i];}
				if(e.keyCode==8){this.Bck=true}if(e.key==','){this.comm=true}
				this.symb=e.key;});//console.log(this.symb);
		document.addEventListener('keyup',(e)=>{this.prsd=false;for(var i=0;i<10;i++){
			this.nums[i]=e.key==i?false:this.nums[i];}if(e.keyCode==8){this.Bck=false}
			if(e.key==','){this.comm=false}this.symb="";});
		}
	}Mngr=new Manager();


	class Grid{Lw=700;Lh=10;scl=50;funcs=[[(x)=>{return 3*x},[255,0,0]],[(x)=>{return Math.sin(x)},[0,255,0]]
		,[(x)=>{return Math.cos(x)},[0,0,255]]];
		constructor(){}
		tick(){
			if(Mngr.symb=='a'){this.scl+=0.5}if(Mngr.symb=='e'){this.scl-=0.5}
			this.W=can.width/this.scl;this.H=can.height/this.scl;
			//this.Xoff=(2+this.scl)*this.W/2;this.Yoff=(2+this.scl)*this.H/2;
			this.Ox=(2+this.scl)*Math.round(this.W/2);this.Oy=(2+this.scl)*Math.round(this.H/2);
		}
		render(){Sclr(0,0,0);
			for (var i=0;i<this.W;i++){
				for(var j=0;j<this.H;j++){
				ctx.fillRect((2+this.scl)*i,(2+this.scl)*j,this.scl,this.scl)}
			}Sclr(255,255,255);
			ctx.fillRect(this.Ox-this.Lw/2,this.Oy-this.Lh/2,this.Lw,this.Lh);
			ctx.fillRect(this.Ox-this.Lh/2,this.Oy-this.Lw/2,this.Lh,this.Lw);
			for(var i=0;i<this.funcs.length;i++){this.draw(i)}
			//ctx.drawImage(trl,100,100,300,200);
		}
		draw(ind){var lng=Math.floor(this.Lw/this.scl);var f=this.funcs[ind];
			ctx.beginPath();ctx.moveTo(this.Ox+(-lng/2)*(2+this.scl+2),this.Oy-f[0](-lng/2)*(this.scl+2));
			for(var i=-lng/2;i<lng;i++){Sclr(f[1][0],f[1][1],f[1][2]);
				ctx.lineTo(this.Ox+i*(this.scl+2),this.Oy-f[0](i)*(this.scl+2));
			}
			ctx.stroke();
		}
	}grd=new Grid();
}