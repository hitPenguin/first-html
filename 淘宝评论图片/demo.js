function CommentMove(ulContent, boxContent) {
    this.obj = {
        activeClass: 'tm-current',
        nextBtn: '.navRight',
        preBtn: '.navLeft',
    }
    this.ulCon = ulContent;
    this.boxCon = boxContent;
    this.init();
};
CommentMove.prototype.init = function () {
    this.start();
    this.mouseHover();
    this.bindEvent();
};
CommentMove.prototype.start = function () {
    var self = this,
        ulCon = self.ulCon,
        boxCon = self.boxCon,
        preBtn = $(self.obj.preBtn),
        nextBtn = $(self.obj.nextBtn),
        activeClass = self.obj.activeClass;
    ulCon.find('li').on('click', function () {
        var $this = $(this);
        $this.toggleClass(activeClass).siblings().removeClass(activeClass);
        var src = $this.find('img').attr('src'),
            flag = $this.hasClass(activeClass),
            img = new Image();
        img.src = src;
        if (flag) {
            img.onload = function () {
                var imageW = img.width;
                var imageH = img.height;
                boxCon.css({
                    'height': imageH + 'px',
                    'width': imageW + 'px',
                    'transition': 'all 100ms ease-out'
                })
                boxCon.find('img').css({
                    'transform': 'scale(0.96)'
                })
                boxCon.find('a').css({
                    'height': imageH + 'px'
                })
                boxCon.find('.navicon').css({
                    'top': (imageH / 2 - 10) + 'px'
                });
                boxCon.find('img').on('click', function () {
                    $this.removeClass(activeClass);
                    boxCon.css({
                        'width': 0,
                        'height': 0,
                    })
                })
            }
            boxCon.find('img').attr('src', src);
        } else {
            boxCon.css({
                'width': 0 + 'px',
                'height': 0 + 'px',
                'transition': 'all 100ms ease-out'
            })
        }
    })
};
CommentMove.prototype.mouseHover = function () {
    var self = this,
        boxCon = self.boxCon,
        ulCon = self.ulCon,
        activeClass = self.obj.activeClass;
    // self.hoverTar = {};
    boxCon.find('a').hover(function () {
        var $this = $(this);
        // self.hoverTar.
        cla = $this.attr('class');
        // self.hoverTar.
        index = ulCon.find('li').index($('li.' + activeClass));
        self.len = ulCon.find('li').length - 1;
        if ((cla == 'navLeft' && index == 0 ||
            cla == 'navRight' && (index == self.len)
        )) {
            $this.children().css({
                'display': 'none'
            })
        } else {
            $this.children().css({
                'display': 'inline-block'
            });
        }
    }, function () {
        var $this = $(this);
        $this.children().css({
            'display': 'none'
        })
    })
}
CommentMove.prototype.bindEvent = function () {
    var self = this;
    boxCon = self.boxCon,
        ulCon = self.ulCon,
        activeClass = self.obj.activeClass;
    self.clickTar = {};
    boxCon.find('.navicon').on('click', function () {
        var $this = $(this);
        self.clickTar.class = $($this.parent()).attr('class');
        self.clickTar.index = ulCon.find('li').index($('li.' + activeClass));
        var index = self.clickTar.index;
        self.clickTar.class == 'navLeft' ? index-- : index++;
        if (index >= 0 && index <= self.len) {
            var src = ulCon.find('li').eq(index).find('img').attr('src');
            ulCon.find('li').eq(index).toggleClass(activeClass).siblings().removeClass(activeClass);
            boxCon.find('img').attr("src", src);
            var img = new Image();
            img.src = src;
            boxCon.css({
                'height': img.height + 'px',
                'width': img.width + 'px',
                'transition': 'all 5ms ease-out'
            })
            boxCon.find('img').css({
                'transform': 'scale(0.96)'
            })
            boxCon.find('a').css({
                'height': img.height + 'px'
            })
            boxCon.find('.navicon').css({
                'top': (img.height / 2 - 10) + 'px'
            });
        }
        if (index < 1 || index > self.len - 1) {
            index = 0;
            $this.css({ "display": "none" });
            // return;
        }
    })
}
new CommentMove($('.photo-box'), $('#photoView'));