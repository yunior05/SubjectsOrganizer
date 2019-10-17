import datetime

DAYS = ['L', 'MA', 'MI', 'J', 'V', 'S']

def restHours(first, second):
  """Return true if the second hours minus the first one is negative"""
  hoursS = int(first[:first.find(":")])
  minutesS = int(first[first.find(":")+1:])

  hoursF = int(second[:second.find(":")])
  minutesF = int(second[second.find(":")+1:])

  restHours = datetime.timedelta(hours=hoursF, minutes=minutesF) - datetime.timedelta(hours=hoursS, minutes=minutesS)
  return str(restHours)[0] == '-'

def getDates(dateString, vesp = False):
  """This return a list of the dates with the correctly time and days, L=1, MA=2..."""

  result = []

  
  sPos = dateString.find(' a ')
  if(sPos != -1):
    start = dateString[:sPos]
    finish = dateString[sPos+2:]
  else:
    sPos = dateString.find(',')
    if(sPos == -1):
      start = dateString

      hdPos = 0
      for l in start:
        if (l.isdigit()):
          hdPos = start.index(l) 
          break
      time = ""
      if(start.find("pm") != -1):
        time = "pm"
        start = start[:start.find("pm")-1] 
      elif(start.find("am") != -1):
        time = "am"
        start = start[:start.find("am")-1]

      finish = start[hdPos:] + time

    else:
      start = dateString[:sPos]
      finish = dateString[sPos+1:]

    hoursF = int(finish[:finish.find(":")])
    temp = ""
    if(finish.find("p") != -1):
      minutesF = int(finish[finish.find(":")+1:finish.find("p")])
      temp = " pm"
    elif(finish.find("a") != -1):
      minutesF = int(finish[finish.find(":")+1:finish.find("a")])
      temp = " am"
    else:
      minutesF = int(finish[finish.find(":")+1:])
    
    resultDate = datetime.timedelta(hours = hoursF, minutes = minutesF) + datetime.timedelta(minutes = 45)

    finishResult = str(resultDate)[:str(resultDate).find(":", str(resultDate).find(":")+1)]

    finish = finishResult + "" + temp

  #Divide the hours and the days
  hdPos = 0
  for l in start:
    if (l.isdigit()):
      hdPos = start.index(l) 
      break
  startHour = start[hdPos:]
  day = start[:hdPos]

  #set pm or am
  pm = finish.find("pm")
  am = finish.find("am")
  if(pm != -1):
    finish = finish[:pm] + "pm"
    finishWithoutPm = finish[:finish.find("pm")]
    if(restHours(startHour, finishWithoutPm)): startHour += " am"
    else: startHour += " pm"

  elif(am != -1):
    if(int(finish[:finish.find(":")]) == 12):
      finish = finish[:am] + "pm"
    else:
      finish = finish[:am] + "am"
    
    startHour += " am"
  else:
    hoursS = int(startHour[:startHour.find(":")])
    hoursF = int(finish[:finish.find(":")])
    minutesF = int(finish[finish.find(":")+1:])
    if((hoursS < 7 or (hoursF < 10 or (hoursF == 10 and minutesF > 0))) or vesp):
      startHour += " pm"
      finish += " pm"
    else:
      startHour += " am"
      if(hoursF >=12):
        finish += " pm"
      else:
        finish += " am"

  for dayLetter in DAYS:
    if(day.find(dayLetter) != -1): 
      result.append({
        "day" : DAYS.index(dayLetter) + 1,
        "start": startHour,
        "finish": finish
      })
      
  return result

def getAllDates(dateString):
  """Verify if exist multiple dates in one string and concatenate it"""
  def divide(pos):
    """Return the list calling getDates if the dateString have two dates"""
    first = ""
    second = ""
    first = dateString[:pos]
    second = dateString[pos+1:]

    secondData = getDates(second)
    if(secondData[0]["finish"].find("pm") != -1):
      return getDates(first, True) + secondData
    else:
      return getDates(first) + getDates(second)

  initPos = -1
  for day in DAYS:
    if(dateString.find(","+day) != -1):
      initPos = dateString.find(","+day)

  if(initPos == -1):
    return getDates(dateString)
  else:
    return divide(initPos)
  

if __name__ == "__main__":
  #example with J4:00,4:45,V4:45,5:30 pm
  case = "J4:00,4:45,V4:45,5:30 pm"
  print(getAllDates(case))
