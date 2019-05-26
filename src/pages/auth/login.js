import React, {Component} from 'react'
import {Dimensions, Alert} from 'react-native'
import {Container, Item, Label, Input, View, Button, Text} from 'native-base'
import {main} from "../../assets/styles/main"
import { StackActions,NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from '../../components/loading';
import { softGreen} from "../../assets/styles/color";
import { LoginUser } from '../../helpers/networks'
const dimens = Dimensions.get('window');

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            username : 'tonjoo',
            password : 'tonjoo'
        }
    }

    componentDidMount(){
        // AsyncStorage.clear();
        AsyncStorage.getItem('auth')
            .then(res => {
                if (!res){
                    this.setState({
                        isLoading : false
                    })
                }else {
                    const navigateAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate( { routeName: 'Contact' }) ],
                    });

                    this.props.navigation.dispatch(navigateAction);
                }
            })
    }

    onlogin(){
        if (this.state.username && this.state.password){
            this.setState({
                isLoading : true
            })
            LoginUser(this.state.username, this.state.password)
                .then(res => {
                    if (res){
                        if (res.error){
                            Alert.alert(
                                'Perhatian!',
                                res.error,
                                [
                                    {text: 'OK'},
                                ],
                                {cancelable: true},
                            );
                            this.setState({
                                isLoading : false
                            })
                        }else {
                            this.setState({
                                isLoading : false
                            })

                            AsyncStorage.setItem('auth', JSON.stringify(res))

                            const navigateAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate( { routeName: 'Contact' }) ],
                            });

                            this.setState({
                                isLoading : false
                            })

                            this.props.navigation.dispatch(navigateAction);
                        }
                    }else {
                        this.setState({
                            isLoading : false
                        })
                    }
                });
        }else {
            Alert.alert(
                'Perhatian!',
                'Harap melengkapi field yang kosong!',
                [
                    {text: 'OK'},
                ],
                {cancelable: true},
            );

            this.setState({
                isLoading : false
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Loading></Loading>
            )
        }
        return (
            <Container>
                <View style={main.toMiddleCenter}>
                    <View>
                        <Text style={{ fontSize : 20 , fontWeight: 'bold'}}>
                            Tonjoo Test
                        </Text>
                    </View>
                    <View style={{ width : dimens.width/1.2, marginTop: 100 }}>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Input textContentType="username" value={this.state.username} onChangeText={(text) => this.setState({ username : text})}/>
                        </Item>

                        <Item stackedLabel>
                            <Label>Password</Label>
                            <Input value={this.state.password} secureTextEntry textContentType="password" onChangeText={(text) => this.setState({ password : text})} />
                        </Item>

                        <Button rounded block info
                                style={{ marginTop : 30, backgroundColor : softGreen }}
                                onPress={ this.onlogin.bind(this)}>
                            <Text>
                                Login
                            </Text>
                        </Button>

                        {/*<Button rounded block success*/}
                                {/*style={{ marginTop : 10 }}*/}
                                {/*onPress={ this.gotoRegister.bind(this) }>*/}
                            {/*<Text>*/}
                                {/*Register*/}
                            {/*</Text>*/}
                        {/*</Button>*/}
                    </View>
                </View>
            </Container>
        )
    }
}

export default login
