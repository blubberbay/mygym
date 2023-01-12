function Button(x,y,radius,color,txt="" )
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.txt = txt;
	this.font = "bold 12px Arial"
	this.state = "inactive"
	
	this.get_state = function()
	{
		return this.state
	}
	
	this.button_pressed = function()
	{
		this.state = "active"
	}
	
	this.button_depressed = function()
	{
		this.state = "inactive"
	}
	
	this.get_button_txt = function()
	{
		return this.txt;
	}
	
	this.get_button_dims = function()
	{
		return [this.x, this.y, this.radius]
	}
	
	this.get_color = function()
	{
		switch( this.state ){
			case "inactive" : return this.color[0]; break;
			case "active": return this.color[1]; break;
			default:
		}
	}
	
	this.display_button = function(){
        // disable drawing outline
		
		context = canvas.getContext("2d");
		context.fillStyle = fill(this.get_color());
		noStroke();
		ellipse(this.x, this.y, this.radius, this.radius);
		context.font = this.font;
		context.fillStyle = fill("white")
		text( this.txt, this.x - textWidth( this.txt) / 2, this.y ); 
		//context.fillText(this.x - textWidth( this.txt) / 2, this.y, this.txt);
		
		this.button_depressed() //after displaying a button make sure it's inactive
		
	}
}

/*
function make_rings(x,y,radius,n_rings,color)
{
  shapes = {}
  states = ["active","inactive"];
  
  for( j=0; j<2; j++ )
  {
	PShape rings;
	rings = createShape(GROUP);

	  noStroke()
	for( var i = 0; i <n_rings; i++ )
	{
		radius = this.radius/5 * (1 - Math.pow(0.5, 2*(i+1))) 
		head = ellipse(x, y, radius, radius ) 
		head.setFill( c )
		rings.addChild(head);
	}
	
	shapes[ states[j] ] = grp 
	}
console.log(shapes[states[1]])
	return shapes
}
*/
function PatternButton(x, y, radius, color, txt, n_rings =3 ){
	Button.call(this, x,y,radius,color, txt );	
	this.n_rings = n_rings
	
	this.rings = make_rings( this.x, this.y, this.radius, this.color, this.n_rings )
	
	this.display_button = function()
	{
		    context = canvas.getContext("2d");
			this.rings[ this.get_state() ];

			context.font = this.font;
			context.fillStyle = fill("white");
			text( this.txt, this.x - textWidth( this.txt) / 2, this.y ); 
			//context.fillText(this.x, this.y, this.txt);
		
			this.button_depressed() //after displaying a button make sure it's inactive

	}
}
PatternButton.prototype = Object.create(Button.prototype);


function StartTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Start Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().start_timer()
	}
}
StartTimerButton.prototype = Object.create(Button.prototype);

function StopTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Stop Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().stop_timer()
	}
}
StopTimerButton.prototype = Object.create(Button.prototype);

function ResetTimerButton( x,y, radius, color ){
	Button.call(this, x,y,radius,color, "Reset Time");

	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.get_current_room().reset_timer()
	}
}
ResetTimerButton.prototype = Object.create(Button.prototype);


function ChangeRoom(x,y, radius, color, next_room ){
	Button.call(this, x,y,radius,color, next_room);
	this.args = next_room 
	
	this.Pressed = function(obj)
	{
		this.button_pressed()
		obj.set_room( this.args );		
	}
}
ChangeRoom.prototype = Object.create(Button.prototype);







