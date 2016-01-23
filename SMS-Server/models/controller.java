//Controller class to initialize the array of where people 
public class Controller {
	int[][] room = new int[5][8]; 
	
	public static int[][] init(){
		
		for(int r = 0; r < 5; r++){
			for(int c = 0; c < 8; c++){
				room[r][c] = 1;
			}
		}
	}
	
	//makes a spot empty
	public static void updateNew(int r, int c){
		room[r-1][c-1] = 0;
	}
	
	//makes the spot full
	public static void updateFilled(int r, int c){
		room[r-1][c-1] = 1;
	}
}