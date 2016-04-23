var year=2016;
var month=4;
var day=7;
var hour=6;
var minute=0; 
var tz=-5; //Offset from UTC

var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

function numberWithCommas(x){ //Add commas as thousands seperators
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function countup(yr,m,d,hr,min){
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
        setTimeout('$("#darkness").css("visibility", "hidden");', 500);
    }
}

function emptyCart(){
    localStorage.removeItem("cart");
    updateCart();
}

function saveShoe(name, imgSrc, qty){
    var cartStore = localStorage.getItem("cart");
    if (cartStore == null){
        cartStore = "0";
    }
    
    var itemCount = parseInt(cartStore.substr(0,1));
    itemCount += 1;
    cartStore = itemCount + cartStore.substr(1,cartStore.length-1);
    cartStore += name+","+imgSrc+","+qty+"-";
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
    cartStore = cartStore.substr(1, cartStore.length-1);
    console.log("trap 1 is\n"+cartStore);
    
    var out = "";
    
    while (cartStore.indexOf("-") != -1){ //While there's still another new line
        var line = cartStore.substring(0, cartStore.indexOf("-"));
        console.log("trap 2 is\n"+line);
        cartStore = cartStore.slice(cartStore.indexOf("-")+1, cartStore.length);
        
        var name = line.slice(0,line.indexOf(","))
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var imageSrc = line.slice(0,line.indexOf(","))
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        var quantity = line.slice(0,line.length);
        line = line.substr(line.indexOf(",")+1, line.length-line.indexOf(","));
        
        out += '<div id="shoe">\n<div class="hr"></div>\n<img src="'+imageSrc+'">\n<h1>'+name+'</h1>\n<p>Quantity: '+quantity+'</p>\n</div>';
        
        out += '<div class="button" onclick="emptyCart();">Checkout</div>';
                    
        $("#items").html(out);
        
        console.log("cartStore is\n"+cartStore+"\n");
        
        console.log("nextIndex is "+cartStore.indexOf("-"));
        
    }
}