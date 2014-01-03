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
    public static fromJSON(json:string) {
        var attributeArray = json.split(',', 3);
        var id = +attributeArray[0].slice(6, attributeArray[0].length + 1);
        var password = attributeArray[1].slice(12, attributeArray[1].length - 1);
        var name = attributeArray[2].slice(8, attributeArray[2].length-2);
        //alert(id + '\n' + password + '\n' + name);
        var user = new User(name, password);
        user.id = id;
        return user;
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

    public static fromJSON(json:string) {
        var user = User.fromJSON(json);
        var gamer = new Gamer(user.name, user.password);
        gamer.id = user.id;
        return gamer;
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
    public static fromJSON(json: string) {
        return User.fromJSON(json);
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

    public static fromJSON(json: string) {
        return Publisher.fromJSON(json);
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

    public static fromJSONandPublisher(json: string, publisher: Publisher) {
        var points: Points;
        var value:number;
        var unit:string;
        var attributeArray = json.split(',');
        value = +attributeArray[0].substring(9, attributeArray[0].length);
        unit = attributeArray[1].substring(8, attributeArray[1].length-2);
        points = new Points(publisher, value, unit);
        return points;
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

    public getUnit() {
        return this.unit;
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
    private rankBorder: number[] = [];
    private rank: string[] = [];
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

    public static fromJSON(json: string) {
        var leaderboard: Leaderboard;
        var publisher: Publisher;
        var title: string;
        var gamer: Gamer;
        var gamerList: Gamer[] = [];
        var pointList: Points[] = [];
        var points: Points;
        var unit: string;
        var attributeArray = json.split('{');
        var text = "";
        // extract publisher and title
        var secondaryArray = attributeArray[2].split('}');
        publisher = Publisher.fromJSON('{' + secondaryArray[0] + '}');
        title = secondaryArray[1].slice(10, secondaryArray[1].length - 15);
        // extract gamerList
        var text = json.substring(json.indexOf(',"gamerList":') + ',"gamerList":'.length + 1, json.indexOf(',"pointList":') - 1);
        attributeArray = text.split('}');
        for (var i = 0; i < attributeArray.length; i++) {
            // Eliminate ',' at the beginning of a line
            if (attributeArray[i].charAt(0) == ',') {
                attributeArray[i] = attributeArray[i].substring(1, attributeArray[i].length);
            }
            if (attributeArray[i].length >= '{"id":0,"password":"0","name":"0"}'.length) {
                gamer = Gamer.fromJSON(attributeArray[i] + '}');
                gamerList.push(gamer);
            }
        }
        // Extract pointList
        var unitUnclear: boolean = true;
        text = json.substring(json.indexOf(',"pointList":') + ',"pointList":'.length + 1, json.length);
        attributeArray = text.split('}');
        for (var i = 0; i < attributeArray.length; i++) {
            // Eliminate ',' at the beginning of a line
            if (attributeArray[i].charAt(0) == ',') {
                attributeArray[i] = attributeArray[i].substring(1, attributeArray[i].length);
            }
            if (attributeArray[i].length >= '"value":0,"unit":"0"'.length) {
                if (attributeArray[i].substring(0, 7).match('"value"')) {
                    points = Points.fromJSONandPublisher('{' + attributeArray[i] + '}', publisher);
                    pointList.push(points);
                    if (unitUnclear) {
                        unit = ""+points.getUnit();
                        unitUnclear = false;
                    }
                }
            }
        }
        leaderboard = new Leaderboard(publisher, title, unit);
        for(var i = 0; i < gamerList.length;i++){
            leaderboard.addGamer(gamerList[i], pointList[i].getValue());
        }
        return leaderboard;
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

    public getPublisher() {
        return this.publisher;
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

class Quest extends PublishedGameElement {
    private gamer: Gamer[];
    private description: String;
    private reward: Points;

    constructor(publisher: Publisher, description: String, reward: Points) {
        super(publisher);
        this.description = description;
        this.reward = reward;
    }
}