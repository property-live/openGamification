var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var User = (function () {
    function User(name, password) {
        this.id = User.usercount++;
        this.password = password;
        this.name = name;
    }
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
    return Gamer;
})(User);

/**
* Any Publisher. A publisher has things like Leaderboards with Points and other cool stuff for Gamers
*
* @author property-live
* @version 2013.11.29
*/
var Publisher = (function (_super) {
    __extends(Publisher, _super);
    function Publisher(name, password) {
        _super.call(this, name, password);
    }
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
*/
var GlobalGamifier = (function (_super) {
    __extends(GlobalGamifier, _super);
    function GlobalGamifier(name, password) {
        _super.call(this, name, password);
    }
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
* Points of any type
*
* @author property-live
* @version 2013.12.31
*/
var Points = (function (_super) {
    __extends(Points, _super);
    function Points(publisher, value, unit) {
        _super.call(this, publisher);
        this.publisher = publisher;
        this.value = value;
        this.unit = unit;
    }
    Points.prototype.toString = function () {
        return this.value;
    };
    Points.prototype.getValue = function () {
        return this.value;
    };
    Points.prototype.increaseValue = function (value) {
        if (value > 0) {
            this.value += value;
        } else {
            this.value -= value;
        }
    };
    Points.prototype.decreaseValue = function (value) {
        if (value > 0) {
            this.value -= value;
        } else {
            this.value += value;
        }
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
    function Level(publisher, value, rank) {
        _super.call(this, publisher);
        this.index = 0;
        this.value = value;
        this.rank = rank;
    }
    Level.prototype.increase = function () {
        this.value++;
        if (this.value >= this.rankBorder[this.index]) {
            this.index++;
        }
    };
    Level.prototype.getValue = function () {
        return this.value;
    };
    Level.prototype.getRank = function () {
        return this.rank[this.index];
    };
    Level.prototype.toString = function () {
        var text = "";
        text += this.getValue() + ": " + this.getRank();
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
    Leaderboard.prototype.addGamer = function (newGamer, points) {
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
//# sourceMappingURL=GameElements.js.map
