//import jQuery
/// <reference path="./Scripts/typings/jquery/jquery.d.ts"/>
//import jQuery Mobile
/// <reference path="./Scripts/typings/jquerymobile/jquerymobile.d.ts"/>
//import GameElements
/// <reference path="./openGamification.ts"/>

window.onload = () => {
    $.getScript('./openGamification.js', function () {
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
    static quest: Quest;
    static achievement: Achievement;
    static level: Level;
    static pointList: Points[] = [];

    public static main() {
        $.getScript('./openGamification.js', function () {
            // Leaderboard test
            this.publisher = new Publisher("UBIweich", "sicher");
            this.leaderboard = new Leaderboard(this.publisher, "VorlesungsLeader", "xp");
            var gamerList: Gamer[] = [];
            this.gamer = new Gamer("Horst", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Jack", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Foo", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Bratwurst", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Sauerkraut", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Wurst", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Manns", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Ranns", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Goos", "passdort");
            gamerList.push(gamer);
            this.leaderboard.addGamer(this.gamer, Math.floor(Math.random() * 100));
            this.gamer = new Gamer("Dans", "passdort");
            gamerList.push(gamer);
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

            // display Achievement
            var pictureHidden = '<img src="img/hidden.png" alt="HIDDEN!" height="128" width="128">';
            var pictureShowing = '<img src="img/showing.png" alt="HIDDEN!" height="128" width="128">';
            var pictureUnlocked = '<img src="img/128x128-green1.png" alt="HIDDEN!" height="128" width="128">';
            var pictures = [pictureHidden, pictureShowing, pictureUnlocked];
            this.achievement = new Achievement(this.publisher, "Titel", "hier steht was", pictures);

            var achievementHTML = document.getElementById('achievement');
            var achievementHTML1 = document.getElementById('achievement1');
            var achievementHTML2 = document.getElementById('achievement2');
            achievementHTML.innerHTML = "" + this.achievement.toString();
            this.achievement.setStatus(1);
            achievementHTML1.innerHTML = "" + this.achievement.toString();
            this.achievement.setStatus(2);
            achievementHTML2.innerHTML = "" + this.achievement.toString();
            // save Achievement
            localStorage.setItem('achievement', JSON.stringify(this.achievement));
            // load Achievement
            this.achievement = Achievement.fromJSON(localStorage.getItem('achievement'));
            // save loaded Achievement
            localStorage.setItem('achievement2', JSON.stringify(this.achievement));

            // display Quest
            var reward = new Points(this.publisher, 300, "Coffee Points");
            this.quest = new Quest(this.publisher, "This is a mighty text to explain what needs to be done!", reward);
            this.quest.addReward(new Points(this.publisher, 10, "Minutes Lunchtime"));
            var questHTML = document.getElementById('quest');
            questHTML.innerHTML = this.quest.toString();
            // save Quest
            localStorage.setItem('quest', JSON.stringify(this.quest));

            // display Level
            var levelRanks = ["Noob", "Gamer", "Pro", "1337"];
            var rankBorderList = [10, 20, 30, 40];
            this.level = new Level(this.publisher, levelRanks, rankBorderList, 20);
            var levelHTML = document.getElementById('level');
            levelHTML.innerHTML = "" + this.level.toString();
            // save Level
            localStorage.setItem('level', JSON.stringify(this.level));

            // gamer test
            var gamer = new Gamer("Jens Maier", "secure2");
            var gamerHTML = document.getElementById('gamer');
            gamerHTML.innerHTML = "" + gamer.toString() + " : Profile Page";
            var gamerPublisherHTML = document.getElementById('gamerPublisher');
            gamerPublisherHTML.innerHTML = "Publisher: " + this.level.getPublisher();
            var gamerPointsHTML = document.getElementById('gamerPoints');
            gamerPointsHTML.innerHTML = "" + this.level.getValue() + " " + this.level.getUnit();
            var gamerLevelHTML = document.getElementById('gamerLevel');
            gamerLevelHTML.innerHTML = "" + this.level.getRank();

        });
    }

    public static printLeaderboard() {
        $.getScript('./openGamification.js', function () {
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
        $('#buttonHomeLevel').on("click", function (event) {
            $.mobile.changePage("#PageLevel", { transition: "flip", changeHash: false });
        });
        $('#buttonHomeAchievement').on("click", function (event) {
            $.mobile.changePage("#PageAchievement", { transition: "flip", changeHash: false });
        });
        $('#buttonHomeGamer').on("click", function (event) {
            $.mobile.changePage("#PageGamer", { transition: "flip", changeHash: false });
        });
        $('#buttonHomePublisher').on("click", function (event) {
            $.mobile.changePage("#PagePublisher", { transition: "flip", changeHash: false });
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
        $('#buttonLevelHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonLevelBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });
        $('#buttonGamerHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonGamerBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });
        $('#buttonPublisherHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonPublisherBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });

        $('#buttonAchievementHome').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "fade", changeHash: false });
        });
        $('#buttonAchievementBack').on("click", function (event) {
            $.mobile.changePage("#PageHome", { transition: "flip", changeHash: false });
        });

        $('#updateLeaderboard').on("click", function (event) {
            Main.printLeaderboard();
        });

        $('#newGamerSubmit').on("click", function (event) {
            $.getScript('./openGamification.js', function () {
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

                Main.printLeaderboard();
            });
        });
    }
}