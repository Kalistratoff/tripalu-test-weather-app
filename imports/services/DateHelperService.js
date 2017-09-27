const weekdays =  [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
                ];

const DateHelperService = {
   getFullDay : (dateString) => {
       return weekdays[new Date(dateString).getDay()];
   },
   getShortDay : (dateString) => {
       return weekdays[new Date(dateString).getDay()].substring(0,3);
   },
   getDate : (dateString) => {

       var date  = new Date(dateString);
       var day   = date.getDate();
       var year  = date.getFullYear();
       var month = date.getMonth()+1;

       return day+"."+month+"."+year;
   }
}

export default DateHelperService;