function pageB (element,pageComplete) {
    var $boy = $('.christmas-boy');
    var $girl = $('.girl');
    var $carousel = $('#carousel');
    var animationEnd = "animationend webkitAnimtionEnd";
    var boyAction = {
        walk : function(){
            return new Promise(function(resolve){
                $boy.addClass('boy-walk');
                $boy.transition({
                    "right": '4.5rem'
                },4000,"linear",function(){
                    resolve();
                })
            })
        },
        //停止走路
        stopWalk : function(){
            $boy.removeClass('boy-walk');
            $boy.addClass('boy-stand');
        },
        //继续走路
        runWalk : function(){
            $boy.addClass('walk-run');
        },
        //解开包裹
        unwrapp : function(){
            var dfd = $.Deferred();
            $boy.addClass('boy-unwrapp');
            $boy.removeClass('boy-stand');
            $boy.one(animationEnd,function(){
                dfd.resolve();
            })
            return dfd;
        },
        //脱衣
        strip : function(count){
            $boy.addClass('boy-strip-'+count);
            $boy.removeClass('boy-unwrapp');
        },
        //拥抱
        hug : function(){
            $boy.addClass('boy-hug').one(animationEnd,function(){
                $('.christmas-boy-head').show();
            })
        }
    }
    var girlAction = {
        standUp : function(){
            return new Promise(function(resolve){
                setTimeout(function(){
                    $girl.addClass('girl-standUp');
                },200);
                setTimeout(function(){
                    $girl.addClass('girl-throwbook');
                    resolve();
                },500)
            })
        },
        walk : function(callback){
            return new Promise(function(resolve){
                $girl.addClass('girl-walk');
                $girl.transition({'left':'4.5rem'},4000,'linear',function(){
                    resolve();
                })
            })
        },
        stopWalk : function(){
            $girl.addClass('walk-stop')
                .removeClass('girl-walk')
                .removeClass('girl-standUp')
                .removeClass('girl-throwBook')
        },
        choose : function(callback){
            $girl.addClass('girl-choose')
                .removeClass('walk-stop');
            $girl.one(animationEnd,function(){
                callback && callback();
            })
        },
        weepWalk : function(callback){
            $girl.addClass('girl-weep');
            $girl.transition({'left':'7rem'},1000,'linear',function(){
                $girl.addClass('walk-stop')
                    .removeClass('girl-weep');
                callback && callback();
            })
        },
        hug : function(){
            $girl.addClass('girl-hug').addClass('walk-run');
        }
    }

    var carousel = new Carousel($carousel,{
        imgUrls: [
            "./static/image/page2/view1.png",
            "./static/image/page2/view2.png",
            "./static/image/page2/view3.png"
        ],
        videoUrls: [
            "./static/image/page2/80s.mp4",
            "./static/image/page2/80s.mp4",
            "./static/image/page2/80s.mp4",
        ]
    })

    var i = 0;
    $("button").on("click", function() {
        carousel.run(i++, function() {
            //播放视频
            carousel.palyVideo()
        })
    })

    //开始
    boyAction.walk()
        .then(function(){
            boyAction.stopWalk();
        })
        .then(function(){
            return boyAction.unwrapp();
        })
        .then(function(){
            setTimeout(function(){
                boyAction.strip(1)
            },1000);
            setTimeout(function(){
                boyAction.strip(2)
            },2000);
            setTimeout(function(){
                boyAction.strip(3)
            },3000)
            //拥抱
            setTimeout(function(){
                boyAction.hug()
            },4000)
        })

    girlAction
        .standUp()
        .then(function(){
            return girlAction.stopWalk()
        })
        .then(function(){
            return girlAction.walk()
        })
        .then(function(){
            girlAction.choose(function(){
                girlAction.weepWalk(function(){
                    girlAction.hug();
                })
            })
        })
}