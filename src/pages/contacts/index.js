import React, {Component} from 'react';
import {FlatList, Alert, ToastAndroid} from 'react-native';
import {Body, Card, CardItem, Left, Container, Text, Thumbnail, Header, Button, Right, Title, Footer} from "native-base";
import {softGreen} from "../../assets/styles/color";
import {getContact} from "../../helpers/networks";
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationActions, StackActions} from "react-navigation";

class index extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isRefreshing : true,
            data : [],
            token : '',
            page:1
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('auth')
            .then(res => {
                var data = JSON.parse(res)
                this.setState({
                    token : data.token
                })
                this.getContactData(data.token)
            })
    }

    getContactData(token){
        ToastAndroid.show('Mengambil Data Page ' + this.state.page, ToastAndroid.SHORT);
        getContact(token, this.state.page)
            .then(result => {
                if (result.error){
                    Alert.alert(
                        'Perhatian!',
                        'Harap melengkapi field yang kosong!',
                        [
                            {text: 'Ok', onPress: () => this.onLogout()},
                        ],
                        {cancelable: true},
                    );
                } else {
                    this.setState({
                        data : result.data
                    })
                }

                this.setState({
                    isRefreshing : false
                })
            })
    }

    onrefresh(){
        this.getContactData(this.state.token, 1)
    }

    onNext(){
        this.setState({
            page : this.state.page + 1,
            data : [],
            isRefreshing : true
        }, ()=>{
            this.getContactData(this.state.token)
        })

    }

    onPrevious(){
        this.setState({
            page : this.state.page - 1,
            data : [],
            isRefreshing : true
        }, ()=>{
            this.getContactData(this.state.token)
        })
    }

    onLogout(){
        AsyncStorage.clear()
            .then(()=>{
                const navigateAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate( { routeName: 'Login' }) ],
                });

                this.props.navigation.dispatch(navigateAction);
            })
    }

    render() {
        return (
            <Container>
                <FlatList
                    data={this.state.data}
                    refreshing={this.state.isRefreshing} onRefresh={this.onrefresh.bind(this)}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="on-drag"
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={
                        <Header style={{ backgroundColor : softGreen}} androidStatusBarColor={ softGreen }>
                            <Body>
                            <Title>Contact List</Title>
                            </Body>
                            <Right>
                                <Button transparent onPress={ this.onLogout.bind(this) }>
                                    <Text>
                                        Logout
                                    </Text>
                                </Button>
                            </Right>
                        </Header>
                    }
                    renderItem={({item}) => (
                        <Card style={{ marginLeft : 10, marginRight : 10}}>
                            <CardItem>
                                <Left>
                                    <Thumbnail large source={{uri: item.avatar}} />
                                    <Body>
                                    <Text>{ item.first_name } - { item.last_name }</Text>
                                    <Text note>{ item.gender }</Text>
                                    <Text note>{ item.email }</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    )}
                />
                <Footer style={{ backgroundColor : softGreen}}>
                    <Left>
                        <Button disabled={this.state.page === 1 ? true : false} block style={{ backgroundColor : softGreen}} onPress={ this.onPrevious.bind(this)}>
                            <Text>
                                Previous
                            </Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button block style={{ backgroundColor : softGreen}} onPress={ this.onNext.bind(this)}>
                            <Text>
                                Next
                            </Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        )
    }
}

export default index
