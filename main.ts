let левый = 0
let центальный_левый = 0
let центальный_правый = 0
let правый = 0
StartbitV2.startbit_Init()
StartbitV2.lineFollow_iic_init(StartbitV2.startbit_iic.port4)
let черный = 0
let белый = 1
let перекрестки = 0
basic.forever(function () {
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
            if (перекрестки == 2) {
                StartbitV2.startbit_setMotorSpeed(100, -100)
                basic.pause(700)
            } else {
                StartbitV2.startbit_setMotorSpeed(92, 100)
                basic.pause(200)
                StartbitV2.startbit_setMotorSpeed(0, 0)
                перекрестки += 1
                basic.showNumber(перекрестки)
            }
        } else if (левый == черный && правый == белый) {
            StartbitV2.startbit_setMotorSpeed(-100, 100)
        } else if (левый == белый && правый == черный) {
            StartbitV2.startbit_setMotorSpeed(100, -100)
        } else {
            StartbitV2.startbit_setMotorSpeed(20, 20)
        }
    }
})
