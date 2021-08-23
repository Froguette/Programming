let can=document.getElementById("can"), ctx=can.getContext("2d"), game=setInterval(two,1);

function two(){tick();render()}
var objs=[]
init();
s=[// SOUTH
	[[0,0,0], [0,1,0], [1,1,0]],
	[[0,0,0], [1,1,0], [1,0,0]],
	// EAST                                                      
	[[1,0,0], [1,1,0], [1,1,1]],
	[[1,0,0], [1,1,1], [1,0,1]],
	// NORTH                                                     
	[[1,0,1], [1,1,1], [0,1,1]],
	[[1,0,1], [0,1,1], [0,0,1]],
	// WEST                                                      
	[[0,0,1], [0,1,1], [0,1,0]],
	[[0,0,1], [0,1,0], [0,0,0]],
	// TOP                                                       
	[[0,1,0], [0,1,1], [1,1,1]],
	[[0,1,0], [1,1,1], [1,1,0]],
	// BOTTOM                                                    
	[[1,0,1], [0,0,1], [0,0,0]],
	[[1,0,1], [0,0,0], [1,0,0]],
];
var mtx=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];




var Fn=0.1,Ff=1000.0,Ffov=90.0,ar=can.height/can.width,FfovR=1.0/Math.tan((Ffov*0.5/180*Math.PI)),
Sclr=(r,g,b)=>{ctx.fillStyle=`rgb(${r},${g},${b})`;ctx.strokeStyle=`rgb(${r},${g},${b})`};
/*var pr=[
	[ar*FfovR, 0,      0,         0],
	[  0,   FfovR,     0,         0],
	[  0,     0,  Ff/(Ff-Fn),     1],
	[  0,     0, (-Ff*Fn)/(Ff-Fn),0]
];*/
var pr =Array.from(mtx);

var fNear = 0.1,fFar = 1000.0,fFov = 90.0,AspectRatio =can.height/can.width,fFovRad = 1.0/Math.tan(fFov*0.5/180.0*Math.PI);
pr[0][0] = AspectRatio * fFovRad;
pr[1][1] = fFovRad;
pr[2][2] = fFar / (fFar - fNear);
pr[3][2] = (-fFar * fNear) / (fFar - fNear);
pr[2][3] = 1.0;
pr[3][3] = 0.0;


function matMul(i,m){
	var o=[0,0,0,0];
	for(var j=0;j<4;j++){o[j]=i[0]*m[0][j]+i[1]*m[1][j]+i[2]*m[2][j]+m[3][j];}
	if(o[3]!=0){for(var p=0;p<3;p++){o[p]/=o[3]}}return o;
}




function tick(){

}
var Theta=0;
function render(){
	mtx=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	Sclr(0,0,0);
	//ctx.clearRect(0,0,can.width,can.height);//ctx.strokeRect(0,0,can.width,can.height);
	ctx.fillRect(0,0,can.width,can.height);
	//Sclr(0,0,255);ctx.fillRect(100,100,100,100);
	Sclr(255,255,255);ctx.lineWidth=1;

	var RotZ=Array.from(mtx),RotX=Array.from(mtx);//
	Theta += 0.001;
	// Rotation Z
	RotZ[0][0] = Math.cos(Theta);
	RotZ[0][1] = Math.sin(Theta);
	RotZ[1][0] = -Math.sin(Theta);
	RotZ[1][1] = Math.cos(Theta);
	RotZ[2][2] = 1;
	RotZ[3][3] = 1;
	RotX=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	// Rotation X
	RotX[0][0] = 1;
	RotX[1][1] = Math.cos(Theta * 0.5);
	RotX[1][2] = Math.sin(Theta * 0.5);
	RotX[2][1] = -Math.sin(Theta * 0.5);
	RotX[2][2] = Math.cos(Theta * 0.5);
	RotX[3][3] = 1;


	for(var i=0;i<s.length;i++){

		///////////////////////////////////////////////////////
		
		var trz=[],trzx=[];
		trz[0]=matMul(s[i][0],RotZ);
		trz[1]=matMul(s[i][1],RotZ);
		trz[2]=matMul(s[i][2],RotZ);
		//console.log(trz[0])
		trzx[0]=matMul(trz[0],RotX);
		trzx[1]=matMul(trz[1],RotX);
		trzx[2]=matMul(trz[2],RotX);
		
		//trzx=s[i];

		var tr1=[...trzx[0]],tr2=[...trzx[1]],tr3=[...trzx[2]];
		tr1[2]+=3;
		tr2[2]+=3;
		tr3[2]+=3;

		var p1=matMul(tr1,pr),p2=matMul(tr2,pr),p3=matMul(tr3,pr),h=can.height/2,w=can.width/2;
		
		ctx.beginPath();
		ctx.moveTo((1+p1[0])*w,(1+p1[1])*h);
		ctx.lineTo((1+p2[0])*w,(1+p2[1])*h);
		ctx.lineTo((1+p3[0])*w,(1+p3[1])*h);
		ctx.lineTo((1+p1[0])*w,(1+p1[1])*h);
		ctx.stroke();//ctx.fill();
		//console.log(p1)

	}Sclr(255,255,255);
//ctx.fillRect(0,0,100,100)

	/*for(var i=0;i<objs.length;i++){objs[i].render()}
	ctx.fillRect(Mngr.Mx,Mngr.My,10,10);
	Mngr.click=false;*/

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