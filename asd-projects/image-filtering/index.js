// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // Multiple TODOs: Call your apply function(s) here





    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

applyFilter(reddify);
//applyAndRender();


// TODO 1, 2 & 4: Create the applyFilter function here

function applyFilter(filterFunction){
    for(var i = 0; i < image.length; i++){

        var row = image[i];

        for(var j = 0; j < row.length; j++){

            //takes each pixel of the image
            var rgbString = image[i][j];

            //changes each pixel of the array (currently all strings), and changes them into arrays
            var rgbNumbers = rgbStringToArray(rgbString);

            //changes the red value of each pixel, now an array, to the max
            filterFunction(rgbNumbers);

            //turns the new array pixel values back into strings
            image[i][j] = rgbArrayToString(rgbNumbers);

        }
    }
}

// TODO 7: Create the applyFilterNoBackground function


// TODO 5: Create the keepInBounds function



function keepInBounds(num){

    function setMin (x){
        var minimum = Math.max(x, 0);
        return minimum;
    }
  
    function setMax (minimum){
        var max = Math.min(minimum, 255);
        return max;
    }
    
    return setMax(setMin(num));

}

// TODO 3: Create reddify function

function reddify(arr){
    arr[RED] = 200;
}

// TODO 6: Create more filter functions


// CHALLENGE code goes below here
