var canvas_pct = 0.1;
var ButtonLocations = [];
ButtonLocations[0] = [canvas_pct, canvas_pct];
ButtonLocations[1] = [canvas_pct, (0.5 + canvas_pct)/2];
ButtonLocations[2] = [canvas_pct, 0.5];

ButtonLocations[3] = [1.0-canvas_pct, canvas_pct];
ButtonLocations[4] = [1.0-canvas_pct, (0.5 + canvas_pct)];
ButtonLocations[5] = [1.0 - canvas_pct, .5];

var ButtonSize = 100;

function Gym( start_room = "Home" ){
	this.rooms = new Map();
	this.rooms.set( start_room , new Room(start_room) );
	
	this.current_room = "Home";
	
	this.show_location = function()
	{
		this.rooms.get( this.current_room ).display();
	}

	this.add_room = function(room_name, room = new ExerciseRoom(room_name) )
	{
		this.rooms.set( room_name, room )
		this.rooms.get( "Home" ).add_change_room_button( room_name, ButtonLocations[ this.rooms.size - 1 ], RoomButtonColor );  
	}
	
	this.get_current_room_buttons = function()
	{
		room = this.get_current_room()

		return room.get_buttons();
		
	}
	
	this.activate_button = function( button_name )
	{
		//Get the room, activate the button for that room
		buttons = this.get_current_room_buttons()
		this.get_current_room_buttons().get( button_name ).Pressed(this);
	}
	
	this.set_room = function( room )
	{
		this.current_room = room;
	}
	
	this.get_current_room = function()
	{
		return this.rooms.get( this.current_room );
	}
	

}




