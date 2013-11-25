// For reference path see: http://msdn.microsoft.com/de-de/magazine/jj883955.aspx
/// <reference path="jquery.d.ts"/>
//import jquery;

class User {
    static usercount: number = 0;
    id: number;
    password: String;
    name: String;
    constructor(name: String, password: String) {
        this.id = User.usercount++;
        this.password = password;
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public getId() {
        return this.id;
    }

    public setName(name: String) {
        this.name = name;
    }

    public toString() {
        return this.name;
    }
}

class Gamer extends User {
    constructor(name: String, password: String) {
        super(name, password);
    }

    public toString() {
        return this.name;
    }
}

class Publisher extends User {
    constructor(name: String, password: String) {
        super(name, password);
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }
}

class GlobalGamifier extends Publisher {
    constructor(name: String, password: String) {
        super(name, password);
    }
}

class GameElement {
    gamerList: Gamer[];

    getGamer(index: number) {
        return this.gamerList[index];
    }

    getGamerList() {
        return this.gamerList;
    }
}

class PublishedGameElement extends GameElement {
    publisher: Publisher;
    constructor(publisher: Publisher) {
        super();
        this.publisher = publisher;
    }

    public getPublisher() {
        return this.publisher;
    }
}

class GlobalGameElement extends GameElement {
    publisher: GlobalGamifier;
    constructor(publisher: GlobalGamifier) {
        super();
        this.publisher = publisher;
    }

    public getPublisher() {
        return this.publisher;
    }
}

class Points {
    publisher: Publisher;
    value: number;
    unit: String;

    constructor(publisher: Publisher, value: number, unit: String) {
        this.publisher = publisher;
        this.value = value;
        this.unit = unit;
    }

    public toString() {
        return this.value;
    }

    public getValue() {
        return this.value;
    }
}

class Leaderboard extends PublishedGameElement {
    title: String;
    pointList: Points[];
    gamerList: Gamer[];
    unit: String;

    constructor(publisher: Publisher, title: String, unit:String = "points") {
        super(publisher);
        this.title = title;
        this.gamerList = [];
        this.pointList = [];
        this.unit = unit;
    }

    addGamer(newGamer: Gamer, points: number) {
        this.gamerList.push(newGamer);
        this.pointList.push(new Points(this.publisher, points, this.unit));
    }

    sort() {
        //bubblesort
        var swap = true;
        var sortedList = this.gamerList;
        while (swap == true) {
            swap = false;
        for (var i = 0; i < this.pointList.length - 1; i++) {
          if(this.pointList[i] < this.pointList[i + 1]){
                    var tempPoint = this.pointList[i];
                    var tempGamer = this.gamerList[i];
                    this.pointList[i] = this.pointList[i + 1];
                    this.gamerList[i] = this.gamerList[i + 1];
                    this.pointList[i + 1] = tempPoint;
                    this.gamerList[i + 1] = tempGamer;
              swap = true;
                }
           }
        }
    }

    toString() {
        var text = "<ol>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text+="</ol>";
        return text;
    }

}

class Member {
    id: number;
    name: String;
    points: number;
    constructor(id: number, name: String, points: number) {
        this.id = id;
        this.name = name;
        this.points = points;
    }

    public getPoints() {
        return this.points;
    }

    public getName() {
        return this.name;
    }

    public getId() {
        return this.id;
    }

    public setName(name: String) {
        this.name = name;
    }

    public setPoints(points: number) {
        this.points = points;
    }

    public addPoints(points: number) {
        this.points += points;
    }

    public removePoints(points: number) {
        this.points -= points;
    }

    public toString() {
        var text = "";
        text += this.name + ": " + this.points.toString();
        return text;
    }
}


window.onload = () => {
    // weise einem htmlElement das Element der Id content zu.
    // @see: <div id="content"></div> in default.htm
    var htmlElementContent = document.getElementById('content');


    // Leaderboardtest
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

    var htmlElementList = document.getElementById('list');
    htmlElementList.innerHTML += "The Gamers are ...";
    htmlElementList.innerHTML += leaderboard.toString();
    htmlElementList.innerHTML += "And the Winners are ...";
    leaderboard.sort();
    htmlElementList.innerHTML += leaderboard.toString();
    htmlElementList.innerHTML += "<h4>published by " + leaderboard.getPublisher().toString(); + "</h4>";
    // Leaderboardtest finished

}