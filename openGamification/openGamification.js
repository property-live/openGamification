var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* The abstract user of your application
*
* @author property-live
* @version 2013.11.29
*/
var User = (function () {
    function User(name, password) {
        this.id = User.usercount++;
        this.password = password;
        this.name = name;
    }
    User.fromJSON = function (json) {
        var attributeArray = json.split(',', 3);
        var id = +attributeArray[0].slice(6, attributeArray[0].length + 1);
        var password = attributeArray[1].slice(12, attributeArray[1].length - 1);
        var name = attributeArray[2].slice(8, attributeArray[2].length - 2);

        //alert(id + '\n' + password + '\n' + name);
        var user = new User(name, password);
        user.id = id;
        return user;
    };
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.setName = function (name) {
        this.name = name;
    };
    User.prototype.toString = function () {
        return this.name;
    };
    User.usercount = 0;
    return User;
})();

/**
* The gaming user of your application
*
* @author property-live
* @version 2013.11.29
*/
var Gamer = (function (_super) {
    __extends(Gamer, _super);
    function Gamer(name, password) {
        _super.call(this, name, password);
    }
    Gamer.prototype.toString = function () {
        return this.name;
    };

    Gamer.fromJSON = function (json) {
        var user = User.fromJSON(json);
        var gamer = new Gamer(user.name, user.password);
        gamer.id = user.id;
        return gamer;
    };
    return Gamer;
})(User);

/**
* Any Publisher. A publisher has things like Leaderboards
* with Points and other cool stuff for Gamers
*
* @author property-live
* @version 2013.11.29
*/
var Publisher = (function (_super) {
    __extends(Publisher, _super);
    function Publisher(name, password) {
        _super.call(this, name, password);
    }
    Publisher.fromJSON = function (json) {
        return User.fromJSON(json);
    };

    Publisher.prototype.getId = function () {
        return this.id;
    };
    Publisher.prototype.getName = function () {
        return this.name;
    };
    return Publisher;
})(User);

/**
* The main gamificator
*
* @author property-live
* @version 2013.11.29
* @deprecated
*/
var GlobalGamifier = (function (_super) {
    __extends(GlobalGamifier, _super);
    function GlobalGamifier(name, password) {
        _super.call(this, name, password);
    }
    GlobalGamifier.fromJSON = function (json) {
        return Publisher.fromJSON(json);
    };
    return GlobalGamifier;
})(Publisher);

/**
* A general GameElement class, which is extended by Published GameElement and GlobalGameElement
*
* @author property-live
* @version 2013.11.29
*/
var GameElement = (function () {
    function GameElement() {
    }
    GameElement.prototype.getGamer = function (index) {
        return this.gamerList[index];
    };
    GameElement.prototype.getGamerList = function () {
        return this.gamerList;
    };
    return GameElement;
})();

/**
* GameElements which can be published by any Publisher
*
* @author property-live
* @version 2013.11.29
*/
var PublishedGameElement = (function (_super) {
    __extends(PublishedGameElement, _super);
    function PublishedGameElement(publisher) {
        _super.call(this);
        this.publisher = publisher;
    }
    PublishedGameElement.prototype.getPublisher = function () {
        return this.publisher;
    };
    return PublishedGameElement;
})(GameElement);

/**
* GameElement registered by the main publisher (GlobalGamifier)
*
* @author property-live
* @version 2013.11.29
*/
var GlobalGameElement = (function (_super) {
    __extends(GlobalGameElement, _super);
    function GlobalGameElement(publisher) {
        _super.call(this);
        this.publisher = publisher;
    }
    GlobalGameElement.prototype.getPublisher = function () {
        return this.publisher;
    };
    return GlobalGameElement;
})(GameElement);

/**
* Points are a core mechanic of most of gamification applications.
* They may be uses as traditional points to indicate status but also
* as virtual currencies like for example lunch points.
*
* @author property-live
* @version 2013.12.31
*/
var Points = (function (_super) {
    __extends(Points, _super);
    /**
    *
    **/
    function Points(publisher, value, unit) {
        if (typeof value === "undefined") { value = 0; }
        if (typeof unit === "undefined") { unit = "Points"; }
        _super.call(this, publisher);
        this.publisher = publisher;
        this.value = value;
        this.unit = unit;
    }
    Points.fromJSONandPublisher = /**
    * Generates a Point object out of a json string and a publisher object.
    **/
    function (json, publisher) {
        var points;
        var value;
        var unit;
        var attributeArray = json.split(',');
        value = +attributeArray[0].substring(9, attributeArray[0].length);
        unit = attributeArray[1].substring(8, attributeArray[1].length - 2);
        points = new Points(publisher, value, unit);
        return points;
    };

    /**
    * returns: value (String)
    **/
    Points.prototype.toString = function () {
        return "" + this.value;
    };

    /**
    * returns: value (number)
    **/
    Points.prototype.getValue = function () {
        return this.value;
    };

    /**
    * increases the value of the points by
    *
    * value: number - the value by which the points shall be decreased.
    *                 Has to be positive
    * returns: nothing
    **/
    Points.prototype.increaseValue = function (value) {
        if (value > 0) {
            this.value += value;
        } else {
            this.value -= value;
        }
    };

    /**
    * decreases the value of the points by
    *
    * value: number - the value by which the points shall be decreased.
    *                 Has to be positive
    * returns: nothing
    **/
    Points.prototype.decreaseValue = function (value) {
        if (value > 0) {
            this.value -= value;
        } else {
            this.value += value;
        }
    };

    /**
    * Used to get the unit of the points
    *
    * returns: the string describing the unit
    **/
    Points.prototype.getUnit = function () {
        return this.unit;
    };
    return Points;
})(PublishedGameElement);

/**
* Levels are, in a way, Points that can only be increased
* When reaching a specific Level you increase your rank
*
* @author property-live
* @version 2013.12.31
*/
var Level = (function (_super) {
    __extends(Level, _super);
    function Level(publisher, rankList, rankBorderList, value, unit) {
        if (typeof value === "undefined") { value = 0; }
        if (typeof unit === "undefined") { unit = "XP"; }
        _super.call(this, publisher);
        this.rankBorderList = [];
        this.rankList = [];
        this.index = 0;
        this.unit = unit;
        this.rankList = rankList;
        this.rankBorderList = rankBorderList;
        this.value = 0;
        this.increase(value);
    }
    Level.prototype.increase = function (value) {
        this.value += value;
        while (this.value >= this.rankBorderList[this.index] && this.index < this.rankList.length) {
            this.index++;
        }
    };

    Level.prototype.getValue = function () {
        return this.value;
    };

    Level.prototype.getUnit = function () {
        return this.unit;
    };

    Level.prototype.getRank = function () {
        return this.rankList[this.index];
    };

    Level.prototype.getNextBorder = function () {
        return this.rankBorderList[this.index];
    };

    Level.fromJSON = function () {
        alert('Class signature has changed. Need to rewrite');
    };
    Level.prototype.getRankAt = function (index) {
        return this.rankList[index];
    };

    Level.prototype.getNextRank = function () {
        return this.rankBorderList[(this.index + 1)];
    };

    Level.prototype.toString = function () {
        var text = "";
        text += this.getValue() + " " + this.unit + ": " + this.getRank();
        return text;
    };
    return Level;
})(PublishedGameElement);

/**
* A Leaderboard of Gamers
* Gamers can be added, sorted and depicted
*
* @author property-live
* @version 2013.11.29
*/
var Leaderboard = (function (_super) {
    __extends(Leaderboard, _super);
    function Leaderboard(publisher, title, unit) {
        if (typeof unit === "undefined") { unit = "points"; }
        _super.call(this, publisher);
        this.title = title;
        this.gamerList = [];
        this.pointList = [];
        this.unit = unit;
    }
    Leaderboard.fromJSON = function (json) {
        var leaderboard;
        var publisher;
        var title;
        var gamer;
        var gamerList = [];
        var pointList = [];
        var points;
        var unit;
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
            if (attributeArray[i].charAt(0) == ',') {
                attributeArray[i] = attributeArray[i].substring(1, attributeArray[i].length);
            }
            if (attributeArray[i].length >= '{"id":0,"password":"0","name":"0"}'.length) {
                gamer = Gamer.fromJSON(attributeArray[i] + '}');
                gamerList.push(gamer);
            }
        }

        // Extract pointList
        var unitUnclear = true;
        text = json.substring(json.indexOf(',"pointList":') + ',"pointList":'.length + 1, json.length);
        attributeArray = text.split('}');
        for (var i = 0; i < attributeArray.length; i++) {
            if (attributeArray[i].charAt(0) == ',') {
                attributeArray[i] = attributeArray[i].substring(1, attributeArray[i].length);
            }
            if (attributeArray[i].length >= '"value":0,"unit":"0"'.length) {
                if (attributeArray[i].substring(0, 7).match('"value"')) {
                    points = Points.fromJSONandPublisher('{' + attributeArray[i] + '}', publisher);
                    pointList.push(points);
                    if (unitUnclear) {
                        unit = "" + points.getUnit();
                        unitUnclear = false;
                    }
                }
            }
        }
        leaderboard = new Leaderboard(publisher, title, unit);
        for (var i = 0; i < gamerList.length; i++) {
            leaderboard.addGamer(gamerList[i], pointList[i].getValue());
        }
        return leaderboard;
    };

    Leaderboard.prototype.addGamer = function (newGamer, points) {
        if (typeof points === "undefined") { points = 0; }
        this.gamerList.push(newGamer);
        this.pointList.push(new Points(this.publisher, points, this.unit));
    };
    Leaderboard.prototype.sort = function () {
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
    };
    Leaderboard.prototype.toString = function () {
        var text = "<ol>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>With <b>" + this.pointList[i].toString() + " " + this.unit + ": </b> " + this.gamerList[i].toString() + "</li>";
        }
        text += "</ol>";
        return text;
    };
    Leaderboard.prototype.toTrowArray = function () {
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
    };

    Leaderboard.prototype.toStringUl = function () {
        var text = "<ul>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text += "</ul>";
        return text;
    };

    Leaderboard.prototype.toStringOl = function () {
        var text = "<ol>";
        for (var i = 0; i < this.gamerList.length; ++i) {
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text += "</ol>";
        return text;
    };

    Leaderboard.prototype.getPublisher = function () {
        return this.publisher;
    };
    return Leaderboard;
})(PublishedGameElement);

/**
* Macht nichts, kann nichts, bringt nichts!
*
* @author property-live
* @version 2013.11.29
*/
var Member = (function () {
    function Member(id, name, points) {
        this.id = id;
        this.name = name;
        this.points = points;
    }
    Member.prototype.getPoints = function () {
        return this.points;
    };
    Member.prototype.getName = function () {
        return this.name;
    };
    Member.prototype.getId = function () {
        return this.id;
    };
    Member.prototype.setName = function (name) {
        this.name = name;
    };
    Member.prototype.setPoints = function (points) {
        this.points = points;
    };
    Member.prototype.addPoints = function (points) {
        this.points += points;
    };
    Member.prototype.removePoints = function (points) {
        this.points -= points;
    };
    Member.prototype.toString = function () {
        var text = "";
        text += this.name + ": " + this.points.toString();
        return text;
    };
    return Member;
})();

var Quest = (function (_super) {
    __extends(Quest, _super);
    function Quest(publisher, description, reward) {
        _super.call(this, publisher);
        this.gamer = [];
        this.rewards = [];
        this.description = description;
        this.rewards.push(reward);
    }
    Quest.prototype.addReward = function (reward) {
        this.rewards.push(reward);
    };

    Quest.fromJSON = function () {
        alert('Class signature has changed. Need to rewrite');
    };

    Quest.prototype.toString = function () {
        var text = "";
        text += "Quest Master: " + this.publisher.toString() + "\n<br/>" + "Title: " + this.title + "\n<br/>" + "Description: " + this.description + "\n<br/>" + "Rewards: " + "\n<br/>";
        for (var i = 0; i < this.rewards.length; i++) {
            text += this.rewards[i].toString() + " ";
            text += this.rewards[i].getUnit() + "\n<br/>";
        }
        return text;
    };
    return Quest;
})(PublishedGameElement);

var Achievement = (function (_super) {
    __extends(Achievement, _super);
    function Achievement(publisher, title, description, pictures) {
        _super.call(this, publisher);
        this.gamer = [];
        this.states = ["hidden", "showing", "unlocked"];
        this.pictures = [];
        this.title = title;
        this.description = description;
        this.status = 0;
        for (var i = 0; i < pictures.length; i++) {
            this.pictures.push(pictures[i]);
        }
    }
    Achievement.fromJSON = function (json) {
        // object to return
        var achievement;

        // attributes to extract
        var publisher;
        var gamer = [];
        var states = [];
        var pictures = [];
        var title;
        var description;
        var status;

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
    };

    Achievement.prototype.toString = function () {
        return this.pictures[this.status];
    };

    Achievement.prototype.setStatus = function (status) {
        this.status = status;
    };

    Achievement.prototype.getStatus = function () {
        return this.status;
    };
    return Achievement;
})(PublishedGameElement);
//# sourceMappingURL=openGamification.js.map
