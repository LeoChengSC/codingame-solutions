#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

int main()
{
    int width;
    scanf("%d", &width);
    
    int height;
    scanf("%d", &height); fgetc(stdin);
    
    char map[height][width];
    for (int i = 0; i < height; i++) {
        // width characters, each either 0 or .
        char line[32] = "";
        scanf("%[^\n]", line); fgetc(stdin);
        strcpy(map[i], line);
    }
    
    for (int i = 0; i < height; i++) {
        for (int k = 0; k < width; k++) {
            if (map[i][k] == '0') { 
                int right_x = -1, right_y = -1;
                int bottom_x = -1, bottom_y = -1;
                for (int j = k + 1; j < width; j++) {
                    right_x = (map[i][j] == '0')?j:right_x;
                    right_y = (map[i][j] == '0')?i:right_y;
                    if (map[i][j] == '0') break;
                }
                for (int j = i + 1; j < height; j++) {
                    bottom_x = (map[j][k] == '0')?k:bottom_x;
                    bottom_y = (map[j][k] == '0')?j:bottom_y;
                    if (map[j][k] == '0') break;
                }
                printf("%d %d %d %d %d %d\n", k, i, right_x, right_y, bottom_x, bottom_y);
            }
        }
    }
    return 0;
}
