from madison_axi import *


def circle():
    initialize()

    move_to(100, 0)
    point_in_direction(-90)
    pen_down()

    for i in range(360):
        move_forward(2)
        turn_right(1)

    cleanup()
    input("Done! Press Enter to close the program.")


if __name__ == "__main__":
    circle()