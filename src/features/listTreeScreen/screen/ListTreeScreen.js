import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,
         Content, Text, icon ,View,Input,Item} from 'native-base';
import { FlatList, ActivityIndicator,TouchableHighlight} from 'react-native';

export default class Page2 extends Component {
    componentDidMount(){
        this.SearchDataSource('');
    }

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            selected: (new Map(): Map<string, boolean>),
            isLoading: true,
        };
    }

    _keyExtractor = (item,index) => item.plantID;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => {
        return (
            <MyListItem
                id={item.plantID}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.get(item.plantID)}
                TreeName={item.plantName}
                TreeNameEN={item.plantScience}
            />
        );
    };

    clearText(){
        this.setState({text:''});
        this.componentDidMount();
    }

    SearchDataSource (value) {
        fetch('http://192.168.1.22/DBCheck.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plantName: value
                })
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                }, function(){

                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        this.setState({text: value})
    }

    render() {
        if(this.state.isLoading){
            /*setTimeout(function(){ alert("Hello"); }, 3000);*/
            return(
                <View style={{flex: 1, alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    <View>
                        <ActivityIndicator size="large" color="green"/>
                        <Text style={{fontSize:30}}> กำลังโหลด กรุณารอสักครู่ </Text>
                    </View>
                </View>

            )
        }
        return (
            <Container>
                <Header style={{backgroundColor:'#196F3D'}}>
                    <Left>
                        <Button transparent  onPress={()=>this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title> รายชื่อพรรณไม้ </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                    <Item>
                        <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center'}}>
                            <Input placeholder= "Search In Here"
                                   placeholderTextColor = '#D5D8DC'
                                   returnKeyType={"done"}
                                   onChangeText={(value) => {this.SearchDataSource(value)}}
                                   /*this.SearchDataSource(value*/
                                   value={this.state.text}
                            />
                        </View>
                        <View>
                            <Icon name='close' style={{fontSize: 25, color: 'red',marginRight: 15}}
                                  onPress={() => {this.clearText()}}
                            />
                        </View>
                    </Item>
                <Content>
                    <FlatList
                        data={this.state.dataSource}
                        /*extraData={this.state}*/
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </Content>
            </Container>
        );
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
        /*alert(this.props.id);*/
    };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
            <TouchableHighlight onPress={this._onPress}>
                <View style={{borderBottomWidth:1}}>
                    <Text style={{ color: 'black' }}>
                        {this.props.TreeName}
                    </Text>
                    <Text style={{ color: 'black' }}>
                        {this.props.TreeNameEN}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}