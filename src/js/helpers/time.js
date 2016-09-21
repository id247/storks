export 	function parseTime(milliseconds){
	if (milliseconds === 0){
		return 0;
	}

	const mseconds =(milliseconds%1000).toFixed(2);
	const seconds = ((milliseconds/1000)%60).toFixed(1);
	const minutes = parseInt((milliseconds/(1000*60))%60);

	//console.log(Math.floor(seconds/60));
	//console.log(Math.floor(130/60));
	//console.log(((milliseconds/(1000*60))%60));
	console.log(minutes);

	return '' + minutes + ':' + seconds;
} 
