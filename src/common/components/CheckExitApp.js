import { Alert, BackHandler } from "react-native";

function CheckExitApp() {
    Alert.alert(
        null,
        'คุณต้องการออกจากแอพพลิเคชัน\n'+'ใช่หรือไม่ ?',
        [
            {text: 'ไม่ใช่', onPress: () => null},
            {text: 'ใช่', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false }
    )
}

export default CheckExitApp;
