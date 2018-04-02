const ParentClass = require('webpack-parent-class');


class Child extends ParentClass{
    constructor(){
        super();
    }
}

module.exports = Child;