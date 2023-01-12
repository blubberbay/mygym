function Athlete( name )
{
	this.name = name;
	this.current_room = gym.get_current_room();
	this.counter = 0;
	this.max_counter = 25;
	this.current_activation = "";
	this.min_confidence = 0.2;
	
	this.pose = [];
	
	this.run = function( gym )
	{
		//check if hand 
		if( poses.length > 0 )
			this.pose = poses[0].pose;
		
		if( Object.keys(this.pose).length > 0 ) //WARNING, this assumes poses can carry over from one frame to another
		{	

			this.check_button_activation(gym)
		}
		//set room state based on pose
		current_room = gym.get_current_room()

			//console.log("in athlete run", gym )
		
		if( current_room.room_type == "exercise" )
		{
			if( current_room.timer_running )
			{
				//console.log("in athlete run and timer running", current_room.exercise);
				current_room.exercise.run()
		
			}
		}
	}
	
	this.check_button_activation = function( gym ) //Loop over buttons to see if any button has been activated
	{
		var notFound = true
		
		for( const [button_name, button_values] of gym.get_current_room_buttons().entries() )
		{
			button_dims = button_values.get_button_dims();
			left_distance = Math.pow( mirror_x(this.pose.leftWrist.x )  - button_dims[0], 2) + Math.pow( this.pose.leftWrist.y - button_dims[1], 2)
			right_distance = Math.pow( mirror_x( this.pose.rightWrist.x ) - button_dims[0], 2) + Math.pow(this.pose.rightWrist.y - button_dims[1], 2) 
			left_confidence = this.pose.leftWrist.confidence;
			right_confidence = this.pose.rightWrist.confidence;
			
			nose_distance = Math.pow( mirror_x( this.pose.nose.x )  - button_dims[0], 2) + Math.pow( this.pose.nose.y - button_dims[1], 2)
			nose_confidence = this.pose.nose.confidence;

			if( ( left_distance <= Math.pow( button_dims[2], 2 ) & left_confidence >= this.min_confidence ) 
				| ( right_distance <= Math.pow( button_dims[2], 2 ) & right_confidence >= this.min_confidence )
				| ( nose_distance <= Math.pow( button_dims[2], 2 ) & nose_confidence >= this.min_confidence ) )
			{
				if( this.current_activation == button_name )
				{
					this.counter += 1;
					if( this.counter >= this.max_counter)
					{
						gym.activate_button( button_name );
						this.counter = 0;
						this.current_activation = "";
						
					}
					else
						this.counter += 1;
				}
				else
				{
					this.current_activation = button_name;
					this.counter = -this.max_counter;
				}
			}				
			
		}
		
	}
	
}