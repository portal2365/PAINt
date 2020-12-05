
var database;



var drawing = [];


var currentPath = [];


var isDrawing= false;




function setup() {



    
    canvas - createCanvas(1000,600)
    
    
    database = firebase.database();

    
    canvas.mousePressed(startPath);

    
    canvas.parent('canvascontainer');

    
    canvas.mouseReleased(endPath);

    
  

    
    var saveButton = select('#saveButton');

    

    saveButton.mousePressed(saveDrawing);

    
    
    var clearButton = select('#clearButton');

    

    clearButton.mousePressed(clearDrawing);
  


    
    var params = getURLParams();

    
    console.log(params);



    
    if (params.id) {


        
      console.log(params.id);

      
      showDrawing(params.id);


      

    }
  


    
    var ref = database.ref('drawings');

    
    ref.on('value', gotData, errData);


    
  }


  

  
  
  function startPath() {


    

    isDrawing =
     t
    rue;

    currentPath = [];
    drawing.push(currentPath);


    

}
  


  
  function endPath() {


    
    isDrawing = false;


    

}
  


  
  function draw() {


    

    background(100);

    
    
    if (isDrawing) {


        
      var point = {

        
        x: mouseX,

        
        y: mouseY


        
      };


      
      currentPath.push(point);


      

    }
  


    
    stroke(0);

    
    strokeWeight(4);

    
    noFill();

    
    for (var i = 0; i < drawing.length; i++) {

        
      var path = drawing[i];

      
      beginShape();

      
      for (var j = 0; j < path.length; j++) {

        
        vertex(path[j].x, path[j].y);

        
      }

      
      endShape();

      
    }

    

}
  


  
  function saveDrawing() {


    
    var ref = database.ref('drawings');

    
    var data = {


        
      name: 'Vivek',

      
      drawing: drawing


      
    };


    
    var result = ref.push(data, dataSent);

    

    console.log(result.key);
  

    
    function dataSent(err, status) {


        
      console.log(status);


      
    }


    

}
  

  
  function gotData(data) {



    
    var elts = selectAll('.listing');

    
    for (var i = 0; i < elts.length; i++) {

        
      elts[i].remove();

      

    }

    
    
    var drawings = data.val();

    
    var keys = Object.keys(drawings);

    
    for (var i = 0; i < keys.length; i++) {

        
      var key = keys[i];


      
      var li = createElement('li', '');

      
      li.class('listing');

      
      var ahref = createA('#', key);

      
      ahref.mousePressed(showDrawing);

      
      ahref.parent(li);

      

      
      
      var perma = createA('?id=' + key, 'Edit Drawing');

      
      perma.parent(li);

      
      perma.style('padding', '4px');

      

      
      
      li.parent('drawinglist');

      
    }

    

}

  

  
  
  function errData(err) {

    
    console.log(err);


    

}

  
  
  function showDrawing(key) {



    
    if (key instanceof MouseEvent) {

        
      key = this.html();

      

    }

    
    
    var ref = database.ref('drawings/' + key);

    
    ref.once('value', function(data){

        
      var dbdrawing = data.val();

      
      drawing = dbdrawing.drawing;

      
    });

    

}

  
  
  function clearDrawing(){

    
    drawing = [];

    
  }