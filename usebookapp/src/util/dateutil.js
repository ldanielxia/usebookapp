const dateUtil = {
  changeDateFormat(jsondate) {
    jsondate = jsondate.replace("/Date(", "").replace(")/", "");
    if (jsondate.indexOf("+") > 0) {
      jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    } else if (jsondate.indexOf("-") > 0) {
      jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }

    var date = new Date(parseInt(jsondate, 10));
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var currentDate =
      date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentHour =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var currentMinute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return (
      date.getFullYear() +
      "-" +
      month +
      "-" +
      currentDate +
      " " +
      currentHour +
      ":" +
      currentMinute
    );
  }
}
export default dateUtil;