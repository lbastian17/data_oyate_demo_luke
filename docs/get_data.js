// Credit: https://github.com/athena-mit/my_data_oyate_demo/tree/main/docs

function getRandomInt(max) {
    return Math.floor(Math.random() * max); //The maximum is exclusive and the minimum is inclusive
  }

  previous_indices = []
  out_of_phrases = false
  logged_in = false
  current_phrase_id = "None"

  function getPrompt(){ //generates and displays Makah phrase
    $.getJSON("words.json", function(data){
      console.log("trying");
      random_index = getRandomInt(Object.keys(data.set_1).length + 1);
      while (previous_indices.includes(random_index)){
        random_index = getRandomInt(Object.keys(data.set_1).length + 1);
        if (previous_indices.length == Object.keys(data.set_1).length){
          out_of_phrases = true;
          break;
        }
      };
      if (out_of_phrases){
        $("#makah_phrase").text("You've seen all our phrases");
      console.log("done")
      }else{
      previous_indices.push(random_index);
      $("#makah_phrase").text(data.set_1[random_index].phrase);
      current_phrase_id = data.set_1[random_index].id
      console.log("done")}
    }); 
  }

  var input = {}

  $("#login").click(function(){ //records info when user logs in
    console.log("logged in");
    input.email = $("#email").val();
    input.age = $("#age").val();
    input.yearsSpoken = $("#yearsSpoken").val();
    input.gender = $("#gender").val();
    input.recordings = [];

    console.log(input);

    logged_in = true;

    getPrompt();

  })

  $("#submit1").click(function(){
    current_recording = {}
    console.log("submitted");
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    current_recording.timestamp = today.toUTCString();
    current_recording.phrase_id = current_phrase_id;
    input.recordings.push(current_recording);
    console.log(input)
  })

  $("#new_prompt").click(function(){ //generates new prompt when button is pushed
    if (logged_in){
      getPrompt(); 
    }
  })