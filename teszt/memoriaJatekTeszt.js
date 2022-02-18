
const {test} = QUnit

QUnit.module('kepekTombFeltoltese', (h) => {

    h.before(() => {

        this.jatek = new Jatek();
    });


    test('Létezik?', (assert) => {

        assert.ok(this.jatek.kepekTombFeltoltese, "Létezik!");
    });


    test('Függvény?', (assert) => {

        assert.ok(typeof this.jatek.kepekTombFeltoltese === "function", "Függvény!");
    });

    test('Véletlenszerűen rendezett?', (assert) => {

        assert.ok(this.jatek.kepekTombFeltoltese, "Véletlenszerűen rendezett!");
    });

});

/*
QUnit.module('kartyaKattintas', (h) => {

    h.before(() => {

        this.jatek = new Jatek();
        this.kartya = new Kartya();
    });

    
    test('Kártya kattintáskor változik az állapota?', (assert) => {

        assert.ok( , "Változik!");
    });

});



QUnit.module('jatekterObjektumai', (h) => {

    h.before(() => {

        this.jatekter = new Jatekter();

    });

    test('?', (assert) => {

        assert.ok( , "Változik!");
    });

});

*/
