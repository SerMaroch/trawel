def on_received_number(receivedNumber):
    global тупик
    тупик = receivedNumber
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global пуск
    пуск = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_received_string(receivedString):
    global пуск
    if receivedString == "go":
        music.play_melody("D C D F F G F B ", 226)
        пуск = 1
radio.on_received_string(on_received_string)

левый = 0
центальный_левый = 0
центальный_правый = 0
правый = 0
пуск = 0
тупик = 0
StartbitV2.startbit_Init()
StartbitV2.lineFollow_iic_init(StartbitV2.startbit_iic.PORT4)
StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.PORT1)
radio.set_group(3)
черный = 0
белый = 1
перекрестки = 0
Инверсия = 0
тупик = 50
пуск = 0

def on_forever():
    global правый, центальный_правый, центальный_левый, левый, перекрестки, Инверсия, пуск
    if пуск == 1:
        if StartbitV2.startbit_ultrasonic() < 7:
            StartbitV2.startbit_setMotorSpeed(0, 0)
            radio.send_string("away")
            basic.pause(2000)
            if StartbitV2.startbit_ultrasonic() < 7:
                radio.send_number(перекрестки)
                music.play_melody("F G A A F E F G ", 228)
                StartbitV2.startbit_setMotorSpeed(-100, 100)
                basic.pause(800)
        if Инверсия == 0:
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
                StartbitV2.startbit_LineColor.WHITE):
                правый = белый
            else:
                правый = черный
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2,
                StartbitV2.startbit_LineColor.WHITE):
                центальный_правый = белый
            else:
                центальный_правый = черный
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3,
                StartbitV2.startbit_LineColor.WHITE):
                центальный_левый = белый
            else:
                центальный_левый = черный
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
                StartbitV2.startbit_LineColor.WHITE):
                левый = белый
            else:
                левый = черный
        else:
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1,
                StartbitV2.startbit_LineColor.WHITE):
                правый = черный
            else:
                правый = белый
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2,
                StartbitV2.startbit_LineColor.WHITE):
                центальный_правый = черный
            else:
                центальный_правый = белый
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3,
                StartbitV2.startbit_LineColor.WHITE):
                центальный_левый = черный
            else:
                центальный_левый = белый
            if StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4,
                StartbitV2.startbit_LineColor.WHITE):
                левый = черный
            else:
                левый = белый
        if левый == белый and правый == белый:
            if центальный_левый == черный and центальный_правый == черный:
                StartbitV2.startbit_setMotorSpeed(100, 100)
            elif центальный_левый == черный and центальный_правый == белый:
                StartbitV2.startbit_setMotorSpeed(30, 100)
            elif центальный_левый == белый and центальный_правый == черный:
                StartbitV2.startbit_setMotorSpeed(100, 30)
            else:
                StartbitV2.startbit_setMotorSpeed(30, 30)
        else:
            if левый == черный and правый == черный:
                if перекрестки == тупик:
                    StartbitV2.startbit_setMotorSpeed(-100, 100)
                    basic.pause(800)
                StartbitV2.startbit_setMotorSpeed(92, 100)
                basic.pause(100)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                перекрестки += 1
                basic.show_number(перекрестки)
                if перекрестки == 1:
                    Инверсия = 1
                elif перекрестки == 2:
                    pass
                elif перекрестки == 3:
                    Инверсия = 0
                elif перекрестки == 4:
                    StartbitV2.startbit_setMotorSpeed(100, -100)
                    basic.pause(500)
                else:
                    StartbitV2.startbit_setMotorSpeed(0, 0)
                    for index in range(10):
                        music.play_melody("A B G D C E G A ", 200)
                    radio.send_string("go")
                    пуск = 0
            elif левый == черный and правый == белый:
                StartbitV2.startbit_setMotorSpeed(-100, 100)
            elif левый == белый and правый == черный:
                StartbitV2.startbit_setMotorSpeed(100, -100)
            else:
                StartbitV2.startbit_setMotorSpeed(20, 20)
basic.forever(on_forever)
