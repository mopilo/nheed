import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Linking,
    NetInfo,
    PermissionsAndroid
} from 'react-native';
import {connect} from 'react-redux'
import {isConnected} from '../../store/Actions/isConnected'
import Icon from 'react-native-vector-icons/Feather';
import { Container, Tabs, Tab, TabHeading } from 'native-base';
import { REQUEST_URL, HOME_URL, MY_POST, HOME_POST } from '../../component/Utility/local';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabThree from './profileTabs/TabThree';
import TabTwo from './profileTabs/TabTwo';
import TabOne from './profileTabs/TabOne';

import { CachedImage } from 'react-native-cached-image';



class ViewProfile extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerRight: (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="phone-call" size={20} style={{ padding: 8 }} color='#000' onPress={
                        () => {
                            if (params.phone === undefined && params.phone === null) { return }
                            else {
                                Linking.openURL(`tel: ${params.phone}`).catch(err => console.error('An error occurred', err))
                                console.log(params.phone)
                            }
                        }} />
                    <Icon name="message-square" size={20} color='#000' style={{ padding: 8 }} onPress={() => alert('message')} />
                    <MIcon name='dots-vertical' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>
                </View>

            )
        }
    };

    //state to hold initial data
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            token: '',
            userId: '',
            image: '',
            nheedersTotal: '',
            bio: '',
            name: '',
            res: [],
            page: 0,
            nheed: 'Nheed Me',
            isloading: false,
            totalMedia: 0,
            phone: null
        }
        this.onChangeTab = this.onChangeTab.bind(this)
    }


    // a lifeCycle component used to render data before screen loads
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        // this.phone()
        this.onChangeTab()
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };
//last thing i added...
    componentWillReceiveProps(nextProps) {
        if ( nextProps.phone != this.props.phone) {
            this.props.navigation.setParams({ 'phone': nextProps.phone });
        }
    }

    async phone() {
        const chckPhonePermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
        if (chckPhonePermission === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You've access for the phone");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You've access for the phone");
                } else {
                    console.log("You don't have access for the phone");
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    

    // function call to navigate to edit screen
    Nheed = () => {
        const token =this.props.token
        const acctId = this.props.viewData.id
        const userId = this.props.userId;
        const follow = REQUEST_URL + HOME_URL + userId + "/follow/" + acctId;
        const unfollow = REQUEST_URL + HOME_URL + userId + "/unfollow/" + acctId;
        if (this.state.nheed === 'Nheed Me') {
            fetch(follow, {
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => { return res.json() })
                .then((resData) => {
                    this.setState({ nheed: 'Nheeded' })
                    console.log(resData.data)
                    return resData;
                })
                .catch((e)=>{console.log(e)})
            //increase the amount of followers
        }
        else{
            fetch(unfollow, {
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((res) => { return res.json() })
                .then((resData) => {
                    this.setState({nheed: 'Nheed Me'})
                    //reduce the amount of followers
                    console.log(resData.data)
                    return resData;
                })
                .catch((e)=>{console.log(e)})
        }
    }

    onChangeTab() {
        
        const token =this.props.token
        const userId = this.props.viewData.id
        const url = REQUEST_URL + HOME_URL + userId + HOME_POST
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => { return res.json() })
            .then((resData) => {
                const play = resData.data;
                const videoResult = play.filter(media => media.post_type === 'video');
                const imageResult = play.filter(media => media.post_type === 'image');
                this.setState({
                    totalPost: resData.data,
                    isloading: false,
                    totalMedia: Object.keys(resData.data).length,
                    totalVideos: Object.keys(videoResult).length,
                    totalImages: Object.keys(imageResult).length,
                    videoResult: videoResult,
                    imageResult: imageResult
                })
                // console.log(this.state.totalPost)
                return resData
            })
            .catch(() => {
                this.setState({ isloading: false })
                console.log('error')
            })
    }

    render() {
        let view = this.props.viewData
        return (
            <Container>
                <ScrollView style={{ flex: 1, backgroundColor: '#fff', alignContent: 'center' }}>

                    <View style={styles.container}>
                        <View style={styles.topProfile}>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: '#000' }}>{view.following}</Text>
                                <Text note style={{ fontSize: 12, color: '#000' }}>{view.following > 1 ? 'Nheeders' : 'Nheeder'}</Text>
                            </View>
                            {/* PROFILE IMAGE */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <View style={{ width: 100, height: 100, padding: 25, borderWidth: 2, borderColor: '#251b33', justifyContent: 'center', alignItems: 'center' }}>
                                    <CachedImage source={{ uri: view.profile_picture }}
                                        style={{ width: 95, height: 95}} resizeMode = 'cover'/>
                                </View>
                                <Text style={{ fontSize: 12, textAlign: 'center', color: '#000' }}>{view.name}</Text>

                            </View>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>Comedian</Text>
                                <Text note style={{ fontSize: 9, color: '#000' }}>Tech. Entreprenuer</Text>
                                <Text note style={{ fontSize: 9, color: '#000' }}>Co-founder Reimnet</Text>
                            </View>

                        </View>

                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text note style={{ fontSize: 12, textAlign: 'center', color: '#000' }}>{view.bio}</Text>
                            <Text note style={{ fontSize: 12, textAlign: 'center', color: '#000' }}>{view.url ? view.url : ''}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this.Nheed} style={styles.nheed}>
                                <Text style={{ textAlign: 'center', color: '#000' }}> {this.state.nheed} </Text>
                            </TouchableOpacity>
                        </View>
                    </View> 

                    {/*        *****************          BEGINNING OF TABS     ****************                */}
                    
                    <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: 'transparent' }} locked={true} onChangeTab={({ i }) => { this.setState({ page: i }), this.onChangeTab }} style={{ margin: 10 }}>

                        {/* FIRST TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 0 ? styles.activeTabStyle : styles.tabStyle}>
                            <MIcon name="play-box-outline" size={33} color={this.state.page === 0 ? '#000' : 'grey'} />
                            {/* <Image source={require('../../assets/tv.png')} style={{height: 25, width: 25}}/> */}
                            <View style={{ padding: 5, alignItems: 'flex-start' }}>
                                <Text style={this.state.page === 0 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalVideos}</Text>
                                <Text style={this.state.page === 0 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalVideos > 1 ? 'videos' : 'video'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabOne totalPost={this.state.videoResult} isloading={this.state.isloading} video={this.state.totalVideos} />
                        </Tab>

                        {/* SECOND TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 1 ? styles.activeTabStyle : styles.tabStyle}>
                            <Icon name="image" size={30} color={this.state.page === 1 ? '#000' : 'grey'} />
                            <View style={{ padding: 5, alignItems: 'flex-start' }}>
                                <Text style={this.state.page === 1 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalImages}</Text>
                                <Text style={this.state.page === 1 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalImages > 1 ? 'images' : 'image'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabTwo totalPost={this.state.imageResult} isloading={this.state.isloading} />
                        </Tab>

                        {/* THIRD TAB HEADING */}
                        <Tab heading={<TabHeading style={this.state.page === 2 ? styles.activeTabStyle : styles.tabStyle}>
                            <View style={{ padding: 5, alignItems: 'center' }}>
                                <Text style={this.state.page === 2 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalMedia}</Text>
                                <Text style={this.state.page === 2 ? styles.activeTextStyle : styles.textStyle}>{this.state.totalMedia > 1 ? 'Total clips' : 'Total clip'}</Text>
                            </View>
                        </TabHeading>}>
                            <TabThree totalPost={this.state.totalPost} isloading={this.state.isloading} />
                        </Tab>

                        {/* END OF TABS */}
                    </Tabs>                       
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        backgroundColor: '#fff'
    },
    topProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        flex: 1,
    },
    nheed: {
        alignSelf: 'center',
        margin: 20,
        borderWidth: 2,
        width: '30%',
        height: 30,
        borderRadius: 5,
        borderColor: '#000',
        justifyContent: 'center'
    },
    profileOptions: {
        height: 60, 
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1
    },
    tabStyle: {
        backgroundColor: '#fff',
    },
    activeTabStyle: {
        backgroundColor: 'grey',
    },
    activeTextStyle: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 11,
        letterSpacing: 2
    },
    textStyle: {
        color: 'grey',
        fontWeight: 'bold',
        fontSize: 9
    },
    activeTextStyleBelow: {
        fontFamily: 'Lato-Light',
        fontSize: 11,
        letterSpacing: 30
    },
    textStyleBelow: {
        fontFamily: 'Lato-Light',
        fontSize: 11,
        letterSpacing: 30
    }

});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        isConnected: state.isConnected.isConnected,
        viewData: state.homeReducer.idData,
        phone: state.homeReducer.phone,
        token: state.authReducer.token,
        userId: state.authReducer.userId
        // userId: state.homeReducer.viewUserId
    };
};
  
const mapDispatchToProps = dispatch => {
return {
    network: (status) => dispatch(isConnected(status)),
};
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);

