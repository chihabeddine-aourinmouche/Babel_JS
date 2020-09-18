class JsUnit{
    constructor(){}
    
    static assertEqual(actual, expected){
        if(actual === expected){
            print("%c[V] PASSED"+" ".repeat(67)+Math.random(), "color:paleGreen;");
        } else{
            group("%c[X] FAILED"+" ".repeat(67)+Math.random(), "color:coral;");
                group("%cActual", "color:coral;");
                print("%c%s", "color:coral;", actual);
                groupEnd();
                
                group("%cExpected", "color:coral;");
                print("%c%s", "color:coral;", expected);
                groupEnd();
            groupEnd();
        }
    }
    
    static assertObjectsEqual(actual, expected){
        if(JSON.stringify(actual) === JSON.stringify(expected)){
            print("%c[V] PASSED"+" ".repeat(67)+Math.random(), "color:paleGreen;");
        } else{
            group("%c[X] FAILED"+" ".repeat(67)+Math.random(), "color:coral;");
                group("%cActual", "color:coral;");
                dir(actual);
                groupEnd();

                group("%cExpected", "color:coral;");
                dir(expected);
                groupEnd();
            groupEnd();
        }
    }
    
    static assertTrue(boolean){
        if(boolean === true){
            print("%c[V] PASSED"+" ".repeat(67)+Math.random(), "color:paleGreen;");
        } else{
            group("%c[X] FAILED"+" ".repeat(67)+Math.random(), "color:coral;");
                group("%cActual", "color:coral;");
                print("%c%s", "color:coral;", boolean);
                groupEnd();
                
                group("%cExpected", "color:coral;");
                print("%c%s", "color:coral;", true);
                groupEnd();
            groupEnd();
        }
    }
}