$(document).ready(function(){
   $(".year").on("click",function(){
       console.log("Clicked");

       var apiUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true';
       fetch(apiUrl).then(response => {
         return response.json();
       }).then(data => {
         // Work with JSON data here
         var ans = data;
        var yr = this.id;
        console.log("Year : "+yr);
         filterYear(data, yr);
       
       }).catch(err => {
         // Do something for an error here
         console.log("Error");
       });
   })

   $(".successLaunch").on("click",function(){
    var apiUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true';
    fetch(apiUrl).then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      var ans = data;
     var val = this.id;
     console.log(val);
      filterSuccessLaunch(data, val);
    
    }).catch(err => {
      // Do something for an error here
      console.log("Error");
    });
   })

   $(".successLanding").on("click",function(){
    var apiUrl = 'https://api.spacexdata.com/v3/launches?limit=100&launch_success=true';
    fetch(apiUrl).then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      var ans = data;
     var val = this.id;
     console.log(val);
     console.log('Inside Landing');
     
     filterSuccessLanding(data, val);
    
    }).catch(err => {
      // Do something for an error here
      console.log("Error");
    });
   })
});

function filterYear(data,year){

    // console.log("FILEERER");
    var ly = [];
    var k = 0;

    for(let i=0;i<data.length;i++)
    {
        if(data[i].launch_year == year)
        {
            ly[k++] = data[i];
        }
    }
    console.log(ly);
    $("#mission").html("");
    $("#ans").html("");
    for(let i=0;i<k;i++)
    {
        var img = ly[i].links.mission_patch;
        var name = ly[i].mission_name;
        var number = ly[i].flight_number;
        var launch_year = ly[i].launch_year;
        var mission_ids = ly[i].mission_id;
        var launch_success = ly[i].launch_success;   
        var land_success = ly[i].rocket.first_stage.cores[0].land_success;

        var card = ' <div class="col-md-3 card-style card"><div><img src='+ img +' alt="image" style="height: 100px;width: 100px;" /></div><div><h4 class="h4">'+ name +' #'+ number +'</h4> <p>Mission Ids : </p><ul id="mission"></ul><p>Launch Year : '+ launch_year +'</p><p>Successful Launch :'+ launch_success +'</p><p>Successful Landing :'+ land_success +'</p></div></div>';

        $("#mission").append(appendMissionId(mission_ids));
        $("#ans").append(card);
    }
}

function filterSuccessLaunch(data, val){

    var ly = [];
    var k = 0;
    var v = "";
    if(val == "trueId")
    {
        v = true;
    }
    else
    {
        v = false;
    }
    for(let i=0;i<data.length;i++)
    {
        // console.log(data[i].launch_success);
        if(data[i].launch_success == v)
        {
            ly[k++] = data[i];
        }
    }
    console.log(ly);
    $("#ans").html("");
    for(let i=0;i<k;i++)
    {
        var img = ly[i].links.mission_patch;
        var name = ly[i].mission_name;
        var number = ly[i].flight_number;
        var launch_year = ly[i].launch_year;
        var mission_ids = ly[i].mission_id;
        var launch_success = ly[i].launch_success;   
        var land_success = ly[i].rocket.first_stage.cores[0].land_success;

        var card = ' <div class="col-md-3 card-style card"><div class="img-div"><img src='+ img +' alt="image" style="height: 100px;width: 100px;" /></div><div><h4 class="h4">'+ name +' #'+ number +'</h4> <p>Mission Ids : </p><ul id="mission"></ul><p>Launch Year : '+ launch_year +'</p><p>Successful Launch :'+ launch_success +'</p><p>Successful Landing : '+ land_success +'</p></div></div>';

        $("#mission").append(appendMissionId(mission_ids));
        $("#ans").append(card);
    }  
}


function filterSuccessLanding(data, val){

    var ly = [];
    var k = 0;
    var v = "";
    if(val == "successTrue")
    {
        v = true;
    }
    else
    {
        v = false;
    }
    for(let i=0;i<data.length;i++)
    {
        // console.log(data[i].rocket.first_stage.cores[0].land_success);
        if(data[i].rocket.first_stage.cores[0].land_success == v)
        {
            ly[k++] = data[i];
        }
    }
    console.log(ly);
    $("#ans").html("");
    for(let i=0;i<k;i++)
    {
        var img = ly[i].links.mission_patch;
        var name = ly[i].mission_name;
        var number = ly[i].flight_number;
        var launch_year = ly[i].launch_year;
        var mission_ids = ly[i].mission_id;
        var launch_success = ly[i].launch_success;   
        var land_success = ly[i].rocket.first_stage.cores[0].land_success;

        var card = ' <div class="col-md-3 card-style card"><div class="img-div"><img src='+ img +' alt="image" style="height: 100px;width: 100px;" /></div><div><h4 class="h4">'+ name +' #'+ number +'</h4> <p>Mission Ids : </p><ul id="mission"></ul><p>Launch Year : '+ launch_year +'</p><p>Successful Launch :'+ launch_success +'</p><p>Successful Landing :'+ land_success +'</p></div></div>';

        $("#mission").append(appendMissionId(mission_ids));
        $("#ans").append(card);
    }  
}


function appendMissionId(mission_ids){
    
    var ul = "<ul>";
    for(let j=0;j<mission_ids.length;j++)
    {
        console.log(mission_ids[j]);
        var d = mission_ids[j];
        var li = "<li>"+ d +"</li>";
        ul += li;
    }
    ul += "</ul>";

    return ul;

}

function appendData(data){
    var img = data.links.mission_patch;
    var name = data.mission_name;
    var number = data.flight_number;
    var launch_year = data.launch_year;

    var card = ' <div class="col-md-3"><div><img src='+ img +' alt="image" /></div><div><h4 class="h4">'+ name +''+ number +'</h4> <h5>Mission Ids : </h5><ul><li></li></ul><h5>Launch Year : </h5><p class="text">'+ launch_year +'</p><h5>Successful Launch : </h5><p class="text">false</p><h5>Successful Landing : </h5><p class="text">Launch Landing</p></div></div>';

    return card;
}

// mission_name
// flight_number
// launch_year
// mission_id[]
// launch_success
// links.mission_patch -- image
// links.mission_patch_small -- image
