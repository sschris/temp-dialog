/**
 * 通用 dialog 模块
 */

if (typeof define === "function" && define.cmd) {
    define(function(require, exports, module) {

        function Dialog(options) {
            this.$dialog = null;
            this.options = {
                title: options.title || '',
                content: options.content || '',
                mask: ('boolean' == typeof options.mask) ? options.mask : false,
                btns: options.btns || [],
                btnEvents: options.btnEvents || []
            };

            this.init();
        }

        Dialog.prototype.init = function() {
            var that = this;

            that.$dialog = $('<div class="bui-dialog"><div class="d-wrap"><div class="d-body"><p class="d-title"></p><p class="d-txt"></p></div><div class="d-foot bui-flex"></div></div></div>');
            that.$dialog.find('.d-head').append(document.createTextNode(this.options.title));
            that.$dialog.find('.d-body .d-title').text(this.options.title);
            that.$dialog.find('.d-body .d-txt').text(this.options.content);

            // 是否需要弹窗遮罩
            if (that.options.mask) {
                that.$dialog.addClass('theme-mask');
            }

            // 不超过13个字符的文本采用居中对齐方式
            if (that.options.content.length <= 13) {
                that.$dialog.find('.d-body .d-txt').addClass('theme-align-center');
            }
            
            // 添加按钮
            var $btn1 = null;
            if (this.options.btns.length >= 2) {
                $btn1 = $('<div class="bui-flex-item item-grow-1 d-foot-btn"></div>');
                $btn1.text(this.options.btns[0]);
                $btn1[0].onclick = (typeof this.options.btnEvents[0] === 'function') ? this.options.btnEvents[0] : null;
                that.$dialog.find('.d-foot').append($btn1);

                var $btn2 = $('<div class="bui-flex-item item-grow-1 d-foot-btn"></div>');
                $btn2.text(this.options.btns[1]);
                $btn2[0].onclick = (typeof this.options.btnEvents[1] === 'function') ? this.options.btnEvents[1] : null;
                that.$dialog.find('.d-foot').append($btn2);

            } else if (this.options.btns.length == 1) {
                $btn1 = $('<div class="bui-flex-item item-grow-1 d-foot-btn"></div>');
                $btn1.text(this.options.btns[0]);
                $btn1[0].onclick = (typeof this.options.btnEvents[0] === 'function') ? this.options.btnEvents[0] : null;
                that.$dialog.find('.d-foot').append($btn1);
            }

            $('body').append(that.$dialog);
        };

        Dialog.prototype.remove = function() {
            this.$dialog.remove();
        };

        module.exports = Dialog;
    });
}
