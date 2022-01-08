# Test and validations
## Test cases
### Test case 1

Description: Function of start/restart button.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.|    Enter the site.        | Start button is visible   |
|2.|    Play game until winning.	 | Restart button is visible. |
|3.| 	Press restart button, play game until draw. | Restart button is visible. | 

### Test case 2
Description: Blinking function when winning.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.|  Play game until winning first row horizontally.   |  First row horizontally buttons is blinking. |
|2.|  Press restart.      |  Blinking ends and new round started. |
|3.|    Repeat step 1-2 until every winning scenario is tested (vertically, horisontally and diagonally. Totally eight scenarios).|   |

### Test case 3
Description: Blinking function when draw.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.|   Refresh the page.      |                          |
|2.|   Play game until draw.      |  Buttons blinking in a x over the game board.       |
|3.|   Press restart.     | Blinking ends and new round started.      |

### Test case 4
Description: Function set score to player/draw.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.|  Refresh the page.       | All points should be zero.           |
|2.|  Play game until player X is winning.     |  Player X will be given one point.    |
|3.|  Restart game.      |  Player X has one point.                       |
|4.|  Play until player O is winning.       |  Player O will be given one point.   |
|5.|  Restart game.  | Player X and O has one point each.   |
|6.|  Play until game is draw.      |  Draw will be given one point.  |
|7.|  Restart game.     |  Player X, Player O and draw has one point each.      |
|8.|  Repeat step 1-7 one more time.     | Player X, Player O and draw has two points each.  |
### Test case 5
Description: Function write out player/next player and put player to button.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.| Refresh the page.    | 'Next player' will display which player starts.  |
|2.| Press any game board button. |   Game board button is claimed by current player and 'Next player' will change to the player that's next in line.  |
|3.| Press another game board button. |  Game board button is claimed by current player and 'Next player' will change back to the player that started the game. |
### Test case 6
Description: Function genrate random player.
|Test step | Description| Expected|
| ----------- | ----------- |------------|
|1.|   Refresh the page, check which player is 'Next player'.      |                                           |
|2.|   Repeat step one five times. 'Next player' will be randomly displayed. |         |

## Responsiveness
## Test results 
## Validations 