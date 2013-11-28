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

var GlobalGamifier = (function (_super) {
    __extends(GlobalGamifier, _super);
    function GlobalGamifier(name, password) {
        _super.call(this, name, password);
    }
    return GlobalGamifier;
})(Publisher);

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

var Points = (function () {
    function Points(publisher, value, unit) {
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
    return Points;
})();

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
            text += "<li>" + this.gamerList[i].toString() + " with " + this.pointList[i].toString() + " " + this.unit + "</li>";
        }
        text += "</ol>";
        return text;
    };
    return Leaderboard;
})(PublishedGameElement);

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
