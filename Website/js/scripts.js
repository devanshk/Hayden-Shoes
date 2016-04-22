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
    
    //Run the countdown function again. Recursion ftw.
    setTimeout("countup(theyear,themonth,theday,thehour,theminute)",1000);
}