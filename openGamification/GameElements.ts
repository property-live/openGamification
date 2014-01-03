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
/**
 * The gaming user of your application
 *
 * @author property-live
 * @version 2013.11.29
 */
class Gamer extends User {
    constructor(name: String, password: String) {
        super(name, password);
    }

    public toString() {
        return this.name;
    }
}
/**
 * Any Publisher. A publisher has things like Leaderboards with Points and other cool stuff for Gamers
 *
 * @author property-live
 * @version 2013.11.29
 */
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
/**
 * The main gamificator
 *
 * @author property-live
 * @version 2013.11.29
 */
class GlobalGamifier extends Publisher {
    constructor(name: String, password: String) {
        super(name, password);
    }
}
/**
 * A general GameElement class, which is extended by Published GameElement and GlobalGameElement
 *
 * @author property-live
 * @version 2013.11.29
 */
class GameElement {
    gamerList: Gamer[];
    public getGamer(index: number) {
        return this.gamerList[index];
    }
    public getGamerList() {
        return this.gamerList;
    }
}
/**
 * GameElements which can be published by any Publisher
 *
 * @author property-live
 * @version 2013.11.29
 */
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
/**
 * GameElement registered by the main publisher (GlobalGamifier)
 *
 * @author property-live
 * @version 2013.11.29
 */
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
/**
 * Points of any type
 *
 * @author property-live
 * @version 2013.12.31
 */
class Points extends PublishedGameElement {
    private value: number;
    private unit: String;
    constructor(publisher: Publisher, value: number, unit: String) {
        super(publisher);
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
    public increaseValue(value: number) {
        if (value > 0) {
            this.value += value;
        }
        else {
            this.value -= value;
        }
    }
    public decreaseValue(value: number) {
        if (value > 0) {
            this.value -= value;
        }
        else {
            this.value += value;
        }
    }
}
/**
 * Levels are, in a way, Points that can only be increased
 * When reaching a specific Level you increase your rank
 *
 * @author property-live
 * @version 2013.12.31
 */
class Level extends PublishedGameElement {
    private value: number;
    private rankBorder: number[];
    private rank: string[];
    private index = 0;
    constructor(publisher: Publisher, value: number, rank: string[]) {
        super(publisher);
        this.value = value;
        this.rank = rank;
    }
    public increase() {
        this.value++;
        if (this.value >= this.rankBorder[this.index]) {
            this.index++;
        }
    }
    public getValue() {
        return this.value;
    }
    public getRank(){
        return this.rank[this.index]
    }
    public toString() {
        var text = "";
        text += this.getValue() + ": " + this.getRank();
        return text;
    }
}
/**
 * A Leaderboard of Gamers
 * Gamers can be added, sorted and depicted
 *
 * @author property-live
 * @version 2013.11.29
 */
class Leaderboard extends PublishedGameElement {
    title: String;
    pointList: Points[];
    gamerList: Gamer[];
    unit: String;
    constructor(publisher: Publisher, title: String, unit: String = "points") {
        super(publisher);
        this.title = title;
        this.gamerList = [];
        this.pointList = [];
        this.unit = unit;
    }
    public addGamer(newGamer: Gamer, points: number) {
        this.gamerList.push(newGamer);
        this.pointList.push(new Points(this.publisher, points, this.unit));
    }
    public sort() {
        //bubblesort
        var swap = true;
        var sortedList = this.gamerList;
        while (swap == true) {
            swap = false;
            for (var i = 0; i < this.pointList.length - 1; i++) {
                if (this.pointList[i] < this.pointList[i + 1]) {
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
    public toString() {
        var text = "<ol>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>With <b>" + this.pointList[i].toString() + " " + this.unit + ": </b> " + this.gamerList[i].toString() + "</li>";
        }
        text += "</ol>";
        return text;
    }
    public toTrowArray() {
        var trowArray = new Array();
        for (var i = 0; i < this.gamerList.length; ++i) {
            var tr = document.createElement('tr');
            var points = document.createElement('td');
            var place = document.createElement('td');
            var gamer = document.createElement('th');
            place.appendChild(document.createTextNode('' + (i + 1)));
            gamer.appendChild(document.createTextNode('' + this.gamerList[i].toString()));
            points.appendChild(document.createTextNode('' + this.pointList[i].toString()));
            tr.appendChild(place);
            tr.appendChild(gamer);
            tr.appendChild(points);
            trowArray.push(tr);
        }
        return trowArray;
    }
    public toStringUl() {
        var text = "<ul>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text += "</ul>";
        return text;
    }
}
/**
 * Macht nichts, kann nichts, bringt nichts!
 *
 * @author property-live
 * @version 2013.11.29
 */
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