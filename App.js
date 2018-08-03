import { createDrawerNavigator } from 'react-navigation';
import SideMenu from '../ProjectTrees/src/common/SideMenu';
import HomeScreen from './src/features/homePage/screen/HomeScreen';
import ListTreeScreen from './src/features/listTreeScreen/screen/ListTreeScreen';
import MapScreen from './src/features/map/screen/MapScreen'

export default createDrawerNavigator({
    Home: {
        screen: HomeScreen,
    },
    ListTree: {
        screen: ListTreeScreen
    },
    Map: {
        screen: MapScreen
    }
},{
    contentComponent: SideMenu,
    drawerWidth: 300,
});