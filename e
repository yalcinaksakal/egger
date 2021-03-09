@cube_size: 100px;
@half_cube_size: @cube_size / 2;

.plane_transform(@x:0, @y:0, @z:0, @rx:0,@ry:0){
	transform: translate3d(@x, @y, @z) rotateX(@rx) rotateY(@ry);
}

html,body{
	width: 100%;
	height: 100%;
	background-color: white;
	user-select: none;
}
.wrapper{
	width: @cube_size;
	height: @cube_size;
	
	perspective: 400px;
	margin: 0 auto;
	padding: 100px;
}
.cube{
	position: relative;
	transform-style: preserve-3d;
	width: @cube_size;
	height: @cube_size;
    // animation: rotate_cube 1s linear infinite;
}
.cube > .plane{
	position: absolute;
	left: 0;
	width: @cube_size;
	height: @cube_size;
	background: -webkit-linear-gradient(right bottom, #f96, #f00);
	box-sizing: border-box;
	text-align: center;
	line-height: @cube_size;
	color: yellow;
	font-size: 3em;
}

.plane.a{
	.plane_transform(0px,-@half_cube_size, @half_cube_size, 90deg);
}
.plane.b{
	.plane_transform(0,0, @cube_size);
}
.plane.c{
	.plane_transform(@half_cube_size, 0, @half_cube_size, 0, 90deg);
}
.plane.d{
	.plane_transform(0, @half_cube_size, @half_cube_size, 90deg);
}
.plane.e{
	.plane_transform(-@half_cube_size, 0, @half_cube_size, 0, 90deg);
}
.plane.f{
	.plane_transform(0, 0, 0, 0, 45deg);
}

@keyframes rotate_cube {
	0%{
		transform: rotate3d(1,1,1, 0deg);
	}
	50% {
		transform: rotate3d(-1,1,-1, 180deg)
	}
	100%{
		transform: rotate3d(1,0.5,1, -360deg)
	}
}