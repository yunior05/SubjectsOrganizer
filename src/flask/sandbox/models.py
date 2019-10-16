class Subject:
    def __init__(self, id_m, name, cycle, groups):
        self.id = id_m
        self.name = name
        self.cycle = cycle
        self.groups = groups

class Group:
    def __init__(self, id_g, date, classroom, virtual = False):
        self.id = id_g
        self.date = date
        self.classroom = classroom
        self.virtual = virtual

class Date:
    def __init__(self, day, start, finish):
        self.day = day
        self.start = start
        self.finish = finish
