let tux=document.getElementById('tux');
let score=document.getElementById('score');
let score1 = 0;
document.addEventListener('keydown',function(event){

    console.log('Touche : ',event.key);

    let rect=tux.getBoundingClientRect();  //retourne les informations sur la position et la taille d’une zone rectangulaire
    console.log(rect);

    let left=rect.left;
    let top=rect.top;

    left=Math.max(10,left); //limiter la position de l'élément pour qu’il ne puisse pas être
    // placé à moins de 10 pixels du bord supérieur ou gauche de la zone d’affichage,
    // et pas plus loin que la largeur ou la hauteur de la zone d’affichage moins la largeur ou
    // la hauteur de l’élément

    top =Math.max(10,top);

    left=Math.min(510-rect.width ,left); //un maximum de 510 pixels moins la largeur de l’élément.
    // Cela garantit que l’élément ne dépasse pas le bord droit de la zone d’affichage.

    top =Math.min(510-rect.height,top); //limite la valeur de 'toptop à un maximum de 510 pixels
    // moins la hauteur de l’élément.

    if (event.key === 'ArrowLeft') { //bouger l'image à gauche
        left-=30;
        tux.style.left=left+'px';
    }

    if (event.key === 'ArrowRight') { //bouger l'image à droite
        left+=30;
        tux.style.left=left+'px';
    }
    if (event.key === 'ArrowDown') { //bouger l'image vers le bas
        top+=30;
        tux.style.top=top+'px';
    }
    if (event.key === 'ArrowUp') { //bouger l'image vers le haut
        top-=30;
        tux.style.top=top+'px';
    }
} );

document.addEventListener('mousedown',ajouter_splat);
function ajouter_splat(event)
{
    // Petit détail: éviter la sélection
    event.preventDefault();

    if (
        event.pageX - 16 < 10 || 
        event.pageX + 16 > 510 ||
        event.pageY - 16 < 10 ||
        event.pageY + 16 > 510) {
        console.log('en dehors');
        return;
    }

    let i=document.createElement('img');

    i.src='https://moodle.iutv.univ-paris13.fr/img/bjs/splat.png';
    i.className='splat';

    document.body.append(i);
    // Forcer le navigateur à prendre en compte la situation actuelle (position, scale).
    // Ceci permettra au navigateur de s'apercevoir d'un changement futur des propriétés CSS.
    window.getComputedStyle(i).top;
    // Changer les propriétés CSS qui transitionnent.
    // Le navigateur s'aperçoit du changement et déclenche la transition.
    i.style.top =(event.pageY-16)+'px';
    i.style.left=(event.pageX-16)+'px';
    i.style.transform='scale(1)';
    console.log(i.style.top, i.style.left, )


    setTimeout(function() {
        let rectTux=tux.getBoundingClientRect();
        let rectSplat=i.getBoundingClientRect();

        let touche=
            rectSplat.top +rectSplat.height >= rectTux.top && // and
            rectSplat.top                   <  rectTux.top  +rectTux.height &&
            rectSplat.left+rectSplat.width  >= rectTux.left &&
            rectSplat.left                  <  rectTux.left +rectTux.width


        if (touche) {
            score1+=10;
            console.log(score1);
            score.textContent=score1;
        }
        else {
            score1-=5;
            console.log(score1);
            score.textContent=score1;
        }}, 1000)
}