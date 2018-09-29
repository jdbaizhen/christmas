function pageA(callback) {
    this.$boy = $('.chs-boy');
    this.$window = $('.window');
    this.$leftWin = $('.window-left');
    this.$rightWin = $('.window-right');
    this.run();
}

pageA.prototype.next = function(options){
    var dfd = $.Deferred();
    this.$boy.transition(options.style,options.time,'linear',function(){
        dfd.resolve();
    })
    return dfd;
}

pageA.prototype.stopWalk = function(){
    this.$boy.removeClass('chs-boy-deer');
}

pageA.prototype.openWindow = function(callback){
    var count = 1;
    var complete = function(){
        ++count;
        if(count===2){
            callback && callback();
        }
    }
    var bind = function(data){
        data.one('transitionend webkitTransitionEnd',function(){
            data.removeClass('window-transition');
            complete();
        })
    }
    bind(this.$leftWin.addClass('window-transition').addClass('hover'));
    bind(this.$rightWin.addClass('window-transition').addClass('hover'));
}

pageA.prototype.run = function(callback){
    var that = this;
    var next = function(){
        return this.next.apply(this,arguments)
    }.bind(this);

    next({
        'time': 10000,
        'style': {
            'top': '4rem',
            'right': '16rem',
            'scale': '1.2'
        }
    }).then(function(){
        return next({
            'time': 500,
            'style': {
                "rotateY" : "-180",
                "scale": "1.5"
            }
        })
    }).then(function(){
        return next({
            'time': 7000,
            'style': {
                "top" : "7rem",
                "right": "1.2rem"
            }
        })
    }).then(function(){
        that.stopWalk();
    }).then(function(){
        that.openWindow(function(){

        })
    })
}

