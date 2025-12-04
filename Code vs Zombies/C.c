#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <limits.h>

int dist(int x1, int y1, int x2, int y2) {
    return (int)sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}

int main()
{
    while (1) {
        int x, y;
        scanf("%d%d", &x, &y);
        
        int human_count;
        scanf("%d", &human_count);
        int humanArr[human_count][3];
        for (int i = 0; i < human_count; i++) {
            scanf("%d%d%d", &humanArr[i][0], &humanArr[i][1], &humanArr[i][2]);
        }

        int zombie_count;
        scanf("%d", &zombie_count);
        int zombieArr[zombie_count][5];
        for (int i = 0; i < zombie_count; i++) {
            scanf("%d%d%d%d%d", &zombieArr[i][0], &zombieArr[i][1], &zombieArr[i][2], &zombieArr[i][3], &zombieArr[i][4]);
        }

        
        int target_zombie_id = -1;
        int target_zombie_x = 0;
        int target_zombie_y = 0;
        
        int closest_saveable_human_dist = INT_MAX; 

        for (int i = 0; i < human_count; i++) {
            int h_id = humanArr[i][0];
            int h_x = humanArr[i][1];
            int h_y = humanArr[i][2];

            int nearest_zombie_dist = INT_MAX;
            int threatening_zombie_index = -1;

            for (int z = 0; z < zombie_count; z++) {
                int z_x = zombieArr[z][1];
                int z_y = zombieArr[z][2];
                int d = dist(h_x, h_y, z_x, z_y);
                
                threatening_zombie_index = (d < nearest_zombie_dist)?z:threatening_zombie_index;
                nearest_zombie_dist = (d < nearest_zombie_dist)?d:nearest_zombie_dist;
            }
            int dist_ash_to_human = dist(x, y, h_x, h_y);
            
            int turns_to_death = nearest_zombie_dist / 400;
            int turns_to_save = (dist_ash_to_human - 2000) / 1000;
            if (turns_to_save < 0) turns_to_save = 0;
            if (turns_to_save <= turns_to_death) {
                
                target_zombie_x = (dist_ash_to_human < closest_saveable_human_dist)?zombieArr[threatening_zombie_index][1]:target_zombie_x;
                target_zombie_y = (dist_ash_to_human < closest_saveable_human_dist)?zombieArr[threatening_zombie_index][2]:target_zombie_y;
                target_zombie_id = (dist_ash_to_human < closest_saveable_human_dist)?threatening_zombie_index:target_zombie_id;
                closest_saveable_human_dist = (dist_ash_to_human < closest_saveable_human_dist)?dist_ash_to_human:closest_saveable_human_dist;
            }
        }
        target_zombie_x = (target_zombie_id == -1)?zombieArr[0][1]:target_zombie_x;
        target_zombie_y = (target_zombie_id == -1)?zombieArr[0][2]:target_zombie_y;

        printf("%d %d\n", target_zombie_x, target_zombie_y);
    }
    return 0;
}
