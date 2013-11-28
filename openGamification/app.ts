//import jQuery
/// <reference path="./Scripts/typings/jquery/jquery.d.ts"/>
//import jQuery Mobile
/// <reference path="./Scripts/typings/jquerymobile/jquerymobile.d.ts"/>

window.onload = () => {
    // Load Gamification GameElements
    $.getScript('./GameElements.js', function () {
        // Leaderboard test
        var publisher = new Publisher("UBIweich", "sicher");
        var gamer = new Gamer("Horst", "passdort");
        var leaderboard = new Leaderboard(publisher, "VorlesungsLeader", "xp");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Hans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Hans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Hans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Hans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Wurst", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Manns", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Ranns", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Gans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        gamer = new Gamer("Dans", "passdort");
        leaderboard.addGamer(gamer, Math.floor(Math.random() * 100));
        var htmlElementList = document.getElementById('leaderboard');
        htmlElementList.innerHTML += "The Gamers are ...";
        htmlElementList.innerHTML += leaderboard.toString();
        htmlElementList.innerHTML += "And the Winners are ...";
        leaderboard.sort();
        htmlElementList.innerHTML += leaderboard.toString();
        htmlElementList.innerHTML += "<h4>published by " + leaderboard.getPublisher().toString(); + "</h4>";
    });
    $("#hideLi").click(function () {
        $("#leaderboard").hide();
    });
    $("#showLi").click(function () {
        $("#leaderboard").show();
    });
}