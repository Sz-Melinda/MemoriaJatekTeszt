const meret = 4; //ennyi kártyával dolgozuk

const kartyaTomb = []; //itt tárolom a kártya objektumokat
const kepekTomb = []; //itt tárolom a képek elérési útját

$(function () {
    new Jatek();
});
class Jatek {
    constructor() {
        let szuloElem = $("article"); //itt lesznek a kártyák
        let sablonElem = $(".kartya"); //ez a mintaelem, amit másolgatunk
        this.kepekTombFeltoltese();
        const jatekter = new Jatekter(szuloElem, sablonElem, kepekTomb);
        const kivalsztottKartyak = []; //itt fogom tárolni a kiválsztott Kártyákat
        //feliratkozunk a Kartya osztályban létrehozott *kartyaKattintas* eseményre

        $(window).on("kartyaKattintas", (event) => {
            //ha blokkolva van a kattintás, akkor ne is menjünk tovább
            if (event.detail.blocked) {
                return;
            }
            let kivalasztottKartya = "";
            console.log(event.detail); //ezért kellett visszaadni az objektumot
            kivalsztottKartyak.push(event.detail);
            console.log(kivalsztottKartyak);
            //ha már van két kártya a kiválasztottKártyák között
            if (kivalsztottKartyak.length >= 2) {
                //Blokkolom az összes kártyát, azaz nem lesznek kattinthatóak
                this.TriggerBlocked();

                //ha egyenlő a két kártya
                if (
                    kivalsztottKartyak[0].fajlnev ==
                    kivalsztottKartyak[1].fajlnev
                ) {
                    //ürítsük ki a tömböt , miközben eltüntetjük a nyertes kártyákat
                    while ((kivalasztottKartya = kivalsztottKartyak.pop())) {
                        kivalasztottKartya.eltuntet();
                    }
                    TriggerUnBlocked(); //kiváltjuk a blokkolás eseményt
                } else {
                    //ha  akét kártya nem egynelő, akkor foduljanak visszaadni
                    //késleltetve
                    setTimeout(function () {
                        while (
                            (kivalasztottKartya = kivalsztottKartyak.pop())
                        ) {
                            kivalasztottKartya.allapotValtozas();
                        }
                        TriggerUnBlocked(); //megszüntetjük a blokkolást
                    }, 2000);
                }
            }
        });
        function TriggerUnBlocked() {
            window.dispatchEvent(new Event("gameUnBlocked"));
        }
    }
    TriggerBlocked() {
        window.dispatchEvent(new Event("gameBlocked"));
    }

    kepekTombFeltoltese() {
        for (let index = 1; index <= meret; index++) {
            kepekTomb.push("kepek/kep" + index + ".jpg");
            kepekTomb.push("kepek/kep" + index + ".jpg");
        }
        //kepekTomb vélelten sorrendű keverése, a tesztelés idejére kikommentezzük
        kepekTomb.sort((a, b) => {
            return Math.random() - 0.5;
        });
    }
}
