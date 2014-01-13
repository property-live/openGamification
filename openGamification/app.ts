//import jQuery
/// <reference path="./Scripts/typings/jquery/jquery.d.ts"/>
//import jQuery Mobile
/// <reference path="./Scripts/typings/jquerymobile/jquerymobile.d.ts"/>
//import GameElements
/// <reference path="./GameElements.ts"/>

window.onload = () => {
    $.getScript('./GameElements.js', function () {
        Main.addButtonListener();
        Main.main();
        $('#newGamerNameSubmit').on("click", function (event) {
            alert('click');
        });

    });
}



class Main {
    static leaderboard: Leaderboard;
    static gamer: Gamer;
    static publisher: Publisher;

    public static main() {
        $.getScript('./GameElements.js', function () {
            // Leaderboard test
            this.publisher = new Publisher("UBIweich", "sicher");
            this.leaderboard = new Leaderboard(this.publisher, "VorlesungsLeader", "xp");
            
            this.gamer = new Gamer("Horst", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Jack", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Foo", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Bratwurst", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Sauerkraut", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Wurst", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Manns", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Ranns", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Goos", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Dans", "passdort");
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            //print gamerlist
            var htmlElementList = document.getElementById('gamerList');
            htmlElementList.innerHTML += this.leaderboard.toStringUl();
            htmlElementList.innerHTML += "<h4>The Gamers are published by " + this.leaderboard.getPublisher().toString(); + "</h4>";

            // sort leaderboard
            this.leaderboard.sort();
            // save leaderboard
            localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));

            Main.printLeaderboard();
        });
    }

    public static printLeaderboard() {
        $.getScript('./GameElements.js', function () {
            var leaderboard: Leaderboard = Leaderboard.fromJSON(localStorage.getItem('leaderboard'));
            // sort the Leaderboard
            leaderboard.sort();
            $('#LeaderboardList').empty();
            var htmlElementList = document.getElementById('leaderboard');
            htmlElementList.innerHTML = "<h4>The Winners are published by " + leaderboard.getPublisher().toString(); + "</h4>";
            var trowArray = leaderboard.toTrowArray();
            for (var i = 0; i < trowArray.length; ++i) {
                $('#LeaderboardList').append(trowArray[i]);
            }
        });
    }

    public static addButtonListener() {
        $('#buttonHomeLeaderboard').on("click", function (event) {
            $.mobile.changePage("#PageLeaderboard", { transition: "flip", changeHash: false });
        });
        $('#buttonHomeQuest').on("click", function (event) {
            $.mobile.changePage("#PageQuest", { transition: "flip", changeHash: false });
        });
        $('#buttonLeaderboardHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonLeaderboardBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });
        $('#buttonQuestHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonQuestBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });

        $('#updateLeaderboard').on("click", function (event) {
            Main.printLeaderboard();
        });

        $('#newGamerSubmit').on("click", function (event) {
            $.getScript('./GameElements.js', function () {
                // load leaderboard
                var leaderboard: Leaderboard = Leaderboard.fromJSON(localStorage.getItem('leaderboard'));
                var name = $('#newGamerName').val();
                var password = $('#newGamerPassword').val();
                var gamer = new Gamer(name, password);
                leaderboard.addGamer(gamer, 0);
                alert(name + "\n" + password);
                // sort leaderboard
                leaderboard.sort();
                // save leaderboard
                localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
            });            
        });
    }
}