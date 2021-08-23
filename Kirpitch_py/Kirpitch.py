import pygame as pg
import math
pg.init()
run=True

tls=[];
for i in range(5):tls.append(pg.image.load(f"Tiles/{i}.png"))
tlsU=tls
dsrt=open("maps/desert.txt").read().split("\n")
for i in range(len(dsrt)):
	dsrt[i]=dsrt[i].split(" ")
	for j in range(len(dsrt[i])):
		dsrt[i][j]=int(dsrt[i][j])
cntrls=[[pg.K_a,pg.K_w,pg.K_d,pg.K_s,pg.K_f,pg.K_r],
		[pg.K_LEFT,pg.K_UP,pg.K_RIGHT,pg.K_DOWN,pg.K_KP1,pg.K_KP2]]

win=pg.display.set_mode((1920,1800),pg.RESIZABLE)
x=0;y=0;dt=0;w=0;h=0
old=pg.time.get_ticks();scl=128;xO=0;yO=0

class Camera():
	def __init__(self,p_nm):
		self.p_nm=p_nm
	def tick(self,p,mapD):
		global xO,yO
		
		xO=max(min(-(p.x*scl-w//2),-scl),-(mapD[0])*scl)
		yO=max(min(-(p.y*scl-w//2),-scl),-(mapD[1])*scl)
		nw=w//scl
		nh=h//scl


class Player():
	def __init__(self,i):
		self.mhp=100;self.hp=self.mhp;self.spd=0.002
		self.i=i;self.x=2.5;self.y=2.5;self.a=0
	def tick(self,map):
		global scl;dt
		ks=pg.key.get_pressed()
		self.xD=math.cos(self.a);self.yD=math.sin(self.a)
		if ks[cntrls[self.i][1]]:# and map[int(self.x+self.xD*self.spd*dt)][int(
			#self.y+self.yD*self.spd*dt)]==0:
			self.x+=self.xD*self.spd*dt#*self.cld(map,[self.x,self.xD],[self.y,0],1)
			self.y+=self.yD*self.spd*dt#*self.cld(map,[self.x,0],[self.y,self.yD],1)
		if ks[cntrls[self.i][3]]:# and map[int(self.x-self.xD*self.spd*dt)][int(
			#self.y-self.yD*self.spd*dt)]==0:
			self.x-=self.xD*self.spd*dt#*self.cld(map,[self.x,self.xD],[self.y,0],-1)
			self.y-=self.yD*self.spd*dt#*self.cld(map,[self.x,0],[self.y,self.yD],-1)
		if ks[cntrls[self.i][0]]:self.a-=0.01*dt
		if ks[cntrls[self.i][2]]:self.a+=0.01*dt
		if ks[pg.K_t]:scl+=1*dt
		if ks[pg.K_g]:scl-=1*dt
		if ks[pg.K_i]:self.x=2.5;self.y=2.5
		

		if self.a<0:self.a+=math.pi*2
		elif self.a>math.pi*2:self.a-=math.pi*2
	def render(self):
		x=int((self.x-0.5)*scl)+xO
		y=int((self.y-0.5)*scl)+yO
		pg.draw.rect(win,(0,255,0),(x,y,scl/8,scl/8))
		pg.draw.rect(win,(0,0,255),(x+int(self.xD*scl),
									y+int(self.yD*scl),scl/4,scl/4))
		#print(math.sqrt(int(self.xD*scl)**2+int(self.yD*scl)**2))
	def cld(self,map,c1,c2,d):
		return map[int(c1[0]+c1[1]*self.spd*d)][int(c2[0]+c2[1]*self.spd*d)]==0

class Game():
	def __init__(self,map,p):
		self.map=map;self.p=p;self.C=Camera(p)
	def tick(self):
		self.p.tick(self.map)
		self.C.tick(self.p,[len(self.map[0]),len(self.map)])
	def render(self):
		global xO,yO
		for i in range(len(self.map)):
			for j in range(len(self.map[0])):
				id=self.map[i][j]
				img=pg.transform.scale(tls[id],(scl,scl))
				win.blit(img,(j*scl+xO,i*scl+yO))

		#print(xO)
		self.p.render()
G=Game(dsrt,Player(0))

while run:
	w,h=win.get_size()
	scl=min(scl,int(w/3));scl=max(30,scl)
	win.fill((0,0,0))
	

	size=pg.display.get_window_size()
	
	
	
	t=pg.time.get_ticks();dt=(t-old);old=t
	G.tick()
	G.render()
	
	pg.display.update()
	for e in pg.event.get():
		if e.type==pg.QUIT:
			run=False
pg.quit()