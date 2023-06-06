radio.onReceivedNumber(function (receivedNumber) {
    тупик = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    пуск = 1
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "go") {
        пуск = 1
    }
})
let левый = 0
let центальный_левый = 0
let центальный_правый = 0
let правый = 0
let пуск = 0
let тупик = 0
StartbitV2.startbit_Init()
StartbitV2.lineFollow_iic_init(StartbitV2.startbit_iic.port4)
StartbitV2.ultrasonic_init(StartbitV2.startbit_ultrasonicPort.port1)
radio.setGroup(3)
let черный = 0
let белый = 1
let перекрестки = 0
let Инверсия = 0
тупик = 50
пуск = 0
basic.forever(function () {
    if (пуск == 1) {
        if (Инверсия == 0) {
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.White)) {
                правый = белый
            } else {
                правый = черный
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2, StartbitV2.startbit_LineColor.White)) {
                центальный_правый = белый
            } else {
                центальный_правый = черный
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3, StartbitV2.startbit_LineColor.White)) {
                центальный_левый = белый
            } else {
                центальный_левый = черный
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White)) {
                левый = белый
            } else {
                левый = черный
            }
        } else {
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S1, StartbitV2.startbit_LineColor.White)) {
                правый = черный
            } else {
                правый = белый
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S2, StartbitV2.startbit_LineColor.White)) {
                центальный_правый = черный
            } else {
                центальный_правый = белый
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S3, StartbitV2.startbit_LineColor.White)) {
                центальный_левый = черный
            } else {
                центальный_левый = белый
            }
            if (StartbitV2.startbit_line_followers(StartbitV2.startbit_LineFollowerSensors.S4, StartbitV2.startbit_LineColor.White)) {
                левый = черный
            } else {
                левый = белый
            }
        }
        if (левый == белый && правый == белый) {
            if (центальный_левый == черный && центальный_правый == черный) {
                StartbitV2.startbit_setMotorSpeed(100, 100)
            } else if (центальный_левый == черный && центальный_правый == белый) {
                StartbitV2.startbit_setMotorSpeed(30, 100)
            } else if (центальный_левый == белый && центальный_правый == черный) {
                StartbitV2.startbit_setMotorSpeed(100, 30)
            } else {
                StartbitV2.startbit_setMotorSpeed(30, 30)
            }
        } else {
            if (левый == черный && правый == черный) {
                if (перекрестки == тупик) {
                    StartbitV2.startbit_setMotorSpeed(-100, 100)
                    basic.pause(800)
                }
                StartbitV2.startbit_setMotorSpeed(92, 100)
                basic.pause(100)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                перекрестки += 1
                basic.showNumber(перекрестки)
                if (перекрестки == 1) {
                	
                } else if (перекрестки == 2) {
                    StartbitV2.startbit_setMotorSpeed(100, -100)
                    basic.pause(500)
                } else if (перекрестки == 3) {
                    Инверсия = 1
                } else if (перекрестки == 4) {
                	
                } else if (перекрестки == 5) {
                    Инверсия = 0
                } else if (перекрестки == 6) {
                    StartbitV2.startbit_setMotorSpeed(100, -100)
                    basic.pause(500)
                } else {
                    StartbitV2.startbit_setMotorSpeed(0, 0)
                    radio.sendString("go")
                    пуск = 0
                }
            } else if (левый == черный && правый == белый) {
                StartbitV2.startbit_setMotorSpeed(-100, 100)
            } else if (левый == белый && правый == черный) {
                StartbitV2.startbit_setMotorSpeed(100, -100)
            } else {
                StartbitV2.startbit_setMotorSpeed(100, 100)
            }
        }
    }
})
