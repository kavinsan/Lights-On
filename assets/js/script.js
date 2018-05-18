var matrix = [];
var content = "";
var count = 0;
var width = 3;
var height = 3;

for(i = 0; i < width; i++){
    content = content + "<tr value=\"" + i + "\">";
    matrix[i] = [];
    for(j = 0; j < height; j++){
        matrix[i][j] = 0;
        content = content + "<td value=\"" + j + "\">" + "<i class=\"circles fas fa-circle\"></i></td>";
    }
    content = content + "</tr>";
}

$("table").html(content);

$("#container").on("click", "table tr .circles", function(){
    if(!(winCheck(width,height))){
        
        var row = parseInt($(this).parent().parent().attr('value'));
        var col = parseInt($(this).parent().attr('value'));
        $(this).toggleClass("circleOn");

        check(row,col);
        console.log(row + " " + col)
    }
});

function check(row, col){
    lights(row,col);
    
    if (!((row - 1) < 0)){
        console.log("up space")
        lights(row - 1,col);
    } if(!((row + 1) > width - 1)){
        console.log("down space")
        lights(row + 1,col);
    } if(!((col + 1) > height - 1)){
        console.log("right space")
        lights(row,col + 1);
    } if(!((col - 1) < 0)){
        console.log("left space")
        lights(row,col - 1)
    } 
    
    update(matrix);
    winCheck(width,height);
};

function lights(row,col){

    if(matrix[row][col] == 1){
        matrix[row][col] = 0;
    } else if(matrix[row][col] == 0){
        matrix[row][col] = 1;
      
    }
}
function update(){
    content = "";
    
    for(i = 0; i < width; i++){
        content = content + "<tr value=\"" + i + "\">";
        
        for(j = 0; j < height; j++){
            if(matrix[i][j] == 1){
                count++;
                content = content + "<td value=\"" + j + "\">" + "<i class=\"circles fas fa-circle circleOn\"></i></td>";
            } else {
                content = content + "<td value=\"" + j + "\">" + "<i class=\"circles fas fa-circle\"></i></td>";                
            }
        }
        content = content + "</tr>";
    }
    $("table").html(content);
};
function winCheck(width, height){
    if(count == width * height){
        $("button.reset").addClass("bounceOut", function(){
            $(this).css("display","none");
        });
        
        $("button.nextLevel").css("display","inline-block").addClass("bounceInDown");
        $("#container").removeClass("bounceIn");
        $("#title").css("color","teal");
        $("button.nextLevel").removeClass("bounceOut");
        return true;
        
    } else {
        count = 0
        return false;
    }
    return false;
}

function clear(){
    content = "";
    for(i = 0; i < width; i++){
        content = content + "<tr value=\"" + i + "\">";
        matrix[i] = [];
        for(j = 0; j < height; j++){
            matrix[i][j] = 0;
            content = content + "<td value=\"" + j + "\">" + "<i class=\"circles fas fa-circle\"></i></td>";
        }
        content = content + "</tr>";
    }
    $("table").html(content);

}
$("button.nextLevel").on("click", function(){
    $(this).toggleClass("bounceOut", function(){
        
    });
    $(this).hide();
    $("button.reset").removeClass("bounceOut").addClass("bounceIn", function(){
        $(this).css("display","block");
        
    });
    width = width + 1;
    height = height + 1;
    count = 0;
    clear();
    $("#container").addClass("bounceIn");
    $("#title").css("color","black");
});

$("button.reset").on("click", function(){
    $(this).removeClass("bounceIn");
    $(this).addClass("shake");

    
    count = 0;
    clear();
});