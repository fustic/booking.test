function createCityHtml(city){
    city = city || {};
    return "<p><a data-html='"+city.content+"' class='iCity'>"+city.name+"</a> <span>("+city.count+")</span></p>"
}
function printCities($holder, columnNumber, cities){
    cities = cities || [];
    columnNumber = columnNumber || 0;
    if ($holder) {
        $holder.children("div:nth-child(" + columnNumber + ")").html(cities.join("\n"));
    }
}

$(function(){
    var cities = citiesList || [],
        $citiesHolder = $(".iCities"),
        $cityDescription = $citiesHolder.find(".iCityDescription"),
        htmls = [],
        maxCitiesInColumn = Math.ceil(cities.length / 3),
        citiesInColumn = 0,
        columnNumber = 1;


    cities.sort(function(city1, city2){
        var fCityName = city1.name ? city1.name.toLocaleLowerCase() : "",
            sCityName = city2.name ? city2.name.toLocaleLowerCase() : "";
        return fCityName > sCityName;
    });
    for (var i = 1, len = cities.length; i <= len; i += 1) {

        if (citiesInColumn >= maxCitiesInColumn || i === len) {
            printCities($citiesHolder, columnNumber++, htmls);
            citiesInColumn = 0;
            htmls = [];
        }
        htmls.push(createCityHtml(cities[i - 1]));
        citiesInColumn += 1;
    }
    printCities($citiesHolder, columnNumber++, htmls);

    $citiesHolder.off("click", ".iCity").on("click", ".iCity", function(){
        $cityDescription.html($(this).data("html"));
        return false;
    });
});
