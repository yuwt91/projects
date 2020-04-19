(function(window, undefined){

    var elements = [];

    function Snake(){
        this.direction = 'right';
        this.body =[
            {x: 5, y: 3, color: 'red'},
            {x: 4, y: 3, color: 'blue'},
            {x: 3, y: 3, color: 'blue'}
        ];

    }

    function removeSnake(){
        for (var i = elements.length - 1; i >= 0; i--) {
            // remove div
            elements[i].parentNode.removeChild(elements[i]);

            // remove elements in array
            elements.splice(i, 1);
        }
    }

    Snake.prototype.renderSnake = function(map) {
        // remove previous snake
        removeSnake();

        // create dom node
        for(var i = 0; i < this.body.length; i++) {
            var objSnake = this.body[i];

            var div = document.createElement('div');
            map.appendChild(div);
            elements.push(div);

            // set their class attributes
            div.setAttribute('class', 'snake');

            // set their initial position with their size hard coded
            div.style.left = objSnake.x * 20 + 'px';
            div.style.top = objSnake.y * 20 + 'px';
            div.style.backgroundColor = objSnake.color;
        }

    };

    Snake.prototype.move = function(){
        // body of snake(not head) move:
        for (var i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        // snake head move:
        var head = this.body[0];
        switch(this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
    };

    // expose Snake to other modules
    window.Snake = Snake;

})(window, undefined);