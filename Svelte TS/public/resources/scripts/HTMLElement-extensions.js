let extendHTMLElement = function () {
    HTMLElement.prototype.childOf = function (element) {
        let node = this;

        while(
            node !== document.body.parentNode
        ) {
            //console.debug(node);

            node = node.parentNode;

            if(node === element) {
                return true;
            }
        }

        return false;
    }

    HTMLElement.prototype.delegateFor = function (
        selector,
        eventType,
        handler
    ) {
        let self = this;

        self.addEventListener(
            eventType,
            function(e) {
                self.querySelectorAll(selector).forEach(function(element) {
                    //console.debug(e.target);

                    if(e.target === element || e.target.childOf(element)) {
                        let evt = {
                            originalEvent:       e,
                            realTarget:    element
                        };

                        handler(evt);
                    }
                });
            }
        );
    }

    HTMLElement.prototype.climbUntil = function (className) {
        let node = this;

        while(
            node !== document.body.parentNode
        ) {
            //console.debug(node);

            node = node.parentNode;

            if(node.classList.contains(className)) {
                return node;
            }
        }

        return null;
    }
};

export { extendHTMLElement };