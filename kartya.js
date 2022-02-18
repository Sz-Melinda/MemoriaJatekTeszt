class Kartya {
    constructor(fajlnev, elem) {
        this.fajlnev = fajlnev; //A konstruktor megkapja az aktuális képet,
        this.elem = elem; // illetve az aktuális html elemet.(aktuális div-re mutat)
        this.hatter = "../kepek/hatter.jpg"; //Ez a háttérkép
        this.allapot = false; //kezdetben minden kép a hátát mutatja
        this.blokkolt = false; //Az elem kattintható
        this.kepElem = this.elem.children("img"); //beállítunk a képre is egy változót
        this.kepElem.attr("src", this.hatter); //beállítjuk a háttérképet

        //Ha a képre kattintunk töltődjön be a valódi kép a háttérkép helyett.
        this.elem.on("click", () => {
            this.kattintas();
        });

        //feliratkozunk a főablak két új saját eseményére
        $(window).on("gameBlocked", () => {
            this.blokkolt = true;
        });
        $(window).on("gameUnBlocked", () => {
            this.blokkolt = false;
        });
    }

    eltuntet() {
        this.elem.css("visibility", "hidden");
    }

    allapotValtozas() {
        this.allapot = !this.allapot;
        if (this.allapot) {
            this.kepElem.attr("src", this.fajlnev);
            console.log("this");
        } else {
            this.kepElem.attr("src", this.hatter);
        }
    }

    kattintas() {
        if (this.blokkolt) {
            return;
        }
        this.allapotValtozas();
        //itt hívom meg a KattintasTriggert,
        //ami kiváltja a kartyaKattintas eseményt.
        this.KattintasTrigger();
    }

    //létrehozunk egy saját  eseményt,
    //ami akkor fog kiváltódni, amikor a kártyára kattintunk
    //erre azért van szükség, hogy a főprogramban számolni tudjuk,
    //hány kártya van felfordítva
    KattintasTrigger() {
        let esemeny = new CustomEvent("kartyaKattintas", {
            detail: this, //ezzel adatokat tudok átadni
        });
        window.dispatchEvent(esemeny); // A főablakhoz adom az eseményt,
        //Az eseményt majd a script.js-ben el tudom kapni.
    }
}

class Jatekter {
    constructor(szuloElem, sablonElem, kepekTomb) {
        kepekTomb.forEach((element) => {
            let ujElem = sablonElem.clone().appendTo(szuloElem); //új elem létrehozása
            const kartya = new Kartya(element, ujElem); //Kártya osztály példányosítása
            kartyaTomb.push(kartya);
        });

        sablonElem.remove(); //sablonelem eltávolítása
    }
}
