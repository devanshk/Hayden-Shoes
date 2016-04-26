var year=2016;
var month=4;
var day=7;
var hour=6;
var minute=0; 
var tz=-5; //Offset from UTC
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

var objects;
var out;

function numberWithCommas(x){ //Add commas as thousands seperators
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function countup(yr,m,d,hr,min){ //Update the "shoes donated" as a fn of time
    theyear=yr;themonth=m;theday=d;thehour=hr;theminute=min;
    var today=new Date();
    var todayy=today.getYear();
    if (todayy < 1000) {
    todayy+=1900; }
    var todaym=today.getMonth();
    var todayd=today.getDate();
    var todayh=today.getHours();
    var todaymin=today.getMinutes();
    var todaysec=today.getSeconds();
    var todaystring1=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec;
    var todaystring=Date.parse(todaystring1)+(tz*1000*60*60);
    var futurestring1=(montharray[m-1]+" "+d+", "+yr+" "+hr+":"+min);
    var futurestring=(today.getTimezoneOffset()*(1000*60))-Date.parse(futurestring1);
    var dd=todaystring-futurestring;
    
    var tare = 2921277318000 //Zeroing out

    var shoes = Math.floor((dd-tare)/4000);
    
    $("#countup b").html(numberWithCommas(shoes));
    
    //Run the countup function again. Recursion ftw.
    setTimeout("countup(theyear,themonth,theday,thehour,theminute)",1000);
}

function switchToShoes(){
    objects = [new item("The Fly", 50, 'images/shoe1.jpg'),
                   new item("The Contemporary", 50, 'images/shoe2.jpg'),
                   new item("The Suburban", 50, 'images/shoe3.jpg'),
                   new item("The Orange", 50, 'images/shoe4.jpg')];
    
    out = "<div style=\" font-family:'Proxima Nova'; font-size: 3em; text-align:center;\">Our shoes are one size fits all.</div>";
    
    $('#left').css('width','100%');
    $('#right').css('width','0%');
    setTimeout('$("#shopping").css(\'opacity\', \'0\');', 500);
    setTimeout('generateShopItems();', 1000);
    setTimeout('$("#shopping").css(\'opacity\', \'1\');', 1200);
}

function switchToOther(){
    objects = [new item("Coral Hat", 17, 'images/hat1.jpg'),
               new item("Gray T", 10, 'images/shirt1.jpg'),
               new item("White T", 12, 'images/shirt2.jpg'),
               new item("Heather T", 15, 'images/shirt3.jpg'),
               new item("Sticker 1", 5, 'images/stick1.jpg'),
               new item("Sticker 2", 5, 'images/stick2.jpg'),
               new item("Sticker 3", 5, 'images/stick3.jpg')];
    
    out="";
    $('#left').css('width','0%');
    $('#right').css('width','100%');
    setTimeout('$("#shopping").css(\'opacity\', \'0\');', 500);
    setTimeout('generateShopItems();', 1000);
    setTimeout('$("#shopping").css(\'opacity\', \'1\');', 1200);
}

function item(name, price, imageRef){
    this.name = name;
    this.price = price;
    this.imageRef = imageRef;
}

function generateShopItems(){
    for (var i=0; i<objects.length; i++){
        var cur = objects[i];
        var name = 'unit'+i;
        out += '<div id="'+name+'" onmouseover="$(\'#'+name+' h1\').css(\'bottom\',\'0\'); " onmouseout="$(\'#'+name+' h1\').css(\'bottom\',\'-40px\');" onclick="saveShoe(\''+cur.name+'\', \''+cur.imageRef+'\', 1,'+cur.price+');" ><h1>Add to Cart $'+cur.price+'</h1> <img src="'+cur.imageRef+'"> </div>'
    }
    
    $("#shopping").html(out);
}

function toggleCart(){
    updateCart();
    
    var opac = $("#darkness").css("opacity");
    if (opac == 0){
        $("#darkness").css("visibility", "visible");
        $("#darkness").css("opacity", 0.8);
        $("#cart_sidebar").css("right", 0);
    }
    else{
        $("#darkness").css("opacity", 0);
        $("#cart_sidebar").css("right", '-30%');
        setTimeout('$("#darkness").css("visibility", "hidden");', 200);
    }
}

function emptyCart(){
    localStorage.removeItem("cart");
    updateCart();
}

function saveShoe(name, imgSrc, qty, price){
    var cartStore = localStorage.getItem("cart");
    if (cartStore == null){
        cartStore = "0";
    }
    
    var itemCount = parseInt(cartStore.substr(0,1));
    itemCount += 1;
    cartStore = itemCount + cartStore.substr(1,cartStore.length-1);
    cartStore += name+","+imgSrc+","+qty+","+price+"-";
    localStorage.setItem("cart",cartStore);
    
    updateCart();
}

function updateCart(){
    var cartStore = localStorage.getItem("cart");
    if (cartStore == null){
        cartStore = "0";
        localStorage.setItem("cart",cartStore);
        $("#items").html('<div class="button" onclick="emptyCart();">Checkout</div>');
        console.log("surprise! trap 0");
    }
    var itemCount = parseInt(cartStore.substr(0,1));
    $("#nav_cart #second").html(itemCount);
    cartStore = cartStore.substr(1, cartStore.length-1);
    console.log("trap 1 is\n"+cartStore);
    
    var out = "";
    var total = 0;
    
    while (cartStore.indexOf("-") != -1){ //While there's still another new line
        var line = cartStore.substring(0, cartStore.indexOf("-"));
        console.log("trap 2 is\n"+line);
        cartStore = cartStore.slice(cartStore.indexOf("-")+1, cartStore.length);
        
        var name = line.slice(0,line.indexOf(","))
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var imageSrc = line.slice(0,line.indexOf(","))
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var quantity = line.slice(0,line.indexOf(","));
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var priceStr = line.slice(0,line.length);
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var price = parseFloat(priceStr);
        
        out += '<div id="shoe">\n<div class="hr"></div>\n<img src="'+imageSrc+'">\n<h1>'+name+'</h1>\n<p>Quantity: '+quantity+'<br>Price: $'+price*parseInt(quantity)+'</p>\n</div>';
        
        total += price*parseInt(quantity);
        console.log("cartStore is\n"+cartStore+"\n");
        console.log("nextIndex is "+cartStore.indexOf("-"));
    }
    
    out += '<div id="filler"> <img src="images/shoe1.jpg" style="opacity:0;"> </div>'
    out += '<div class="button" onclick="emptyCart();">Checkout - $'+total+'</div>';

    $("#items").html(out);
}


    
//    Reference
    
//    <div id="unit1" onmouseover="$('#unit1 h1').css('bottom','0'); " onmouseout="$('#unit1 h1').css('bottom','-40px');">
//                <h1 onclick="saveShoe('The Original', 'images/shoe1.jpg', 3);">Add to Cart</h1>
//                <img src="images/shoe1.jpg">
//            </div>