/**
 * The abstract user of your application
 *
 * @author property-live
 * @version 2013.11.29
 */
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
 * Any Publisher. A publisher has things like Leaderboards 
 * with Points and other cool stuff for Gamers
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
 * @deprecated
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
 * Points are a core mechanic of most of gamification applications. 
 * They may be uses as traditional points to indicate status but also 
 * as virtual currencies like for example lunch points.
 *
 * @author property-live
 * @version 2013.12.31
 */
class Points extends PublishedGameElement {
    private value: number;
    private unit: String;

    /** 
      * 
    **/ 
    constructor(publisher: Publisher, value: number = 0, unit: String = "Points") {
        super(publisher);
        this.publisher = publisher;
        this.value = value;
        this.unit = unit;
    }

    /** 
      * Generates a Point object out of a json string and a publisher object.
    **/ 
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

    /** 
      * returns: value (String)
    **/ 
    public toString() {
        return ""+this.value;
    }

    /** 
      * returns: value (number)
    **/ 
    public getValue() {
        return this.value;
    }

    /** 
      * increases the value of the points by 
      *
      * value: number - the value by which the points shall be decreased. 
      *                 Has to be positive
      * returns: nothing
    **/ 
    public increaseValue(value: number) {
        if (value > 0) {
            this.value += value;
        }
        else {
            this.value -= value;
        }
    }

    /** 
      * decreases the value of the points by 
      *
      * value: number - the value by which the points shall be decreased.
      *                 Has to be positive
      * returns: nothing
    **/ 
    public decreaseValue(value: number) {
        if (value > 0) {
            this.value -= value;
        }
        else {
            this.value += value;
        }
    }
    /** 
      * Used to get the unit of the points
      *
      * returns: the string describing the unit
    **/ 
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
    private unit: string;
    private rankBorderList: number[] = [];
    private rankList: string[] = [];
    private index = 0;
    constructor(publisher: Publisher, rankList: string[], rankBorderList: number[], value: number= 0, unit: string = "XP"){
        super(publisher);
        this.unit = unit;
        this.rankList = rankList;
        this.rankBorderList = rankBorderList;
        this.value = 0;
        this.increase(value);
    }
    public increase(value: number) {
        this.value += value;
        while (this.value >= this.rankBorderList[this.index] && this.index < this.rankList.length) {
            this.index++;
        }
    }

    public getValue() {
        return this.value;
    }

    public getUnit() {
        return this.unit;
    }

    public getRank(){
        return this.rankList[this.index];
    }

    public getNextBorder() {
        return this.rankBorderList[this.index];
    }

    public static fromJSON() {
        alert('Class signature has changed. Need to rewrite');
    }
    public getRankAt(index: number) {
        return this.rankList[index];
    }

    public getNextRank() {
        return this.rankBorderList[(this.index+1)];
    }

    public toString() {
        var text = "";
        text += this.getValue() + " " + this.unit + ": " + this.getRank();
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

    public addGamer(newGamer: Gamer, points: number = 0) {
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
                if (this.pointList[i].getValue() < this.pointList[i + 1].getValue()) {
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

    public toStringOl() {
        var text = "<ol>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text += "</ol>";
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
    private gamer: Gamer[] = [];
    private title: String;
    private description: String;
    private rewards: Points[] = [];

    constructor(publisher: Publisher, description: String, reward: Points) {
        super(publisher);
        this.description = description;
        this.rewards.push(reward);
    }

    public addReward(reward: Points) {
        this.rewards.push(reward);
    }

    public static fromJSON() {
        alert('Class signature has changed. Need to rewrite');
    }

    public toString() {
        var text = "";
        text += "Quest Master: " + this.publisher.toString() + "\n<br/>"
        + "Title: " +this.title + "\n<br/>"
        + "Description: " + this.description + "\n<br/>"
        + "Rewards: " + "\n<br/>";
        for (var i = 0; i < this.rewards.length; i++){
            text += this.rewards[i].toString() + " ";
            text += this.rewards[i].getUnit() + "\n<br/>";
        }
        return text;
    }
}

class Achievement extends PublishedGameElement {
    private title: String;
    private description: String;
    private gamer: Gamer[] = [];
    private states: String[] = ["hidden", "showing", "unlocked"];
    private status: number; //0: hidden, 1: showing, 2: unlocked
    private pictures: String[] = []; // displaying the status via url

    constructor(publisher: Publisher, title: String, description: String, pictures: String[]) {
        super(publisher);
        this.title = title;
        this.description = description;
        this.status = 0;
        for(var i = 0; i < pictures.length; i++) {
            this.pictures.push(pictures[i]);
        }
    }

    public static fromJSON(json: String) {
        // object to return
        var achievement: Achievement;

        // attributes to extract
        var publisher: Publisher;
        var gamer: Gamer[] = [];
        var states: String[] = [];
        var pictures: String[] = [];
        var title: String;
        var description: String;
        var status: number;

        // elements for extraction
        var attributeArray = json.split('{');
        var text = "";

        // extract publisher
        var secondaryArray = attributeArray[2].split('}');
        publisher = Publisher.fromJSON('{' + secondaryArray[0] + '}');

        // extract gamer list
        var text = json.substring(json.indexOf(',"gamer":') + ',"gamer":'.length + 1, json.indexOf(',"states":') - 1);
        attributeArray = text.split('}');
        for (var i = 0; i < attributeArray.length; i++) {
            // Eliminate ',' at the beginning of a line
            if (attributeArray[i].charAt(0) == ',') {
                attributeArray[i] = attributeArray[i].substring(1, attributeArray[i].length);
            }
            if (attributeArray[i].length >= '{"id":0,"password":"0","name":"0"}'.length) {
                gamer.push(Gamer.fromJSON(attributeArray[i] + '}'));
            }
        }

        // extract states
        text = json.substring(json.indexOf(',"states":') + ',"states":'.length, json.indexOf(',"pictures":') - 1);
        attributeArray = text.split('"');
        for (var i = 1; i < attributeArray.length; i += 2) {
                states.push(attributeArray[i]);
        }

        // extract pictures
        text = json.substring(json.indexOf(',"pictures":["') + ',"pictures":["'.length, json.indexOf('"],"title":"'));
        // replace \\\" with \"
        text = text.split('\\\"').join('\"');
        // replace ","\ with ,
        text = text.split('","').join(',');

        attributeArray = text.split(',');
        for (var i = 0; i < attributeArray.length; i++) {
                pictures.push(attributeArray[i]);
        }

        // extract title
        text = json.substring(json.indexOf(',"title":"') + ',"title":"'.length, json.indexOf('","description":'));
        title = text;

        // extract description
        text = json.substring(json.indexOf(',"description":"') + ',"description":"'.length, json.indexOf('","status":'));
        description = text;

        // extract status
        text = json.substring(json.indexOf(',"status":') + ',"status":'.length, json.length - 1);
        status = parseInt(text);

        // create achievement
        achievement = new Achievement(publisher, title, description, pictures);
        achievement.gamer = gamer;
        achievement.states = states;
        achievement.status = status;

        // return achievement
        return achievement;
    }

    public toString() {
        return this.pictures[this.status]
    }

    public setStatus(status: number) {
        this.status = status;
    }

    public getStatus() {
        return this.status;
    }
}