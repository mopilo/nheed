import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
    ToastAndroid,
    NetInfo,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SearchBar } from 'react-native-elements';
import { Tabs, Tab } from 'native-base';
import { searchUser, REQUEST_URL, HOME_URL,QUERY, SEARCH } from '../../component/Utility/local';
import PeopleTab from './searchTabs/PeopleTab';
import PostTab from './searchTabs/PostTab';
import BrandTab from './searchTabs/BrandTab';
import {connect} from 'react-redux'



class Search extends Component {

    state = {
        searchBarText: " "
    }
    static navigationOptions = {
        header: null,
    };

    handleChangeText = (searchBarText) => {
        this.setState({
            searchBarText: searchBarText
        })

        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                ToastAndroid.showWithGravity(
                    "Device offline",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }

            const token = this.props.token;
            const userId = this.props.userId;
            let userName = this.state.searchBarText.toLowerCase().trim();
            const url = REQUEST_URL + HOME_URL + userId + SEARCH + QUERY + userName
            console.log('use ' + userName)
            console.log('url ' + url)

            if (token) {
                fetch(url, {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((res) => {
                    return res.json()
                })
                .then((res) => {
                    if (res === " Not Found") {
                        console.log('err')
                    }
                    else{
                    this.setState({
                        data: res.users,
                        post: res.posts
                    })
                }
                console.log(this.state.post)
                return res;
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
    }

    handleCancel = () => {
        this.setState({
            searchBarText: " "
        });
    }

    handleSearch = () => {
        Keyboard.dismiss();
    }


    handleOnClearText() {
        this.setState({
            searchBarText: ""
        }, () => {
            if (this.search != null) {
                console.log(this.search);
                this.search.focus();
            }
        })
    }

    render() {
        return (
            <View style={styles.container} >
                <SearchBar
                    lightTheme
                    returnKeyType='search'
                    showLoading = {true}
                    cancelButtonTitle="Cancel"
                    platform="android"
                    placeholder='Search'
                    clearIcon
                    returnKeyType='search'
                    cancelButtonTitle="Cancel"
                    inputContainerStyle={{background: '#f2f2f2'}}
                    containerStyle={{ backgroundColor: '#fff' }}
                    onCancel={() => this.handleCancel()}
                    onClearText={() => this.handleOnClearText()}
                    onSubmitEditing={() => this.handleSearch()}
                    onChangeText={(searchBarText) => this.handleChangeText(searchBarText)} />
                <Tabs
                    tabBarUnderlineStyle={{ backgroundColor: '#fff',  }} style={{margin: 10}}
                >
                    <Tab heading="People"
                        tabStyle={{ backgroundColor: '#fff' }}
                        textStyle={{ color: "grey" }}
                        activeTabStyle={{ backgroundColor: 'grey' }}
                        activeTextStyle={{ color: '#000', fontWeight: 'normal' }}
                    >
                        <PeopleTab user={this.state.data} navigate={this.props.navigation.navigate}/>
                    </Tab>
                    <Tab heading="Post"
                        tabStyle={{ backgroundColor: '#fff' }}
                        textStyle={{ color: "grey" }}
                        activeTabStyle={{ backgroundColor: 'grey' }}
                        activeTextStyle={{ color: '#000', fontWeight: 'normal' }}
                    >
                        <PostTab post={this.state.post}/>
                    </Tab>
                    <Tab heading="Brand"
                        tabStyle={{ backgroundColor: '#fff' }}
                        textStyle={{ color: "grey" }}
                        activeTabStyle={{ backgroundColor: 'grey' }}
                        activeTextStyle={{ color: '#000', fontWeight: 'normal' }}
                    >
                        <BrandTab post={this.state.post}/>
                    </Tab>
                    {/* <Tab heading="Company"
                        tabStyle={{ backgroundColor: '#251b33' }}
                        textStyle={{ color: "grey" }}
                        activeTabStyle={{ backgroundColor: '#1b0f28' }}
                        activeTextStyle={{ color: '#f2f2f2', fontWeight: 'normal' }}
                    >
                        <CompanyTab user={this.state.data} navigate={this.props.navigation.navigate}/>
                    </Tab> */}
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})

const mapStateToProps = state => {
    return {
      token: state.authReducer.token,
      userId: state.authReducer.userId
    };
};

export default connect(mapStateToProps)(Search)

