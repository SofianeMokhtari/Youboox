/* global variable */
var reg = [];
var retour = [];
var taille = 0;
var c = 0;
var name;
var rog = [];
var imageObj = new Image();
/* global variable */

function OpenJson(e) {
    let file = e.target.files[0];
    if (!file) {
        return;
    }
    name = file.name.slice(0, file.name.length -4);

    let reader = new FileReader();
        reader.onload = function(){
            rog = new Array;
            let lines = this.result.split('\n');
            for(let line = 0; line < lines.length; line++) {
                rog.push(lines[line]);
            }
            reg = new Array;
            for (let i = 0; i < rog.length - 1; i++) {
                reg.push(JSON.parse(rog[i]));
            }
            display();
        };
    let vider = document.getElementById('cont');
    if (vider != null) {
        vider.innerHTML = "";
    }
    reader.readAsText(file);
}

function display() {
        for (let j = 1; j < reg.length; j++) {
            let listImg = document.createElement('img');
            listImg.src = name + '/' + name + '_page_' + j + '.png';
            listImg.width = 180;
            listImg.height = 160;
            let li = document.createElement('li');
            let choice = document.createElement('button');
            choice.className = "choice";
            choice.id = "" + j;
            choice.onclick = aff;
            choice.append(listImg);
            li.append(choice);
            document.getElementById('cont').append(li);
        }
        c = 1;
        localStorage.setItem('page', c);
    document.getElementById('next').click();
    document.getElementById('prev').click();
}

function aff(click) {
    if (click === 'prev') {
        taille = 0;
        c = localStorage.getItem('page');
        c--;
        localStorage.setItem('page', c);
        retour = new Array;
        let ret = new Array;
        for (let a = 0; a < reg[c].regions_of_interest.length; a++) {
            retour[a] = a;
        }
        retour.push(ret);
        console.log(retour);
    }
    else if (click === 'next') {
        taille = 0;
        c = localStorage.getItem('page');
        c++;
        localStorage.setItem('page', c);
        retour = new Array;
        let rit = new Array;
        for (let a = 0; a < reg[c].regions_of_interest.length; a++) {
            rit[a] = a;
        }
        retour.push(rit);
        console.log(retour);
    }
    else if (click === 'retour') {
        localStorage.setItem('page', c);
        let tmp = new Array();
        for (let f = 0; f < retour.length -1; f++) {
            tmp[f] = retour[f];
        }
        retour = new Array;
        retour = tmp;
        console.log(retour);
    }
    else if (click === 'data') {
        localStorage.setItem('page', c);
        retour = new Array;

    }
    else if (click === 'zoom') {
        localStorage.setItem('page', c);
        if (taille < 1)
            taille = taille + 0.10;
    }
    else if (click === 'd-zoom') {
        localStorage.setItem('page', c);
        if (taille > 0)
            taille = taille - 0.10;
    }
    else if (click ==='Mod') {
        document.getElementById('close').click();
        document.getElementById('closebtn').click();
        document.getElementById('Pr').style.cssText = 'display:none;';
        document.getElementById('Ne').style.cssText = 'display:none;';
        document.getElementById('new').style.cssText = 'display:none;';
        document.getElementById('coll1').style.cssText = 'display:none;';
        document.getElementById('coll2').style.cssText = 'display:none;';
        document.getElementById('cache1').style.cssText = 'visibility:visible;position: absolute;top:0;left: 0;background-color:#333;z-index:1;width: 16.5%;height:1700px;';
        document.getElementById('cache2').style.cssText = 'visibility:visible;position: absolute;top:0;right: 0;background-color: #333;width: 14.5%;height:1700px;';
        let commit = document.createElement('button');
            commit.onclick = function () {
                if (modif !== null) {
                    while (modif.firstChild) {
                        modif.removeChild(modif.firstChild);
                    }
                }
                document.getElementById('cache1').style.cssText = 'display:none;';
                document.getElementById('cache2').style.cssText = 'display:none;';
                document.getElementById('Pr').style.cssText = 'width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
                document.getElementById('Ne').style.cssText = 'width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
                document.getElementById('new').style.cssText = 'visibility:visible';
                document.getElementById('coll1').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-right-radius: 10px;';
                document.getElementById('coll2').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-left-radius: 10px;';
                aff('data');
            };
            commit.id = "data";
            commit.innerText = 'Edit';
            commit.style.cssText = "background:paleturquoise;float:left;margin-left: 40%;border-radius:10px;position:absolute;height:30px;width:50px;";
            let envoie = document.createElement('button');
            envoie.id = "edata";
            envoie.innerText = 'Sauver';
            envoie.style.cssText = "background:paleturquoise;float:right;border-radius:10px;height:30px;width:50px;";
            let myNode = document.getElementById("new");
            if (myNode !== null) {
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
            }
            let modif = document.getElementById("modification");
            if (modif !== null) {
                while (modif.firstChild) {
                    modif.removeChild(modif.firstChild);
                }
            }
            let img = document.createElement('img');
            img.src = name + '/' + name + '_page_' + c + '.png';
            img.id = "mi_imagen";
            img.alt = "";
            modif.append(img);
            modif.append(commit);
            modif.append(envoie);
            $('#mi_imagen').selectAreas({
                maxAreas: 0,
                areas: []
            });
            $('#edata').click(function () {
                let changement = $('#mi_imagen').selectAreas('areas');
                reg[c].regions_of_interest = changement;
                console.log(reg[c]);
            });
            return;
    }
    else {
        c = click.target.id;
        localStorage.setItem('page', c);
        retour = new Array;
        let rut = new Array;
        for (let a = 0; a < reg[c].regions_of_interest.length; a++) {
            rut[a] = a;
        }
        retour.push(rut);
    }
    let myNode = document.getElementById("new");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    if (reg[c].r === 0) {
        let img = document.createElement('img');
        img.src = 'dist/Daredevil_page_' + c + '.png';
        myNode.append(img);
        return;
    }
    imageObj.onload = AlgoCanvas;
    imageObj.src = name + '/' + name + '_page_' + c + '.png';
}

function AlgoCanvas() {
    for (i = 0; i < reg[c].regions_of_interest.length; i++) {
        var div = document.createElement('div');
        div.onclick = CtrlA;
        div.id = 'div' + i;
        div.className = 'container';
        document.getElementById("new").append(div);
        var canvas = document.createElement('Canvas');
        canvas.id = "canv" + i;
        canvas.value = i;
        canvas.className = "image";
        canvas.style.cssText = "vertical-align: top;";
        canvas.width = reg[c].regions_of_interest[i].width * (0.75 + taille);
        canvas.height = reg[c].regions_of_interest[i].height * (0.75 + taille);
        document.getElementById('div' + i).append(canvas);
        var div1 = document.createElement('div');
        div1.id = 'div-1' + i;
        div1.className = 'overlay row-fluid';
        document.getElementById('div' + i).append(div1);
        var butZoom = document.createElement('button');
        butZoom.className = 'textzoom';
        butZoom.innerText = 'Modif';
        butZoom.id = 'modif' + i;
        butZoom.onclick = modifCanvas;
        var but = document.createElement('button');
        but.className = 'text';
        but.name = 'texte'
        but.id = 'but' + i;
        but.value = i;
        but.onclick = Delete;
        var h2 = document.createElement('h2');
        h2.className = 'num';
        h2.id = 'h2'+i;
        var txtt = document.createTextNode(i+1);
        txtt.className = 'txt';
        document.getElementById('div-1'+i).append(h2);
        document.getElementById('h2'+i).append(txtt);
        document.getElementById('div-1' + i).append(but);
        document.getElementById('div-1' + i).append(butZoom);
        var txt = document.createTextNode('X');
        document.getElementById('but' + i).append(txt);
        var context = canvas.getContext('2d');
        var sourceX = reg[c].regions_of_interest[i].x;
        var sourceY = reg[c].regions_of_interest[i].y;
        var sourceWidth = reg[c].regions_of_interest[i].width;
        var sourceHeight = reg[c].regions_of_interest[i].height;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = 0;
        var destY = 0;
        context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth * (0.75 + taille), destHeight * (0.75 + taille));
        canvas.ondblclick = zoomCanvas;
    }
    // $( function () {
    //     $(".image").resizable();
    // })
}

function Delete(z) {
    var ko = document.getElementById('canv' + z.target.value);
    var ok = document.getElementById('but' + z.target.value);
    var oklm = document.getElementById('h2' + z.target.value);
    if (localStorage.getItem('hidden' + c) === null) {
        let stock = z.target.value;
        localStorage.setItem('hidden' + c,JSON.stringify(stock));
    }
    else {
        stock = JSON.parse(localStorage.getItem('hidden' + c));
        stock += z.target.value;
        localStorage.setItem('hidden' + c,JSON.stringify(stock));
    }
    ko.style.cssText = 'visibility:hidden;';
    ok.style.cssText = 'visibility:hidden;';
    oklm.style.cssText = 'visibility:hidden;';
    var control = document.getElementById('butt'+ z.target.value);
    if (control == null) {
        var butt = document.createElement('button');
        butt.value =  z.target.value;
        butt.className = 'text1';
        butt.id = 'butt' + z.target.value;
        butt.onclick = Create;
        document.getElementById('div-1' + z.target.value).append(butt);
        var txt = document.createTextNode('+');
        document.getElementById('butt' + z.target.value).append(txt);
    } else {
        var oklm = document.getElementById('butt' + z.target.value);
        oklm.style.cssText = 'visibility:visible';
    }
}

function Create(z) {
    var canvisible = document.getElementById('canv' + z.target.value);
    var butvisible = document.getElementById('but' + z.target.value);
    var but2visible = document.getElementById('butt' + z.target.value);
    var h2visible = document.getElementById('h2' + z.target.value);
    canvisible.style.cssText = 'visibility:visible';
    butvisible.style.cssText = 'visibility:visible';
    h2visible.style.cssText = 'visibility:visible';
    but2visible.style.cssText = 'visibility:hidden;';
}

function zoomCanvas(t) {
    var butprv = document.getElementById('Pr');
    var butnxt = document.getElementById('Ne');
    var supp = document.getElementsByName('texte');
    for (var xy = 0 ; xy < supp.length ; xy++) {
        supp[xy].style.cssText = 'visibility:hidden;';
    }
    butnxt.style.cssText = 'visibility:hidden;width: 8%;font-size: 100%;margin-top: 35%;';
    butprv.style.cssText = 'visibility:hidden;width: 8%;font-size: 100%;margin-top: 35%;';
    var elem = document.getElementById('suivP');
    var elem2 = document.getElementById('prevP');
    if (elem != null && elem2 != null) {
        elem.parentNode.removeChild(elem);
        elem2.parentNode.removeChild(elem2);
    }
    var photo = t.target;
    var prev = document.createElement('button');
    prev.value = t.currentTarget.value;
    prev.id = "prevP";
    var suiv = document.createElement('button');
    suiv.value = t.currentTarget.value;
    suiv.id = "suivP";
    var imgprev = document.createElement('img');
    imgprev.src = 'Image/last-track-left-arrow.png';
    imgprev.style.cssText = 'width: 50%;float:left';
    var imgnext = document.createElement('img');
    imgnext.src = 'Image/skip-track.png';
    imgnext.style.cssText = 'width: 50%;float:right';
    photo.parentNode.parentNode.append(suiv);
    photo.parentNode.parentNode.append(prev);
    document.getElementById('prevP').appendChild(imgprev);
    document.getElementById('suivP').appendChild(imgnext);
    suiv.onclick =  ZoomAdd;
    prev.onclick = ZoomIdd;
    photo.style.cssText = "vertical-align: top; border:10px solid red; width:125%; height:125%; margin:0 auto;";
    var ignore = t.target.id;
    t.target.parentNode.parentNode.childNodes[ignore[4]].style.cssText ="visibility : visible;";

    for (var m = 0; m < t.target.parentNode.parentNode.childNodes.length; m++) {
        if (ignore[4] != m && t.target.parentNode.parentNode.childNodes[m].id != 'suivP' && t.target.parentNode.parentNode.childNodes[m].id != 'prevP') {
            t.target.parentNode.parentNode.childNodes[m].style.cssText ="display:none;";
        }
    }
    photo.ondblclick = DelzoomCanvas;
}

function DelzoomCanvas(l) {
    var butprv = document.getElementById('Pr');
    var butnxt = document.getElementById('Ne');
    var supp = document.getElementsByName('texte');
    for (var xy = 0 ; xy < supp.length ; xy++) {
        supp[xy].style.cssText = 'visibility:visible;';
    }
    butnxt.style.cssText = 'visibility:visible;width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
    butprv.style.cssText = 'visibility:visible;width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
    var photo2 = l.target;
    photo2.style.cssText = "vertical-align: top;";
    var ignore2 = l.target.id;
    l.target.parentNode.parentNode.childNodes[ignore2[4]].style.cssText ="visibility : visible;";
    for (var m = 0; m < l.target.parentNode.parentNode.childNodes.length; m++) {
        if (ignore2[4] != m && l.target.parentNode.parentNode.childNodes[m].id != 'suivP' && l.target.parentNode.parentNode.childNodes[m].id != 'prevP') {
            l.target.parentNode.parentNode.childNodes[m].style.cssText ="visibility : visible;";
        }
    }
    var elem = document.getElementById('suivP');
    var elem2 = document.getElementById('prevP');
    elem.parentNode.removeChild(elem);
    elem2.parentNode.removeChild(elem2);
    photo2.ondblclick = zoomCanvas;
}

function ZoomAdd(x) {
    for (var u = 0; u < x.target.parentNode.childNodes.length; u++) {
        if (x.target.parentNode.childNodes[u].style.cssText === 'visibility: visible;'){
            x.target.parentNode.childNodes[u].style.cssText = "display: none;";
            x.target.parentNode.childNodes[u].children[0].style.cssText = "";
            if (u < x.target.parentNode.childNodes.length -3 ) {
                x.target.parentNode.childNodes[u + 1].children[0].style.cssText = " border:10px solid red; width:125%; height:125%;";
                x.target.parentNode.childNodes[u + 1].style.cssText = "visibility : visible;";
                return;
            }
        }
    }
    var butprv = document.getElementById('Pr');
    var butnxt = document.getElementById('Ne');
    butnxt.style.cssText = 'visibility:visible;width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
    butprv.style.cssText = 'visibility:visible;width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
    aff('next');
}

function ZoomIdd(b) {
    for (var u = 0; u < b.target.parentNode.childNodes.length; u++) {
        if (b.target.parentNode.childNodes[u].style.cssText === 'visibility: visible;'){
            b.target.parentNode.childNodes[u].style.cssText = "display:none";
            b.target.parentNode.childNodes[u].children[0].style.cssText = "";
            if (u < b.target.parentNode.childNodes.length -3) {
                b.target.parentNode.childNodes[u - 1].children[0].style.cssText = " border:10px solid red; width:125%; height:125%;";
                b.target.parentNode.childNodes[u - 1].style.cssText = "visibility : visible;";
                return;
            }
        }
    }
    var butprv = document.getElementById('Pr');
    var butnxt = document.getElementById('Ne');
    butnxt.style.cssText = 'visibility:visible;width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
    butprv.style.cssText = 'visibility:visible;width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
    aff('prev');
}

function AutoSave() {
    let obj = [];
    let valeur = [];
    let all = document.getElementById('new').childNodes;
    for (let y = 0; y < all.length; y++) {
        let stock = document.getElementById('new').childNodes[y].id;
        valeur[y] = stock[3];
    }
    for (let j = 0; j < valeur.length ; j++) {
        obj.push(reg[c].regions_of_interest[valeur[j]]);
    }
    retour.push(obj);
    reg[c].regions_of_interest = obj;
    for (let i = 0; i < all.length; i++) {
        let stock = document.getElementById('new').childNodes[i].id;
        valeur[i] = stock[3];
        if (all[i].childNodes[0].style.cssText === 'visibility: hidden;') {
            reg[c].regions_of_interest.splice(i,1);
        }
    }
    localStorage.removeItem('hidden' + c);
    aff('data');
}

function CtrlZ() {

    if (retour.length > 0) {
        let tableau = retour[retour.length -2];
        let obj = [];
        for (let j = 0; j < tableau.length; j++) {
            obj.push(reg[c].regions_of_interest[tableau[j]]);
        }
        reg[c].regions_of_interest = obj;
        aff('retour');
    }
    else {
        console.log("pas de retour");
    }
}

function CtrlA() {
    let arr = [];
    let valeur = [];
    let all = document.getElementById('new').childNodes;
    for (let y = 0; y < all.length; y++) {
        let stock = document.getElementById('new').childNodes[y].id;
        valeur[y] = stock[3];
    }
    for (let j = 0; j < valeur.length; j++)
        arr.push(valeur[j]);
    if ( JSON.stringify(retour[retour.length -1]) !== JSON.stringify(arr)) {
        retour.push(arr);
    }
    else {
        console.log("lameme");
    }
}

function addtext() {
    var textarea = document.createElement('textarea');
    var butter = document.createElement('button');
    var a = document.createElement('a');
    a.download = name + ".txt";
    a.id = "downloadlink";
    a.style.cssText = "display: none";
    butter.id = "create";
    butter.style.cssText = "display: none";
    textarea.id = 'textbox';
    textarea.style.cssText = "display: none";

    for (let i = 0; i < reg.length; i++) {
        textarea.value += JSON.stringify(reg[i]);
    }
    document.body.appendChild(textarea);
    document.body.appendChild(butter);
    document.body.appendChild(a);

    var textFile = null,
        makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        textFile = window.URL.createObjectURL(data);
        return textFile;
    };
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';
    document.getElementById('create').click();
    document.getElementById('downloadlink').click();
}

function addCanvas() {
    document.getElementById('close').click();
    document.getElementById('closebtn').click();
    document.getElementById('Pr').style.cssText = 'display:none;';
    document.getElementById('Ne').style.cssText = 'display:none;';
    document.getElementById('new').style.cssText = 'display:none;';
    document.getElementById('coll1').style.cssText = 'display:none;';
    document.getElementById('coll2').style.cssText = 'display:none;';
    document.getElementById('cache1').style.cssText = 'visibility:visible;position: absolute;top:0;left: 0;background-color:#333;z-index:1;width: 16.5%;height:1700px;';
    document.getElementById('cache2').style.cssText = 'visibility:visible;position: absolute;top:0;right: 0;background-color: #333;width: 14.5%;height:1700px;';
    let commit = document.createElement('button');
    commit.onclick = function () {
        if (modif !== null) {
            while (modif.firstChild) {
                modif.removeChild(modif.firstChild);
            }
        }
        document.getElementById('cache1').style.cssText = 'display:none;';
        document.getElementById('cache2').style.cssText = 'display:none;';
        document.getElementById('Pr').style.cssText = 'width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
        document.getElementById('Ne').style.cssText = 'width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
        document.getElementById('new').style.cssText = 'visibility:visible';
        document.getElementById('coll1').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-right-radius: 10px;';
        document.getElementById('coll2').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-left-radius: 10px;';
        aff('data');
    };
    commit.id = "data";
    commit.innerText = 'Edit';
    commit.style.cssText = "background:paleturquoise;float:left;margin-left: 40%;border-radius:10px;position:absolute;height:30px;width:50px;";
    let envoie = document.createElement('button');
    envoie.id = "edata";
    envoie.innerText = 'Sauver';
    envoie.style.cssText = "background:paleturquoise;float:right;border-radius:10px;height:30px;width:50px;";
    let myNode = document.getElementById("new");
    if (myNode !== null) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    let modif = document.getElementById("modification");
    if (modif !== null) {
        while (modif.firstChild) {
            modif.removeChild(modif.firstChild);
        }
    }
    let img = document.createElement('img');
    img.src = name + '/' + name + '_page_' + c + '.png';
    img.id = "mon_image";
    img.alt = "";
    modif.append(img);
    modif.append(commit);
    modif.append(envoie);

    $('#mon_image').selectAreas({
        maxAreas: 1,
        areas: []
    });
    $('#edata').click(function () {
        let changement = $('#mon_image').selectAreas('areas');
        reg[c].regions_of_interest.push(changement[0]);
    });
    return;

}

function modifCanvas(e) {
    let lacase = e.target.id;
    if (lacase[5] == null) {
        addCanvas();
        return;
    }
    document.getElementById('close').click();
    document.getElementById('closebtn').click();
    document.getElementById('Pr').style.cssText = 'display:none;';
    document.getElementById('Ne').style.cssText = 'display:none;';
    document.getElementById('new').style.cssText = 'display:none;';
    document.getElementById('coll1').style.cssText = 'display:none;';
    document.getElementById('coll2').style.cssText = 'display:none;';
    document.getElementById('cache1').style.cssText = 'visibility:visible;position: absolute;top:0;left: 0;background-color:#333;z-index:1;width: 16.5%;height:1700px;';
    document.getElementById('cache2').style.cssText = 'visibility:visible;position: absolute;top:0;right: 0;background-color: #333;width: 14.5%;height:1700px;';
    let commit = document.createElement('button');
    commit.onclick = function () {
        if (modif !== null) {
            while (modif.firstChild) {
                modif.removeChild(modif.firstChild);
            }
        }
        document.getElementById('cache1').style.cssText = 'display:none;';
        document.getElementById('cache2').style.cssText = 'display:none;';
        document.getElementById('Pr').style.cssText = 'width:8%;font-size: 100%;margin-top: 35%;margin-left: 45px';
        document.getElementById('Ne').style.cssText = 'width: 8%;font-size: 100%;margin-top: 35%;margin-left: -74px';
        document.getElementById('new').style.cssText = 'visibility:visible';
        document.getElementById('coll1').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-right-radius: 10px;';
        document.getElementById('coll2').style.cssText = 'visibility:visible;background-color:#555;height: auto;width: 15%;border-bottom-left-radius: 10px;';
        aff('data');
    };
    commit.id = "data";
    commit.innerText = 'Edit';
    commit.style.cssText = "background:paleturquoise;float:left;margin-left: 40%;border-radius:10px;position:absolute;height:30px;width:50px;";
    let envoie = document.createElement('button');
    envoie.id = "edata";
    envoie.innerText = 'Sauver';
    envoie.style.cssText = "background:paleturquoise;float:right;border-radius:10px;height:30px;width:50px;";
    let myNode = document.getElementById("new");
    if (myNode !== null) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
    let modif = document.getElementById("modification");
    if (modif !== null) {
        while (modif.firstChild) {
            modif.removeChild(modif.firstChild);
        }
    }
    let img = document.createElement('img');
    img.src = name + '/' + name + '_page_' + c + '.png';
    img.id = "mi_imagen";
    img.alt = "";
    modif.append(img);
    modif.append(commit);
    modif.append(envoie);

    $('#mi_imagen').selectAreas({
        maxAreas: 1,
        areas: [
            {x : reg[c].regions_of_interest[lacase[5]].x,
            y : reg[c].regions_of_interest[lacase[5]].y,
            width :reg[c].regions_of_interest[lacase[5]].width,
            height : reg[c].regions_of_interest[lacase[5]].height,}
        ]
    });
    $('#edata').click(function () {
        let changement = $('#mi_imagen').selectAreas('areas');
        reg[c].regions_of_interest[lacase[5]] = changement[0];
    });
    return;

}

function resizable(e) {

    if (e.target.value === '2') {
        e.target.value = 0;
        aff('data');
        return;
    }
    var img = document.getElementsByClassName('container');
    for (var s = 0; s < img.length; s++) {
        document.getElementById('new').childNodes[s].childNodes[0].ondblclick = function() {};
    }
    e.target.value = 2;
    $(".image").resizable();

}

function modenuitjour() {
    var buttonnuitjour = document.getElementById("checkbox");

    if (  buttonnuitjour.checked === false) {
        document.getElementById('modele').innerText = 'Mode nuit';
        document.getElementById('coll1').style.backgroundColor = '#555';
        document.getElementById('coll2').style.backgroundColor = '#555';
        document.getElementById('coll3').style.backgroundColor = '#333';
        document.getElementById('css').href='style.css';
    }
    else {
        document.getElementById('modele').innerText = 'Mode jour';
        document.getElementById('css').href='jour.css';
        document.getElementById('coll1').style.backgroundColor = 'cadetblue';
        document.getElementById('coll2').style.backgroundColor = 'cadetblue';
        document.getElementById('coll3').style.backgroundColor = '#ccc';
        document.getElementById('cache1').style.backgroundColor = 'cadetblue';
        document.getElementById('cache2').style.backgroundColor = 'cadetblue';
    }
}

$(document).ready(function () {
    $(function() {
        $("#new").sortable();
        $("#new").disableSelection();
    })
});
//Drag & Drop



