//Changes the background to a random color that complies with accessibility guidelines
function changeColor() {
    var accessibleColor = false;
    
    //Randomize colors until an accessible one is found
    while (accessibleColor == false) {
        
        //Assign each RGB channel with a random value between 0 and 255
        var R = Math.floor(Math.random() * 256);
        var G = Math.floor(Math.random() * 256);
        var B = Math.floor(Math.random() * 256);
        var sum = R+G+B; //Max is 765. The higher the number, the lighter the color
        
        var decrement = 30;
        var RR = darkenColor(R, decrement);
        var GG = darkenColor(G, decrement);
        var BB = darkenColor(B, decrement);

        //If the sum is < 425, the color is too dark to read the text
        if (sum > 425){
            
            //If there are high values, check that the color isn't a neon because neons may cause eyestrain
            if (R >= 200 || G >= 200 || B >= 200) {
                if (checkNotNeon(R, G, B) == true && checkNotNeon(G, R, B) == true && checkNotNeon(B, R, G) == true)
                {
                    //I want to match the footer by making each value a bit darker, so I have to check that this color will still be acessible when darkened
                    if ((checkNotNeon(RR, GG, BB) == true && checkNotNeon(GG, RR, BB) == true && checkNotNeon(BB, RR, GG) == true) && (sum-(decrement*3) > 425))
                        {
                            accessibleColor = true;
                        }
                }
            }
            //If no values are > 200 and the sum is > 425, it is accessible
            else {
                //Make sure the footer is not too dark
                if (sum-(decrement*3) > 425)
                    {
                        accessibleColor = true;
                    }
            }
        }
        
    }
    
    //If the random color is white, make footer the original color
    if (R == 255 && G == 255 && B == 255){
        RR = 242;
        GG = 230;
        BB = 184;
    }

    document.body.style.backgroundColor = 'rgb('+R+', '+G+', '+B+')';
    document.getElementById('skip-link').style.color = 'rgb('+R+', '+G+', '+B+')';
    document.getElementById('page-footer').style.background = 'rgb('+RR+', '+GG+', '+BB+')';
}

//If one value is > 200 but the other two are far from it, the color is likely to be a neon that is hard to look at
//If one value is > 200 but the others are close to it, the color is likely a pastel
function checkNotNeon(A, B, C){
    var max = 200;
    var diff = 30;
    
    if (A >= max){
        if ((B >= A-diff && B <= A+diff) && (C >= A-diff && C <= A+diff)){
            return true; //Likely a pastel
        }
    }
    else {
        return false; //Neon
    }
}

//Darkens a given color by 20 units. Can not go below 0.
function darkenColor(color, decrement){
    var newColor = color - decrement;
    
    //Limit the value to 0
    if (newColor < 0){
        newColor = 0
    }
    
    return newColor;
}
