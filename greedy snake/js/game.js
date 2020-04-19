(function(){

    var that; // record game object
    
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function(){
        this.food.renderFood(this.map);
        this.snake.renderSnake(this.map);

        // make snake move
        runSnake();

        // key control
        bindKey();

       // eat food and get longer


    }

    function bindKey(){
        document.addEventListener('keydown', function(e){
            // 37-left 38-top 39-right 40-down
            switch(e.keyCode) {
                case 37:
                    that.snake.direction = 'left';
                    break;
                case 38:
                    that.snake.direction = 'top';
                    break;
                case 39:
                    that.snake.direction = 'right';
                    break;
                case 40:
                    that.snake.direction = 'bottom';
                    break;
            }

        }, false)
    }

    function runSnake(){
        var timeId = setInterval(function(){
            that.snake.move(that.food, that.map);
            that.snake.renderSnake(that.map);

            var maxX = that.map.offsetWidth / 20;
            var maxY = that.map.offsetHeight / 20;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;

            if(headX <= 0 || headX >=  maxX) {
                alert('Game Over!');
                clearInterval(timeId);
            }

            if(headY <= 0 || headY >=  maxY) {
                alert('Game Over!');
                clearInterval(timeId);
            }

        }, 150)
    }

    window.Game = Game;
})();

var map = document.getElementById('map');
var game = new Game(map);
game.start(map);
