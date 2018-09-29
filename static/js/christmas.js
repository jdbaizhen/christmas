
    function changePage(element,effect,callback){
        element.addClass(effect)
            .one('animationend webkitAnimationEnd',function(){
                callback && callback();
            })
    }

    var christmas = function(){
        var $pageC = $('.page-c');
        new pageC($pageC);
    /*    var $pageA = $('.page-a'),
            $pageB = $('.page-b'),
            $pageC = $('.page-c');
        //观察者
        var observer = new Observer();
        //A场景页面
        new pageA(function(){
            observer.publish('completeA');
        })
        //进入B场景
        observer.subscribe('pageB',function(){
            new pageB(function(){
                observer.publish('completeB');
            })
        })
        //进入C场景
        observer.subscribe('pageC',function(){
            new pageC();
        })

        //A-B场景切换
        observer.subscribe('completeA',function(){
            changePage($pageA,'effect-out',function(){
                observer.publish('pageB');
            })
        })

        //B-C场景切换
        observer.subscribe('completeB',function(){
            changePage($pageC,'effect-in',function(){
                observer.publish('pageC');
            })
        })*/
    }

$(function(){
    christmas();
})


