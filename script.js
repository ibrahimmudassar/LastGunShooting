// { case: "New Mexico neighborhood shooting", location: "Other", date: "5/15/23", summary: 'Beau Wilson, 18, opened fire in a residential neighborhood around his home; he shot randomly at people, houses and cars, according to local authorities. A high school student, he wore body armor and used multiple guns, including an "AR-15-style rifle," and was shot dead by responding police. ', fatalities: "3", injured: "6", total_victims: "9", age_of_shooter: "18", prior_signs_mental_health_issues: "yes", mental_health_details: "-", … }

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

$(function () {
  // Using Mother Jones csv and converting to json with opensheet
  var url =
    "https://opensheet.elk.sh/1b9o6uDO18sLxBqPwl_Gh9bnhW-ev_dABH83M5Vb5L8o/1";
  $.getJSON(url, function (data) {
    var template = Handlebars.compile($("#entry-template").html());
    console.log(data[0]);

    data[0]["case"] = titleCase(data[0]["case"]);

    // Get the current date
    const currentDate = moment();

    // Parse the input date string
    const inputDate = moment(data[0]["date"], "M/D/YYYY");

    // Calculate the number of days between the input date and the current date
    const daysSince = currentDate.diff(inputDate, "days");
    data[0]["daysSince"] = daysSince;

    $(".content").html(template(data[0]));
  });
});
