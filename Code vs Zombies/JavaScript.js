/**
 * Save humans, destroy zombies!
 **/


// game loop
function dist(x1, y1, x2, y2) {
    return Math.floor(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}
while (true) {
    var inputs = readline().split(' ');
    const x = parseInt(inputs[0]);
    const y = parseInt(inputs[1]);
    const humanCount = parseInt(readline());
    let humanArr = [];
    for (let i = 0; i < humanCount; i++) {
        var inputs = readline().split(' ');
        const humanId = parseInt(inputs[0]);
        const humanX = parseInt(inputs[1]);
        const humanY = parseInt(inputs[2]);
        humanArr.push([humanId, humanX, humanY]);
    }
    const zombieCount = parseInt(readline());
    let zombieArr = [];
    for (let i = 0; i < zombieCount; i++) {
        var inputs = readline().split(' ');
        const zombieId = parseInt(inputs[0]);
        const zombieX = parseInt(inputs[1]);
        const zombieY = parseInt(inputs[2]);
        const zombieXNext = parseInt(inputs[3]);
        const zombieYNext = parseInt(inputs[4]);
        zombieArr.push([zombieId, zombieX, zombieY, zombieXNext, zombieYNext]);
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    let target_zombie_id = -1;
    let target_zombie_x = 0;
    let target_zombie_y = 0;

    let closest_saveable_human_dist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < humanCount; i++) {
        let h_id = humanArr[i][0];
        let h_x = humanArr[i][1];
        let h_y = humanArr[i][2];

        let nearest_zombie_dist = Number.MAX_SAFE_INTEGER;
        let threatening_zombie_index = -1;

        for (let z = 0; z < zombieCount; z++) {
            let z_x = zombieArr[z][1];
            let z_y = zombieArr[z][2];
            let d = dist(h_x, h_y, z_x, z_y);

            threatening_zombie_index = (d < nearest_zombie_dist)?z:threatening_zombie_index
            nearest_zombie_dist = (d < nearest_zombie_dist)?d:nearest_zombie_dist
        }

        let dist_ash_to_human = dist(x, y, h_x, h_y);

        let turns_to_death = Math.floor(nearest_zombie_dist / 400);
        let turns_to_save = Math.floor((dist_ash_to_human - 2000) / 1000);
        turns_to_save = (turns_to_save < 0)?0:turns_to_save;


        target_zombie_x = (turns_to_save <= turns_to_death)?(dist_ash_to_human < closest_saveable_human_dist)?zombieArr[threatening_zombie_index][1]:target_zombie_x:target_zombie_x;
        target_zombie_y = (turns_to_save <= turns_to_death)?(dist_ash_to_human < closest_saveable_human_dist)?zombieArr[threatening_zombie_index][2]:target_zombie_y:target_zombie_y;
        target_zombie_id = (turns_to_save <= turns_to_death)?(dist_ash_to_human < closest_saveable_human_dist)?threatening_zombie_index:target_zombie_id:target_zombie_id;
        closest_saveable_human_dist = (turns_to_save <= turns_to_death)?(dist_ash_to_human < closest_saveable_human_dist)?dist_ash_to_human:closest_saveable_human_dist:closest_saveable_human_dist;
    }

    target_zombie_x = (target_zombie_id === -1)?zombieArr[0][1]:target_zombie_x;
    target_zombie_y = (target_zombie_id === -1)?zombieArr[0][2]:target_zombie_y;

    console.log(target_zombie_x + " " + target_zombie_y);

}
